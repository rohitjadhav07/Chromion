

# Chromion: DeFi Lending Protocol Powered by Chainlink

Chromion is a decentralized lending and borrowing platform built on Ethereum, leveraging Chainlink Data Feeds, Automation, and VRF for secure, transparent, and automated DeFi. Users can deposit ETH as collateral, borrow DAI, and participate in airdrops and credit scoring—all with robust security and a seamless UI.

## Key Features
- **Deposit ETH as Collateral:** Lock ETH to borrow DAI and earn protocol rewards.
- **Borrow DAI:** Instantly borrow DAI against your ETH collateral at fair, real-time prices.
- **Automated Liquidations:** Chainlink Automation ensures undercollateralized positions are liquidated trustlessly.
- **Airdrops & Leaderboard:** Random airdrops (using Chainlink VRF) and a leaderboard for top users.
- **Credit Scoring:** Off-chain credit scoring with Chainlink Functions.
- **Security:** No admin keys, open-source, and built with best practices for DeFi security.

## Architecture Overview
- **Frontend:** React (Vercel), connects to Ethereum via MetaMask and ethers.js.
- **Smart Contracts:** Solidity, Hardhat, deployed to Ethereum testnet.
- **Chainlink Oracles:**
  - Data Feeds for real-time ETH/USD pricing
  - Automation for liquidations
  - VRF for provable randomness (airdrops)
  - Functions for credit scoring

## Quick Start
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Compile contracts:**
   ```sh
   npx hardhat compile
   ```
3. **Deploy contracts to testnet (e.g., Sepolia):**
   ```sh
   npx hardhat run scripts/deploy.js --network sepolia
   ```
4. **Run the frontend locally:**
   ```sh
   cd frontend
   npm install
   npm start
   ```

## How It Works
- Users deposit ETH as collateral and borrow DAI.
- Collateral is valued in real time using Chainlink Data Feeds.
- If collateral value drops, Chainlink Automation triggers liquidation.
- Airdrops and credit scores are handled via Chainlink VRF and Functions.

## For Hackathon Judges
- **Live Demo:** [Vercel Deployment Link]https://chromion-three.vercel.app/
- **Full Source Code & Docs:** [https://github.com/rohitjadhav07/Chromion](https://github.com/rohitjadhav07/Chromion)
- **Setup:** See above for install/build/deploy. All contracts and frontend code are open-source.
- **Security:** No admin keys, no upgradeable proxies, all logic is on-chain and open for review.

## Documentation & Whitepaper
- [Full Docs & Source on GitHub](https://github.com/rohitjadhav07/Chromion)
- [Chainlink Data Feeds](https://docs.chain.link/data-feeds)
- [Chainlink Automation](https://docs.chain.link/chainlink-automation/introduction)

## License
MIT
