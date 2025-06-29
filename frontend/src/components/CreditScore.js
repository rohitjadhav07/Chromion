import React, { useState } from 'react';

import { ethers } from 'ethers';

import LendingProtocol from '../abis/LendingProtocol.json';

// These values are hardcoded from your .env for demo purposes. In production, use a secure config.
const DON_PUB_KEY = "0x0000000000000000000000000000000000000000000000000000000000000000"; // Replace with actual DON public key if available
const SUBSCRIPTION_ID = 7966;
const GAS_LIMIT = 100000;

const CONTRACT_ADDRESS = "0x8119c8dE00ED74A691f66f966809997c634b8b41";

function CreditScore() {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);


  const handleRequest = async () => {
    if (!window.ethereum) return;
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LendingProtocol.abi, signer);
      // Use real values from .env
      const tx = await contract.requestCreditScore(userId, DON_PUB_KEY, SUBSCRIPTION_ID, GAS_LIMIT);
      await tx.wait();
      // Success: Credit score requested
      // Optionally, fetch score after some time
      const address = await signer.getAddress();
      const scoreValue = await contract.userCreditScore(address);
      setScore(scoreValue.toString());
    } catch (e) {
      // Error: Request failed
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
      <span style={{ fontWeight: 600, fontSize: 18 }}>Request Credit Score (Chainlink Functions)</span>
      <input
        type="text"
        value={userId}
        onChange={e => setUserId(e.target.value)}
        placeholder="User ID"
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
      />
      <button
        onClick={handleRequest}
        disabled={!userId || loading}
        style={{
          background: '#3182CE',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '8px 18px',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Requesting...' : 'Request Credit Score'}
      </button>
      {score && <div style={{ marginTop: 8 }}>Your Credit Score: {score}</div>}
    </div>
  );
}

export default CreditScore;
