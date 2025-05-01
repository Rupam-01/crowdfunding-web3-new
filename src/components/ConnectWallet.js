import React from 'react';
import { ethers } from 'ethers';

export const ConnectWallet = ({ setAccount }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } else {
      alert('Install MetaMask first!');
    }
  };

  return (
    <button onClick={connectWallet}>Connect Wallet</button>
  );
};
