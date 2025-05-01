import React, { useState } from 'react';

export const CreateCampaign = ({ account }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/create-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          goal: parseFloat(goal),
          owner: account,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Campaign created successfully!');
        setTitle('');
        setDescription('');
        setGoal('');
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <div>
      <h2>Create New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea 
          placeholder="Description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input 
          type="number" 
          placeholder="Goal Amount (ETH)" 
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
        />
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
};
