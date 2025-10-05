// src/pages/Landing.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";

export default function Landing() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-600 text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold">Smart PMS</h1>
        <div className="space-x-6 hidden md:flex">
          <Link to="/home" className="hover:text-gray-200 transition">
            Home
          </Link>
          <Link to="/features" className="hover:text-gray-200 transition">
            Features
          </Link>
          <Link to="/about" className="hover:text-gray-200 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-200 transition">
            Contact
          </Link>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => setShowRegister(true)}
            className="bg-white text-blue-700 px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-100 transition"
          >
            Register
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-white text-blue-700 px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-100 transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Manage Academic Projects <br /> Smarter and Faster
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-100">
          An AI-assisted, real-time collaboration platform for students, faculty,
          and administrators — designed to streamline project supervision and management.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/home"
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition"
          >
            Get Started
          </Link>
          <Link
            to="/features"
            className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-gray-200 py-6 text-center">
        <p>© {new Date().getFullYear()} Smart PMS | Designed for Academic Excellence</p>
      </footer>

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white text-gray-800 rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <Register onSuccess={() => setShowRegister(false)} />
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white text-gray-800 rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <Login onSuccess={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
