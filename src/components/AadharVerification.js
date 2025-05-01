// import React, { useState } from 'react';
// import axios from 'axios';

// const AadharVerification = () => {
//   const [aadhaarNumber, setAadhaarNumber] = useState('');
//   const [verificationResult, setVerificationResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleVerify = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3001/verify-aadhaar', {aadhaarNumber});

//       if (response.data.success) {
//         setVerificationResult('Aadhaar verified successfully!');
//       } else {
//         setVerificationResult('Aadhaar verification failed.');
//       }
//     } catch (error) {
//       console.error('Error verifying Aadhaar:', error);
//       setVerificationResult('Error verifying Aadhaar.');
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <h1>Aadhaar Verification</h1>
//       <input
//         type="text"
//         value={aadhaarNumber}
//         onChange={(e) => setAadhaarNumber(e.target.value)}
//         placeholder="Enter Aadhaar Number"
//       />
//       <button onClick={handleVerify} disabled={loading}>
//         {loading ? 'Verifying...' : 'Verify Aadhaar'}
//       </button>
//       {verificationResult && <p>{verificationResult}</p>}
//     </div>
//   );
// };

// export default AadharVerification;
