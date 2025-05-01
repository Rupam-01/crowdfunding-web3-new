import React, { useState } from 'react';

const Verify = () => {
  const [aadhaar, setAadhaar] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setStatus('');

    try {
      let x = async function(){
        const response = await fetch('http://localhost:3001/verify-aadhaar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ aadhaarNumber: aadhaar })
  
        });

        const data = await response.json();

        if (data.verified) {
          setStatus('✅ Aadhaar Verified');
        } else {
          setStatus('❌ Verification Failed');
        }
      }
      
      x();
      
    } catch (error) {
      setStatus('❌ Server Error: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Aadhaar Verification</h2>
      <input
        type="text"
        placeholder="Enter Aadhaar Number"
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button onClick={handleVerify} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify'}
      </button>
      <p>{status}</p>
    </div>
  );
};

export default Verify;
