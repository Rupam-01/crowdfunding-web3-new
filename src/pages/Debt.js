import React from 'react';
import Navbar from '../components/Navbar';

export const Debt = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h2>Debt-Based Crowdfunding</h2>
        <p>This page lists campaigns where contributions are repaid with interest.</p>
      </div>
    </>
  );
};
