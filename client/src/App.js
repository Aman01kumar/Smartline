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
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// ✅ Shared components
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        {/* ✅ Header - visible on all routes */}
        <Header />

        {/* ✅ Route definitions */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/test-queue" element={<QueueTest />} />
        </Routes>

        {/* ✅ Global toast notifications */}
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
