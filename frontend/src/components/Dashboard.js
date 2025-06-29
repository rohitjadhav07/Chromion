
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import LendingProtocol from '../abis/LendingProtocol.json';
import chainlinkLogo from '../assets/chainlink-logo.svg';

const CONTRACT_ADDRESS = "0x112A7Aff2eC7a42C2810E3e226854445bF9227f0";

function Dashboard() {
  const [ethPrice, setEthPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LendingProtocol.abi, provider);
      try {
        const price = await contract.getLatestPrice();
        setEthPrice(ethers.formatUnits(price, 18));
      } catch (e) {
        setEthPrice('Error');
      }
      setLoading(false);
    };
    fetchPrice();
  }, []);

  return (
    <div style={{
      padding: 16,
      border: '1px solid #E2E8F0',
      borderRadius: 8,
      marginBottom: 24,
      background: '#fff',
      maxWidth: 400
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ fontWeight: 600, fontSize: 20 }}>Features</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
        <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
          ETH Price <img src={chainlinkLogo} alt="Chainlink Logo" style={{ height: 20, width: 20, verticalAlign: 'middle' }} />
        </span>
        {loading ? <span>Loading...</span> : <span>{ethPrice ? `${ethPrice} USD` : 'N/A'}</span>}
      </div>
    </div>
  );
}

export default Dashboard;
