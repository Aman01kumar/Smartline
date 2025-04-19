import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:10000/api';

    try {
      const res = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage('✅ Login successful! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(data.message || '❌ Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoading(false);
      setMessage('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <motion.div className="login-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="login-box" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
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

          <div className="login-options">
            <a href="/forgot-password" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <p className={`login-message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

        <div className="social-login">
          <p className="or-divider">or continue with</p>
          <div className="social-buttons">
            <button className="social-button google" onClick={() => alert('Google login coming soon!')}>
              <img src="/google-icon.svg" alt="Google" />
              Google
            </button>
            <button className="social-button github" onClick={() => alert('GitHub login coming soon!')}>
              <img src="/github-icon.svg" alt="GitHub" />
              GitHub
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LoginPage;
