import React, { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import LendingProtocol from '../abis/LendingProtocol.json';

const CONTRACT_ADDRESS = "0x112A7Aff2eC7a42C2810E3e226854445bF9227f0";

function AirdropLeaderboard() {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinners = async () => {
      if (!window.ethereum) return;
      setLoading(true);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, LendingProtocol.abi, provider);
        // Listen for AirdropWon events
        const filter = contract.filters.AirdropWon();
        const events = await contract.queryFilter(filter, -10000); // last 10k blocks
        const leaderboard = events.map(e => ({
          address: e.args.user,
          amount: ethers.formatUnits(e.args.amount, 18),
          blockNumber: e.blockNumber
        })).sort((a, b) => b.amount - a.amount);
        setWinners(leaderboard);
      } catch (e) {
        setWinners([]);
      }
      setLoading(false);
    };
    fetchWinners();
  }, []);

  return (
    <div style={{ padding: 16, border: '1px solid #E2E8F0', borderRadius: 8, marginTop: 24, background: '#fff', maxWidth: 700 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Airdrop Winners Leaderboard</h2>
      {loading ? <span>Loading...</span> : winners.length === 0 ? <span>No airdrop winners yet.</span> : (
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left', padding: '8px' }}>Address</th>
                <th style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left', padding: '8px' }}>Amount (ETH)</th>
                <th style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left', padding: '8px' }}>Block</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((w, i) => (
                <tr key={i}>
                  <td style={{ borderBottom: '1px solid #e2e8f0', padding: '8px' }}>{w.address}</td>
                  <td style={{ borderBottom: '1px solid #e2e8f0', padding: '8px' }}>{w.amount}</td>
                  <td style={{ borderBottom: '1px solid #e2e8f0', padding: '8px' }}>{w.blockNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AirdropLeaderboard;
