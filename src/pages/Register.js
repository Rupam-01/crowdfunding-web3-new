import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', password: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="mobile" placeholder="Mobile" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button onClick={handleRegister}>Register</button>
      <p>Already registered? <button onClick={() => navigate('/login')}>Login</button></p>
    </div>
  );
};
