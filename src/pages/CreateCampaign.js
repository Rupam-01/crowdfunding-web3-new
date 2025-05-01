import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export const CreateCampaign = () => {
  const [campaignName, setCampaignName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission to create a campaign
    console.log('Creating Campaign', { campaignName, goalAmount, description });
    // Add logic to interact with your smart contract (if applicable)
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h2>Create a New Campaign</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Campaign Name:</label>
            <input 
              type="text" 
              value={campaignName} 
              onChange={(e) => setCampaignName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Goal Amount (ETH):</label>
            <input 
              type="number" 
              value={goalAmount} 
              onChange={(e) => setGoalAmount(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Create Campaign</button>
        </form>
      </div>
    </>
  );
};
