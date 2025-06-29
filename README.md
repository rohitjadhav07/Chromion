
# DeFi Lending Protocol with Chainlink

This project is a decentralized lending platform built with Solidity and Hardhat. It uses Chainlink Data Feeds for real-time price oracles and Chainlink Automation for automated liquidations.

## Features
- Deposit crypto as collateral
- Borrow stablecoins against collateral
- Real-time collateral valuation using Chainlink Data Feeds
- Automated liquidation of undercollateralized positions using Chainlink Automation

## Stack
- Solidity (Hardhat)
- Chainlink Oracles (Data Feeds, Automation)
- Ready for testnet deployment

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Compile contracts:
   ```sh
   npx hardhat compile
   ```
3. Deploy to a testnet (e.g., Sepolia):
   ```sh
   npx hardhat run scripts/deploy.js --network sepolia
   ```

## Chainlink Integration
- [Chainlink Data Feeds](https://docs.chain.link/data-feeds)
- [Chainlink Automation](https://docs.chain.link/chainlink-automation/introduction)

## License
MIT
