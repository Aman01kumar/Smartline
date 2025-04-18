import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ✅ Import global styles
import './index.css';

// ✅ Render App inside root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
