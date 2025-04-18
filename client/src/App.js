// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Page components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import QueueTest from './pages/QueueTest';

function App() {
  return (
    <Router>
      <div className="App">
        {/* ✅ Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/test-queue" element={<QueueTest />} />
        </Routes>

        {/* ✅ Toast container for global notifications */}
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
