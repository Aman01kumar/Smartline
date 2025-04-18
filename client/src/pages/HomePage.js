import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/api/queue`)
      .then(res => res.json())
      .then(data => console.log('Queue data:', data))
      .catch(err => console.error('API fetch error:', err));
  }, []);

  return (
    <div>
      <h1>Welcome to SmartLine</h1>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
}

export default HomePage;
