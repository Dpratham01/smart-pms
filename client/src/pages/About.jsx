import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">Smart PMS</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:underline">Landing</Link>
          <Link to="/home" className="hover:underline">Home</Link>
          <Link to="/features" className="hover:underline">Features</Link>
          <Link to="/about" className="underline font-semibold">About</Link>
        </div>
      </nav>

      {/* Hero / About Section */}
      <header className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            About Smart Academic PMS
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-10">
            Smart Academic Project Management & Supervision System (Smart PMS) is a modern web platform designed to streamline academic project workflows for students, faculty, and administrators. Our goal is to improve project tracking, collaboration, and evaluation efficiency using AI-powered insights.
          </p>

          <img
            src="https://undraw.co/api/illustrations/teamwork"
            alt="Teamwork Illustration"
            className="mx-auto w-72 md:w-96 mb-10"
          />
        </div>
      </header>

      {/* Detailed Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-blue-700 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                To provide a centralized, digital solution for academic project management that ensures transparency, reduces manual workload, and enhances communication between students, faculty, and administrators.
              </p>

              <h3 className="text-3xl font-bold text-blue-700 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                To become the leading academic project management system that leverages modern technology, AI, and collaboration tools to improve learning outcomes and institutional efficiency.
              </p>

              <h3 className="text-3xl font-bold text-blue-700 mb-4">Core Features</h3>
              <ul className="text-gray-700 list-disc list-inside space-y-2">
                <li>AI-assisted project suggestions and evaluations</li>
                <li>Role-based access for students, faculty, and admins</li>
                <li>Real-time chat and collaboration tools</li>
                <li>Analytics dashboards and reporting</li>
                <li>Secure project submission and document management</li>
              </ul>
            </div>

            <div>
              <img
                src="https://undraw.co/api/illustrations/analytics"
                alt="Analytics Illustration"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-gray-200 py-10 text-center mt-auto">
        <h4 className="text-2xl font-bold mb-2">Smart PMS</h4>
        <p>Empowering institutions with AI-driven project supervision & management.</p>
        <p className="text-sm mt-3">© {new Date().getFullYear()} Smart PMS | All Rights Reserved</p>
      </footer>
    </div>
  );
}
