import React from 'react';

function Footer() {
  return (
    <div style={{
      background: '#285E61',
      color: 'white',
      padding: '12px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: '18px', marginBottom: 4 }}>
          <a href="/docs" style={{ color: 'white', textDecoration: 'none', fontSize: '0.98rem' }}>Docs</a>
          <a href="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '0.98rem' }}>About Us</a>
          <a href="/security" style={{ color: 'white', textDecoration: 'none', fontSize: '0.98rem' }}>Security</a>
          <a href="/how-it-works" style={{ color: 'white', textDecoration: 'none', fontSize: '0.98rem' }}>How It Works</a>
        </div>
        <span style={{ fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} Lending Protocol. All rights reserved.</span>
      </div>
    </div>
  );
}

export default Footer;
