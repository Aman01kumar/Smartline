// client/src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <h1 className="text-2xl font-bold tracking-wide">SmartLine</h1>

        {/* Hamburger icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nav links */}
        <nav
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center w-full md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-8 text-lg transition-all`}
        >
          <Link to="/" className="hover:text-gray-200 block">Home</Link>
          <Link to="/about" className="hover:text-gray-200 block">About Us</Link>
          <Link to="/contact" className="hover:text-gray-200 block">Contact Us</Link>
          <Link to="/login" className="hover:text-gray-200 block">Login</Link>
          <Link to="/register" className="hover:text-gray-200 block">Register</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
