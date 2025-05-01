import React from 'react';
import Navbar from '../components/Navbar';

export const Donation = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h2>Donation-Based Crowdfunding</h2>
        <p>This page will show campaigns where people donate without expecting returns.</p>
      </div>
    </>
  );
};
