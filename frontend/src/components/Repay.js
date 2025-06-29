import React, { useState } from 'react';

import { ethers } from 'ethers';

import LendingProtocol from '../abis/LendingProtocol.json';
import ERC20 from '../abis/ERC20.json';

const CONTRACT_ADDRESS = "0x81Af11e7c0202a379b49b909B02a7041833dB40E"; // New Sepolia deployment
const DAI_ADDRESS = "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844"; // Sepolia DAI

function Repay() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);


  // This assumes a repay function exists in your contract. If not, add it in Solidity.
  const handleRepay = async () => {
    if (!window.ethereum) return;
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LendingProtocol.abi, signer);
      const dai = new ethers.Contract(DAI_ADDRESS, ERC20, signer);
      const userAddress = await signer.getAddress();
      const repayAmount = ethers.parseUnits(amount, 18);

      // Check allowance
      const allowance = await dai.allowance(userAddress, CONTRACT_ADDRESS);
      if (allowance < repayAmount) {
        // Approve DAI if needed
        const approveTx = await dai.approve(CONTRACT_ADDRESS, repayAmount);
        await approveTx.wait();
      }

      // Repay
      const tx = await contract.repay(repayAmount);
      await tx.wait();
      setAmount('');
    } catch (e) {
      // Error: Repay failed
      console.error(e);
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
      <span style={{ fontWeight: 600, fontSize: 18 }}>Repay DAI</span>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        min={0.01}
        step={0.01}
        placeholder="Amount in DAI"
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
      />
      <button
        onClick={handleRepay}
        disabled={!amount || loading}
        style={{
          background: '#38A169',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '8px 18px',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Repaying...' : 'Repay'}
      </button>
    </div>
  );
}

export default Repay;
