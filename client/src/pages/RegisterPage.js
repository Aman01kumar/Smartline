// client/src/pages/RegisterPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Make sure to import the CSS

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('https://smartline-backend.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Registered successfully!');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage(`❌ ${data.message || 'Registration failed'}`);
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      setMessage('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.form
        onSubmit={handleRegister}
        className="register-form"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="register-title">📝 Register</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="register-input"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="register-input"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="register-input"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="register-button">
          Register
        </button>

        {message && (
          <p className={`register-message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </motion.form>
    </motion.div>
  );
}

export default RegisterPage;
