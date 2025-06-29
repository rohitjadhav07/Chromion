import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import LendingProtocol from '../abis/LendingProtocol.json';

const CONTRACT_ADDRESS = "0x112A7Aff2eC7a42C2810E3e226854445bF9227f0";

function LiquidationStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      if (!window.ethereum) return;
      setLoading(true);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, LendingProtocol.abi, provider);
        const isUnder = await contract.isUndercollateralized(address);
        setStatus(isUnder);
      } catch (e) {
        setStatus(null);
      }
      setLoading(false);
    };
    checkStatus();
  }, []);

  return (
    <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '12px', marginTop: '24px', background: '#F7FAFC', maxWidth: 400 }}>
      <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Liquidation Status</span>
      {loading ? (
        <span style={{ fontSize: '1rem', marginLeft: 8 }}>Loading...</span>
      ) : (
        <span style={{ color: status === null ? '#718096' : status ? '#E53E3E' : '#38A169', fontWeight: 600, marginLeft: 8 }}>
          {status === null ? 'N/A' : status ? 'Undercollateralized! At risk of liquidation.' : 'Healthy'}
        </span>
      )}
    </div>
  );
}

export default LiquidationStatus;
