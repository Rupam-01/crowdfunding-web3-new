const express = require('express');
const cors = require('cors');
const axios = require('axios');  // Add axios for making external requests
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Dummy in-memory storage
let campaigns = [];

// Aadhaar Verification API (Using UIDAI or Mock API)
app.post('/verify-aadhaar', async (req, res) => {
  const { aadhaarNumber } = req.body;

  if (!aadhaarNumber || aadhaarNumber.length !== 12) {
    return res.status(400).json({ message: 'Invalid Aadhaar number' });
  }

  try {
    // Replace this URL with the actual API endpoint that verifies Aadhaar numbers
    let fn = async function () {
        let response =  await axios.post('https://your-aadhaar-api.com/verify', {aadhaarNumber: aadhaarNumber});

        // const response = await axios.post('https://real-aadhaar-api.com/verify', {
        //   aadhaarNumber: aadhaarNumber
        // });
        

        // Check response and if verification is successful
        if (response.data.success) {
          return await res.json({ success: true, message: 'Aadhaar verified successfully' });
        } else {
          return res.status(400).json({ success: false, message: 'Aadhaar verification failed' });
        }
      }
    
    fn();

    

  } catch (error) {
    console.error('Error verifying Aadhaar:', error);
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Create Campaign API
app.post('/create-campaign', (req, res) => {
  const { title, description, goal, owner } = req.body;
  
  const newCampaign = {
    id: campaigns.length + 1,
    title,
    description,
    goal,
    owner,
    amountRaised: 0,
  };
  campaigns.push(newCampaign);
  res.json({ success: true, campaign: newCampaign });
});

// Fetch all Campaigns API
app.get('/campaigns', (req, res) => {
  res.json(campaigns);
});

// Contribute to a Campaign API
app.post('/contribute', (req, res) => {
  const { campaignId, amount } = req.body;
  const campaign = campaigns.find(c => c.id === campaignId);

  if (!campaign) {
    return res.status(404).json({ success: false, message: 'Campaign not found' });
  }

  campaign.amountRaised += amount;
  res.json({ success: true, campaign });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
// Mock Aadhaar OTP send
app.post('/mock/send-otp', (req, res) => {
  const { aadhaarNumber } = req.body;
  if (!aadhaarNumber || aadhaarNumber.length !== 12) {
    return res.status(400).json({ message: 'Invalid Aadhaar number' });
  }
  // Simulate OTP send
  return res.json({ message: 'OTP sent to your registered mobile (simulated)' });
});

// Mock OTP verify
app.post('/mock/verify-otp', (req, res) => {
  const { otp } = req.body;
  if (otp === '123456') {
    return res.json({ message: 'Aadhaar verified successfully (simulated)' });
  }
  return res.status(400).json({ message: 'Invalid OTP' });
});

