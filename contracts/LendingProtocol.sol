
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IRouterClient } from "@chainlink/contracts-ccip/contracts/interfaces/IRouterClient.sol";
import { Client } from "@chainlink/contracts-ccip/contracts/libraries/Client.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import { FunctionsClient } from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";


contract LendingProtocol is AutomationCompatibleInterface, VRFConsumerBaseV2, FunctionsClient {
    AggregatorV3Interface public priceFeed;
    address public owner;
    uint256 public constant LIQUIDATION_THRESHOLD = 80; // 80%

    // VRF
    VRFCoordinatorV2Interface public vrfCoordinator;
    uint64 public vrfSubscriptionId;
    bytes32 public vrfKeyHash;
    uint32 public vrfCallbackGasLimit = 100000;
    uint16 public vrfRequestConfirmations = 3;
    uint32 public vrfNumWords = 1;
    mapping(uint256 => address) public vrfRequestToUser;

    struct Position {
        uint256 collateralETH;
        uint256 debtDAI;
        address user;
        bool open;
    }

    mapping(address => Position) public positions;
    address[] public users;

    // Chainlink CCIP
    address public ccipRouter;
    event CCIPMessageSent(address indexed sender, uint64 destinationChainSelector, address receiver, bytes message, bytes32 messageId);
    event CCIPMessageReceived(address indexed sender, uint64 sourceChainSelector, address receiver, bytes message);
    // Set the CCIP router address (can be set post-deployment)
    function setCCIPRouter(address _router) external {
        require(msg.sender == owner, "Only owner");
        ccipRouter = _router;
    }
    // Send a cross-chain message (basic example)
    function sendCCIPMessage(uint64 destinationChainSelector, address receiver, bytes calldata message) external payable {
        require(ccipRouter != address(0), "CCIP router not set");
        // Build the EVM2AnyMessage struct for CCIP
        Client.EVM2AnyMessage memory ccipMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: message,
            tokenAmounts: new Client.EVMTokenAmount[](0),
            feeToken: address(0),
            extraArgs: bytes("")
        });
        bytes32 messageId = IRouterClient(ccipRouter).ccipSend{value: msg.value}(
            destinationChainSelector,
            ccipMessage
        );
        emit CCIPMessageSent(msg.sender, destinationChainSelector, receiver, message, messageId);
    }
    // Receive a cross-chain message (to be called by router)
    function ccipReceive(uint64 sourceChainSelector, address sender, bytes calldata message) external {
        require(msg.sender == ccipRouter, "Only router");
        emit CCIPMessageReceived(sender, sourceChainSelector, address(this), message);
        // Add your logic to handle the message here
    }

    event Deposited(address indexed user, uint256 amountETH);
    event Borrowed(address indexed user, uint256 amountDAI);
    event Liquidated(address indexed user);
    event AirdropRequested(uint256 indexed requestId, address indexed user);
    event AirdropWon(address indexed user, uint256 amount);

    event Repaid(address indexed user, uint256 amountDAI);
    event Withdrawn(address indexed user, uint256 amountETH);

    // Chainlink Functions
    mapping(address => uint256) public userCreditScore;
    event CreditScoreRequested(address indexed user, bytes32 requestId);
    event CreditScoreReceived(address indexed user, uint256 score);

    constructor(address _priceFeed, address _vrfCoordinator, uint64 _vrfSubscriptionId, bytes32 _vrfKeyHash, address _functionsRouter) 
        VRFConsumerBaseV2(_vrfCoordinator)
        FunctionsClient(_functionsRouter)
    {
        priceFeed = AggregatorV3Interface(_priceFeed);
        owner = msg.sender;
        vrfCoordinator = VRFCoordinatorV2Interface(_vrfCoordinator);
        vrfSubscriptionId = _vrfSubscriptionId;
        vrfKeyHash = _vrfKeyHash;
    }

    // --- Chainlink Functions: Credit Score ---
    function requestCreditScore(string memory userId, bytes32 donPubKey, uint64 subscriptionId, uint32 gasLimit) external {
        bytes memory request = abi.encode(userId);
        bytes32 requestId = keccak256(abi.encodePacked(userId, block.timestamp, msg.sender));
        _sendRequest(request, subscriptionId, gasLimit, donPubKey);
        emit CreditScoreRequested(msg.sender, requestId);
    }

    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory /*err*/) internal override {
        address user = tx.origin; // For demo only; in production, map requestId to user
        uint256 score = abi.decode(response, (uint256));
        userCreditScore[user] = score;
        emit CreditScoreReceived(user, score);
    }

    // --- Chainlink VRF Airdrop ---
    function requestAirdrop() external {
        require(positions[msg.sender].open, "No open position");
        uint256 requestId = vrfCoordinator.requestRandomWords(
            vrfKeyHash,
            vrfSubscriptionId,
            vrfRequestConfirmations,
            vrfCallbackGasLimit,
            vrfNumWords
        );
        vrfRequestToUser[requestId] = msg.sender;
        emit AirdropRequested(requestId, msg.sender);
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        address user = vrfRequestToUser[requestId];
        if (user != address(0) && positions[user].open) {
            uint256 reward = (randomWords[0] % 10 + 1) * 1e15; // 0.001 - 0.01 ETH
            payable(user).transfer(reward);
            emit AirdropWon(user, reward);
        }
    }

    function depositCollateral() external payable {
        require(msg.value > 0, "No ETH sent");
        if (!positions[msg.sender].open) {
            users.push(msg.sender);
            positions[msg.sender].open = true;
            positions[msg.sender].user = msg.sender;
        }
        positions[msg.sender].collateralETH += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function borrow(uint256 amountDAI) external {
        require(positions[msg.sender].collateralETH > 0, "No collateral");
        uint256 ethPrice = getLatestPrice();
        uint256 maxBorrow = (positions[msg.sender].collateralETH * ethPrice * LIQUIDATION_THRESHOLD) / 100 / 1e18;
        require(amountDAI <= maxBorrow, "Exceeds max borrow");
        positions[msg.sender].debtDAI += amountDAI;
        // In production, mint/send DAI here
        emit Borrowed(msg.sender, amountDAI);
    }

    function repay(uint256 amountDAI) external {
        require(amountDAI > 0, "Amount must be greater than 0");
        require(positions[msg.sender].debtDAI >= amountDAI, "Repay exceeds debt");
        positions[msg.sender].debtDAI -= amountDAI;
        // In production, transfer DAI from user here
        emit Repaid(msg.sender, amountDAI);
    }

    function withdraw(uint256 amountETH) external {
        require(amountETH > 0, "Amount must be greater than 0");
        require(positions[msg.sender].collateralETH >= amountETH, "Withdraw exceeds collateral");
        // Check solvency after withdrawal
        uint256 ethPrice = getLatestPrice();
        uint256 newCollateral = positions[msg.sender].collateralETH - amountETH;
        uint256 maxBorrow = (newCollateral * ethPrice * LIQUIDATION_THRESHOLD) / 100 / 1e18;
        require(positions[msg.sender].debtDAI <= maxBorrow, "Withdrawal would cause undercollateralization");
        positions[msg.sender].collateralETH -= amountETH;
        (bool sent, ) = payable(msg.sender).call{value: amountETH}("");
        require(sent, "ETH transfer failed");
        emit Withdrawn(msg.sender, amountETH);
    }

    function getLatestPrice() public view returns (uint256) {
        (, int256 price,,,) = priceFeed.latestRoundData();
        return uint256(price) * 1e10; // 8 decimals to 18
    }

    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory performData) {
        for (uint i = 0; i < users.length; i++) {
            if (positions[users[i]].open && isUndercollateralized(users[i])) {
                return (true, abi.encode(users[i]));
            }
        }
        return (false, bytes("") );
    }

    function performUpkeep(bytes calldata performData) external override {
        address user = abi.decode(performData, (address));
        require(isUndercollateralized(user), "Not undercollateralized");
        positions[user].open = false;
        emit Liquidated(user);
        // In production, seize collateral here
    }

    function isUndercollateralized(address user) public view returns (bool) {
        if (!positions[user].open) return false;
        uint256 ethPrice = getLatestPrice();
        uint256 collateralValue = positions[user].collateralETH * ethPrice / 1e18;
        return positions[user].debtDAI > (collateralValue * LIQUIDATION_THRESHOLD) / 100;
    }
}