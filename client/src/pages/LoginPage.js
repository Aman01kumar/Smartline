import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LoginPage.css'; // plain CSS styles

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
        // Save token and user info to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setMessage('✅ Login successful!');

        // Redirect based on role
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setMessage(data.message || '❌ Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <motion.div
      className="login-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="login-box"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="login-title">🔐 Login</h2>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {message && (
          <p
            className={`login-message ${
              message.includes('✅') ? 'success' : 'error'
            }`}
          >
            {message}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default LoginPage;
