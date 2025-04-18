// client/src/pages/RegisterPage.js

import React, { useState } from 'react';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // or 'admin'

  const handleRegister = async (e) => {
    e.preventDefault();

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
        alert('✅ Registered successfully!');
        // Redirect or store token here
      } else {
        alert(`❌ Error: ${data.message || 'Registration failed'}`);
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleRegister} className="register-form">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
