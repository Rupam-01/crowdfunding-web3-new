import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

export const Home = () => {
  const navigate = useNavigate();

  const crowdfundingTypes = [
    {
      title: 'Donation-Based',
      description: 'Support a cause without expecting any financial return.',
      color: '#FFD700',
      route: '/donation',
    },
    {
      title: 'Equity-Based',
      description: 'Invest and get equity or shares in the project or company.',
      color: '#7FFFD4',
      route: '/equity',
    },
    {
      title: 'Debt-Based',
      description: 'Contribute with the expectation of being paid back with interest.',
      color: '#FF7F7F',
      route: '/debt',
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  // Navigate to the Create Campaign page
  const handleCreateCampaign = () => {
    navigate('/create-campaign');
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <h2>Explore Different Types of Crowdfunding</h2>
        <div className="card-container">
          {crowdfundingTypes.map((type, index) => (
            <div
              key={index}
              className="card"
              style={{ backgroundColor: type.color }}
              onClick={() => handleCardClick(type.route)}
            >
              <h3>{type.title}</h3>
              <p>{type.description}</p>
            </div>
          ))}
        </div>

        {/* Create Campaign Button */}
        <div className="create-campaign-container">
          <button className="create-campaign-btn" onClick={handleCreateCampaign}>
            Create Campaign
          </button>
        </div>
      </div>
    </>
  );
};
