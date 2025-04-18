import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000';

    try {
      const res = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setMessage('✅ Login successful!');
        navigate('/dashboard');
      } else {
        setMessage(data.message || '❌ Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Login</button>
      </form>

      {message && (
        <p style={{ color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>
      )}
    </div>
  );
}

export default LoginPage;
