// client/src/pages/AboutPage.js
import React from 'react';
import { motion } from 'framer-motion';

function AboutPage() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex items-center justify-center px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold text-purple-700 mb-6">📖 About SmartLine</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong>SmartLine</strong> is an intelligent queue management system built to streamline
          waiting experiences for users and businesses alike. Our mission is to reduce wait times,
          increase efficiency, and provide real-time updates using modern web technologies.
        </p>

        <p className="text-lg text-gray-700 mt-4 leading-relaxed">
          This application is built using the <strong>MERN Stack</strong>: MongoDB, Express.js, React,
          and Node.js — coupled with <span className="font-medium">Socket.IO</span> for real-time updates,
          and styled beautifully with <span className="font-medium">Tailwind CSS</span> & <span className="font-medium">Framer Motion</span>.
        </p>

        <p className="text-lg text-gray-700 mt-4 leading-relaxed">
          Whether you're managing appointments, walk-ins, or support queues, SmartLine helps
          create a seamless and organized experience for both admins and users.
        </p>
      </div>
    </motion.div>
  );
}

export default AboutPage;
