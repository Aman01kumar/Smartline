import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import LogoutPage from './pages/LogoutPage';

import Header from './components/Header';
import Footer from './components/Footer';

// Custom hook to get auth details
const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    user,
    isAdmin: user?.role === 'admin',
    isAuthenticated: !!user,
  };
};

const App = () => {
  const { user, isAdmin, isAuthenticated } = useAuth();

  return (
    <Router>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/user-dashboard"
          element={isAuthenticated && !isAdmin ? <UserDashboard user={user} /> : <Navigate to="/login" />}
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
