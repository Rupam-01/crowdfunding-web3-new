import React, { useState } from 'react';
import '../styles/Aadhaar.css'; // You can create this CSS file for styling
import axios from 'axios';

const AadhaarVerification = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [status, setStatus] = useState('');

  const sendOtp = async () => {
    if (aadhaarNumber.length !== 12) {
      setStatus('Invalid Aadhaar number');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/mock/send-otp', { aadhaarNumber });
      setOtpSent(true);
      setStatus(res.data.message);
    } catch (err) {
      setStatus('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:3001/mock/verify-otp', { otp: enteredOtp });
      setStatus(res.data.message);
    } catch (err) {
      setStatus('OTP verification failed');
    }
  };

  return (
    <div className="aadhaar-container">
      <h2>Aadhaar Verification (Mock)</h2>
      <input
        type="text"
        placeholder="Enter Aadhaar Number"
        value={aadhaarNumber}
        onChange={(e) => setAadhaarNumber(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>

      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      {status && <p>{status}</p>}
    </div>
  );
};

export default AadhaarVerification;
