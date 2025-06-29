import React, { useState } from 'react';

import { ethers } from 'ethers';
import LendingProtocol from '../abis/LendingProtocol.json';

const CONTRACT_ADDRESS = "0x112A7Aff2eC7a42C2810E3e226854445bF9227f0";

function Withdraw() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);


  // This assumes a withdraw function exists in your contract. If not, add it in Solidity.
  const handleWithdraw = async () => {
    if (!window.ethereum) return;
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LendingProtocol.abi, signer);
      // This is a placeholder. Replace with your actual withdraw logic.
      const tx = await contract.withdraw(ethers.parseUnits(amount, 18));
      await tx.wait();
      // Success: Withdraw successful
      setAmount('');
    } catch (e) {
      // Error: Withdraw failed
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
      <span style={{ fontWeight: 600, fontSize: 18 }}>Withdraw Collateral</span>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        min={0.01}
        step={0.01}
        placeholder="Amount in ETH"
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
      />
      <button
        onClick={handleWithdraw}
        disabled={!amount || loading}
        style={{
          background: '#E53E3E',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '8px 18px',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Withdrawing...' : 'Withdraw'}
      </button>
    </div>
  );
}

export default Withdraw;
