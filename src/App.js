import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConnectWallet } from './components/ConnectWallet';
import { CreateCampaign } from './components/CreateCampaign';
import { Contribute } from './components/Contribute';
import { CampaignInfo } from './components/CampaignInfo';
import Navbar from './components/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import Verify from './pages/verify'; 
import AadharVerification from './pages/AadharVerification';


import './styles/App.css';

const CONTRACT_ADDRESS = '0x35CF97d30dfAF0AAc8dc90b37A329ed103D44d8B';

const Dashboard = ({ account, setAccount }) => {
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login'; // Redirect to login
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <h1>Crowdfunding DApp</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {!account && <ConnectWallet setAccount={setAccount} />}
      {account && (
        <>
          <CampaignInfo contractAddress={CONTRACT_ADDRESS} />
          <Contribute contractAddress={CONTRACT_ADDRESS} />
        </>
      )}
    </div>
  );
};

function App() {
  const [account, setAccount] = useState('');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard account={account} setAccount={setAccount} /> : <Navigate to="/login" />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verify" element={<AadharVerification />} />
      </Routes>
    </Router>
  );
}

export default App;
