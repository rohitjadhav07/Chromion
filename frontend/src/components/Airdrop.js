

import React, { useState } from 'react';
import { ethers } from 'ethers';
import LendingProtocol from '../abis/LendingProtocol.json';
import chainlinkLogo from '../assets/chainlink-logo.svg';


const CONTRACT_ADDRESS = "0x8119c8dE00ED74A691f66f966809997c634b8b41";

function Airdrop() {
  const [loading, setLoading] = useState(false);


  const handleAirdrop = async () => {
    if (!window.ethereum) return;
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LendingProtocol.abi, signer);
      const tx = await contract.requestAirdrop();
      await tx.wait();
      // Optionally: show a message to the user here
    } catch (e) {
      // Optionally: handle error
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 12,
      marginTop: 24,
      padding: 16,
      border: '1px solid #E2E8F0',
      borderRadius: 8,
      background: '#fff',
      maxWidth: 350
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src={chainlinkLogo} alt="Chainlink Logo" style={{ height: 28, width: 28, verticalAlign: 'middle' }} />
        <span style={{ fontWeight: 600, fontSize: 18 }}>Chainlink VRF Airdrop</span>
      </div>
      <button
        onClick={handleAirdrop}
        disabled={loading}
        style={{
          background: '#805AD5',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '8px 18px',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Requesting...' : 'Request Airdrop'}
      </button>
    </div>
  );
}

export default Airdrop;
