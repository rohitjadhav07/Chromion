import React from 'react';

function Docs() {
  return (
    <div style={{ padding: '32px 0' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '2rem', fontWeight: 700 }}>Documentation</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
        <span>Read our full documentation and whitepaper on GitHub:</span>
        <a href="https://github.com/rohitjadhav07/Chromion" style={{ color: '#319795', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
          https://github.com/rohitjadhav07/Chromion
        </a>
        <span>For hackathon judges: see the <b>README.md</b> in the root of the repo for setup and architecture details.</span>
      </div>
    </div>
  );
}

export default Docs;
