import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConnectWallet } from '../components/ConnectWallet';
import { CampaignInfo } from '../components/CampaignInfo';
import { Contribute } from '../components/Contribute';
import Navbar from '../components/Navbar';

const Dashboard = ({ account, setAccount }) => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('http://localhost:3001/campaigns');
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleContribute = async (id, amount) => {
    try {
      const response = await fetch('http://localhost:3001/contribute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId: id,
          amount: parseFloat(amount),
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Contribution successful!');
        fetchCampaigns(); // Refresh campaigns
      }
    } catch (error) {
      console.error('Error contributing:', error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '10px' }}>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
        {!account && <ConnectWallet setAccount={setAccount} />}

        {account && (
          <>
            <h2>All Campaigns</h2>
            {campaigns.map((campaign) => (
              <div key={campaign.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
                <p>Goal: {campaign.goal} ETH</p>
                <p>Raised: {campaign.amountRaised} ETH</p>
                {account !== campaign.owner && (
                  <Contribute campaignId={campaign.id} onContribute={handleContribute} />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
