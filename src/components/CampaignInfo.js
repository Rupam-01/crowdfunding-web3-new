import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'; // Ensure ethers is correctly imported
import crowdfundingABI from '../contract/crowdfundingABI.json';
import '../styles/Info.css';

export const CampaignInfo = ({ contractAddress }) => {
  const [goal, setGoal] = useState(0);
  const [raised, setRaised] = useState(0);

  useEffect(() => {
    const loadCampaignData = async () => {
      try {
        // Make sure window.ethereum is available
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum); // Web3Provider for MetaMask
          const signer = provider.getSigner(); // Get signer from the provider
          const contract = new ethers.Contract(contractAddress, crowdfundingABI, signer); // Use the contract

          // Fetch goal and raised data from contract
          const goal = await contract.goal();
          const raised = await contract.raisedAmount();

          // Format the data to Ether
          setGoal(ethers.utils.formatEther(goal));  // Use utils.formatEther for readability
          setRaised(ethers.utils.formatEther(raised));
        } else {
          console.error('Ethereum provider (MetaMask) not found');
        }
      } catch (error) {
        console.error('Error loading campaign data:', error);
      }
    };

    loadCampaignData();
  }, [contractAddress]);
//hello
  return (
    <div className="info-container">
      <h2>Campaign Info</h2>
      <p><strong>Goal:</strong> {goal} ETH</p>
      <p><strong>Raised:</strong> {raised} ETH</p>
    </div>
  );
};
