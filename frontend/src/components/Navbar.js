import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import chainlinkLogo from '../assets/chainlink-logo.svg';

function Navbar() {
  return (
    <div style={{
      background: '#319795',
      padding: '18px 32px 14px 32px',
      color: 'white',
      boxShadow: '0 4px 18px 0 rgba(49,151,149,0.18)',
      borderBottomLeftRadius: 18,
      borderBottomRightRadius: 18,
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
          <RouterLink to="/" style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            Lending Protocol
            <img src={chainlinkLogo} alt="Chainlink Logo" style={{ height: 32, width: 32, verticalAlign: 'middle' }} />
          </RouterLink>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <RouterLink to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</RouterLink>
            <RouterLink to="/deposit" style={{ color: 'white', textDecoration: 'none' }}>Deposit</RouterLink>
            <RouterLink to="/borrow" style={{ color: 'white', textDecoration: 'none' }}>Borrow</RouterLink>
            <RouterLink to="/repay" style={{ color: 'white', textDecoration: 'none' }}>Repay</RouterLink>
            <RouterLink to="/withdraw" style={{ color: 'white', textDecoration: 'none' }}>Withdraw</RouterLink>
            <RouterLink to="/airdrop" style={{ color: 'white', textDecoration: 'none' }}>Airdrop</RouterLink>
            <RouterLink to="/airdrop-leaderboard" style={{ color: 'white', textDecoration: 'none' }}>Airdrop Winners</RouterLink>
            <RouterLink to="/credit-score" style={{ color: 'white', textDecoration: 'none' }}>Credit Score</RouterLink>
            <RouterLink to="/liquidation" style={{ color: 'white', textDecoration: 'none' }}>Liquidation</RouterLink>
            <span style={{ marginLeft: 16 }}><WalletConnect /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
