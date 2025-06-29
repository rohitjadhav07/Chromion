import React from 'react';

function HowItWorks() {
  return (
    <div style={{ padding: '32px 0' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '2rem', fontWeight: 700 }}>How It Works</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
        <span style={{ fontSize: '1.1rem' }}>Lending Protocol lets you:</span>
        <ul style={{ paddingLeft: '20px', margin: 0, listStyle: 'none' }}>
          <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#319795', fontWeight: 'bold', marginRight: 8 }}>✔</span>Deposit ETH as collateral
          </li>
          <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#319795', fontWeight: 'bold', marginRight: 8 }}>✔</span>Borrow DAI against your ETH
          </li>
          <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#319795', fontWeight: 'bold', marginRight: 8 }}>✔</span>Get real-time prices via Chainlink Data Feeds
          </li>
          <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#319795', fontWeight: 'bold', marginRight: 8 }}>✔</span>Automated liquidations via Chainlink Automation
          </li>
          <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#319795', fontWeight: 'bold', marginRight: 8 }}>✔</span>Request airdrops and credit scores using Chainlink VRF & Functions
          </li>
        </ul>
        <span>All actions are transparent, secure, and automated by smart contracts.</span>
      </div>
    </div>
  );
}

export default HowItWorks;
