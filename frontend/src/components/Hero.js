import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import chainlinkLogo from '../assets/chainlink-logo.svg';

function Hero() {
  return (
    <div style={{ textAlign: 'center', padding: '48px 16px', background: 'linear-gradient(to right, #38B2AC, #4299E1)', color: 'white', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', marginBottom: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <img src={chainlinkLogo} alt="Chainlink Logo" style={{ width: '60px', height: '60px', marginBottom: 8 }} />
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>Lending Protocol</h1>
        <div style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
          Decentralized, secure, and automated lending on Ethereum. Powered by Chainlink oracles, automation, and randomness for a next-gen DeFi experience.
        </div>
        <RouterLink to="/deposit" style={{ background: '#319795', color: 'white', fontSize: '1.1rem', padding: '12px 32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', textDecoration: 'none', fontWeight: 600 }}>
          Get Started
        </RouterLink>
      </div>
    </div>
  );
}

export default Hero;
