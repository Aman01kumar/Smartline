// client/src/pages/AboutPage.js
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <Header />

      <motion.div
        className="about-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="about-title">📖 About SmartLine</h1>

        <p className="about-text">
          <strong>SmartLine</strong> is an intelligent queue management system built to streamline
          waiting experiences for users and businesses alike. Our mission is to reduce wait times,
          increase efficiency, and provide real-time updates using modern web technologies.
        </p>

        <p className="about-text">
          This application is built using the <strong>MERN Stack</strong>: MongoDB, Express.js, React,
          and Node.js — coupled with <strong>Socket.IO</strong> for real-time updates, and styled beautifully
          with <strong>Framer Motion</strong>.
        </p>

        <p className="about-text">
          Whether you're managing appointments, walk-ins, or support queues, SmartLine helps
          create a seamless and organized experience for both admins and users.
        </p>
      </motion.div>

      <Footer />
    </div>
  );
}

export default AboutPage;
