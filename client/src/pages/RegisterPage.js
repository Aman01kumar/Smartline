import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const baseUrl =
      process.env.REACT_APP_API_URL ||
      'https://smartline-backend.onrender.com/api'; // fallback

    const apiUrl = `${baseUrl}/users/register`;
    console.log("📤 Registering to:", apiUrl);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role })
      });

      const contentType = response.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await response.json()
        : { message: "❗ Unexpected server response (not JSON)" };

      if (response.ok) {
        alert('✅ Registered successfully!');
        navigate('/login');
      } else {
        console.error("❌ Registration failed:", data);
        alert(data.message || '⚠️ Registration failed');
      }
    } catch (error) {
      console.error('❌ Network or server error:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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

        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select><br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
