import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import LendingProtocol from '../abis/LendingProtocol.json';

const CONTRACT_ADDRESS = "0x112A7Aff2eC7a42C2810E3e226854445bF9227f0";

function UserDashboard() {
  const [account, setAccount] = useState(null);
  const [position, setPosition] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!window.ethereum) return;
      setLoading(true);
      setError(null);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, LendingProtocol.abi, provider);
        const pos = await contract.positions(address);
        const price = await contract.getLatestPrice();
        setPosition(pos);
        setEthPrice(price);
      } catch (e) {
        setError('Failed to fetch user data');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  let healthFactor = null;
  if (position && ethPrice) {
    const collateralUSD = Number(ethers.formatUnits(position.collateralETH, 18)) * Number(ethers.formatUnits(ethPrice, 18));
    const debtUSD = Number(ethers.formatUnits(position.debtDAI, 18));
    healthFactor = debtUSD > 0 ? (collateralUSD * 0.8) / debtUSD : '∞';
  }

  return (
    <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '12px', marginTop: '24px', background: '#F7FAFC' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.15rem' }}>Your Position Overview</span>
        {loading ? (
          <span style={{ fontSize: '1rem' }}>Loading...</span>
        ) : error ? (
          <div style={{ background: '#FED7D7', color: '#C53030', padding: '8px 12px', borderRadius: '8px', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
            <span style={{marginRight: 8, fontWeight: 'bold'}}>!</span>{error}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', width: '100%' }}>
            <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '12px', background: 'white' }}>
              <div style={{ fontSize: '0.95rem', color: '#718096', marginBottom: '4px' }}>Collateral (ETH)</div>
              <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>{position ? ethers.formatUnits(position.collateralETH, 18) : '0'}</div>
              <div style={{ fontSize: '0.85rem', color: '#A0AEC0' }}>Deposited</div>
            </div>
            <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '12px', background: 'white' }}>
              <div style={{ fontSize: '0.95rem', color: '#718096', marginBottom: '4px' }}>Debt (DAI)</div>
              <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>{position ? ethers.formatUnits(position.debtDAI, 18) : '0'}</div>
              <div style={{ fontSize: '0.85rem', color: '#A0AEC0' }}>Borrowed</div>
            </div>
            <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '12px', background: 'white' }}>
              <div style={{ fontSize: '0.95rem', color: '#718096', marginBottom: '4px' }}>Health Factor</div>
              <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>{healthFactor !== null ? healthFactor : '-'}</div>
              <div style={{ fontSize: '0.85rem', color: '#A0AEC0' }}>{healthFactor !== null && healthFactor !== '∞' && healthFactor < 1 ? 'At Risk' : 'Safe'}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
