const { ethers } = require("hardhat");

async function main() {
  // Replace with the correct ETH/USD price feed address for your testnet
  const priceFeed = "0x694AA1769357215DE4FAC081bf1f309aDC325306"; // Sepolia ETH/USD
  const vrfCoordinator = process.env.VRF_COORDINATOR;
  const vrfSubscriptionId = process.env.VRF_SUBSCRIPTION_ID;
  const vrfKeyHash = process.env.VRF_KEY_HASH;
  const functionsRouter = process.env.FUNCTIONS_ROUTER;
  const dai = "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844"; // Sepolia DAI (checksummed)
  const LendingProtocol = await ethers.getContractFactory("LendingProtocol");
  const lending = await LendingProtocol.deploy(
    priceFeed,
    vrfCoordinator,
    vrfSubscriptionId,
    vrfKeyHash,
    functionsRouter,
    dai
  );
  await lending.waitForDeployment();
  console.log("LendingProtocol deployed to:", await lending.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
