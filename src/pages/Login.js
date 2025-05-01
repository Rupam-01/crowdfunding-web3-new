import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button onClick={handleLogin}>Login</button>
      <p>Not registered? <button onClick={() => navigate('/register')}>Register</button></p>
    </div>
  );
};
