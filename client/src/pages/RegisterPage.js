import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterPage.css';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'Weak';
    if (/[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8)
      return 'Strong';
    return 'Medium';
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error('Invalid email format');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('https://smartline-backend.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        const loginRes = await fetch('https://smartline-backend.onrender.com/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginRes.json();

        if (loginRes.ok) {
          localStorage.setItem('token', loginData.token);
          localStorage.setItem('role', loginData.role);
          toast.success('Registered & Logged in!');
          setTimeout(() => {
            navigate(loginData.role === 'admin' ? '/admin-dashboard' : '/dashboard');
          }, 1500);
        } else {
          toast.success('Registered! Please log in.');
          setTimeout(() => navigate('/login'), 1500);
        }
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div className="register-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ToastContainer position="top-center" />
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

        <div className="password-field-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="register-input"
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        {password && (
          <p className={`password-strength ${getPasswordStrength(password).toLowerCase()}`}>
            Strength: {getPasswordStrength(password)}
          </p>
        )}

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="register-input"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="register-button" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            'Register'
          )}
        </button>
      </motion.form>
    </motion.div>
  );
}

export default RegisterPage;
