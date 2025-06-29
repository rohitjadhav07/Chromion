import React from 'react';

function Security() {
  return (
    <div style={{ padding: '32px 0' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '2rem', fontWeight: 700 }}>Security &amp; Best Practices</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
        <span style={{ fontSize: '1.1rem' }}>Lending Protocol is built with security in mind:</span>
        <ul style={{ paddingLeft: '20px', margin: 0, listStyle: 'none' }}>
          <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#319795', fontWeight: 'bold', marginRight: 8 }}>🔒</span>Chainlink Data Feeds for tamper-proof price oracles
          </li>
          <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#319795', fontWeight: 'bold', marginRight: 8 }}>🔒</span>Chainlink Automation for trustless liquidations
          </li>
          <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#319795', fontWeight: 'bold', marginRight: 8 }}>🔒</span>Chainlink VRF for provable randomness in airdrops
          </li>
          <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#319795', fontWeight: 'bold', marginRight: 8 }}>🔒</span>Chainlink Functions for off-chain credit scoring
          </li>
          <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#319795', fontWeight: 'bold', marginRight: 8 }}>🔒</span>Open-source, audited smart contracts
          </li>
          <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#319795', fontWeight: 'bold', marginRight: 8 }}>🔒</span>No admin keys or upgradeable proxies
          </li>
        </ul>
        <span>For more details, see our <a href="/docs" style={{ color: '#319795', textDecoration: 'underline' }}>documentation</a>.</span>
      </div>
    </div>
  );
}

export default Security;
