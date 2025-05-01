/*import React, { useState } from 'react';
import { ethers } from 'ethers';
import crowdfundingABI from '../contract/crowdfundingABI.json';
import '../styles/Form.css';
import '../styles/Button.css';

export const Contribute = ({ contractAddress }) => {
  const [amount, setAmount] = useState('');

  const contribute = async () => {
    if (!amount) return;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, crowdfundingABI, signer);

      const transaction = await contract.contribute({ value: ethers.utils.parseEther(amount) });
      await transaction.wait();
      alert('Contribution successful!');
    } catch (error) {
      console.error(error);
      alert('Failed to contribute');
    }
  };

  return (
    <div className="form-container">
      <h2>Contribute</h2>
      <input
        type="text"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="button" onClick={contribute}>
        Contribute
      </button>
    </div>
  );
};

*/

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CampaignABI from '../abis/Campaign.json';

export const Contribute = ({ contractAddress }) => {
  const [amount, setAmount] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState('');

  // Load existing campaigns (for now, mock or assume a simple list)
  useEffect(() => {
    // In real setup, fetch this from backend or blockchain
    setCampaigns([
      { id: '1', address: contractAddress, name: 'Education Fund' },
      // Add more if needed
    ]);
  }, [contractAddress]);

  const handleContribute = async () => {
    if (!selectedCampaign || !amount) return alert("Fill all fields");

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const campaignContract = new ethers.Contract(
        selectedCampaign,
        CampaignABI,
        signer
      );

      const tx = await campaignContract.contribute({
        value: ethers.utils.parseEther(amount),
      });

      await tx.wait();
      alert('Contribution successful!');
    } catch (error) {
      console.error('Contribution failed:', error);
      alert('Error while contributing');
    }
  };

  return (
    <div>
      <h2>Contribute to a Campaign</h2>
      <select value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)}>
        <option value="">Select Campaign</option>
        {campaigns.map((c) => (
          <option key={c.id} value={c.address}>{c.name}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleContribute}>Contribute</button>
    </div>
  );
};

