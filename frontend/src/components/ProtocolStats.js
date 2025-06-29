import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import LendingProtocol from '../abis/LendingProtocol.json';

const CONTRACT_ADDRESS = "0x112A7Aff2eC7a42C2810E3e226854445bF9227f0";

function ProtocolStats() {
  const [tvl, setTvl] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!window.ethereum) return;
      setLoading(true);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, LendingProtocol.abi, provider);
        let tvlSum = ethers.parseEther("0");
        let userCount = 0;
        let i = 0;
        while (true) {
          try {
            const user = await contract.users(i);
            const pos = await contract.positions(user);
            if (pos.open) {
              tvlSum += pos.collateralETH;
              userCount++;
            }
            i++;
          } catch (e) {
            break;
          }
        }
        setTvl(ethers.formatUnits(tvlSum, 18));
        setTotalUsers(userCount);
      } catch (e) {
        setTvl('Error');
        setTotalUsers('Error');
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '12px', marginTop: '24px', background: '#F7FAFC' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', width: '100%' }}>
          <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '12px', background: 'white' }}>
            <div style={{ fontSize: '0.95rem', color: '#718096', marginBottom: '4px' }}>Total Value Locked (ETH)</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>{loading ? <span style={{ fontSize: '1rem' }}>...</span> : tvl}</div>
            <div style={{ fontSize: '0.85rem', color: '#A0AEC0' }}>All users' collateral</div>
          </div>
          <div style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '12px', background: 'white' }}>
            <div style={{ fontSize: '0.95rem', color: '#718096', marginBottom: '4px' }}>Total Users</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>{loading ? <span style={{ fontSize: '1rem' }}>...</span> : totalUsers}</div>
            <div style={{ fontSize: '0.85rem', color: '#A0AEC0' }}>With open positions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtocolStats;
