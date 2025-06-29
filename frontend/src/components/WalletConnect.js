import React, { useState } from 'react';

import { ethers } from 'ethers';

function WalletConnect({ onConnect }) {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      if (onConnect) onConnect(accounts[0]);
    } else {
      alert('MetaMask not detected');
    }
  };

  return account ? (
    <span style={{ fontWeight: 500 }}>Connected: {account}</span>
  ) : (
    <button
      onClick={connectWallet}
      style={{
        background: '#319795',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        padding: '8px 18px',
        fontWeight: 600,
        cursor: 'pointer',
        margin: '8px 0'
      }}
    >
      Connect Wallet
    </button>
  );
}

export default WalletConnect;
