import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! We have received your message.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">Smart PMS</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:underline">Landing</Link>
          <Link to="/home" className="hover:underline">Home</Link>
          <Link to="/features" className="hover:underline">Features</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="underline font-semibold">Contact</Link>
        </div>
      </nav>

      {/* Contact Hero */}
      <header className="bg-white py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Get in Touch</h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Have questions or need support? Fill out the form below or reach us via email, and we’ll respond as soon as possible.
        </p>
      </header>

      {/* Contact Form Section */}
      <section className="flex flex-col md:flex-row justify-center items-start max-w-6xl mx-auto px-6 py-12 gap-12">
        {/* Form */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-700 mb-6">Contact Form</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full border px-3 py-2 rounded-md h-32"
            />
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex-1 bg-blue-50 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-700 mb-6">Contact Information</h3>
          <p className="text-gray-700 mb-4">
            <strong>Email:</strong> support@smartacademicpms.ac.in
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Phone:</strong> +91 9876543210
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Address:</strong> Department of Computer Engineering, Your College, India
          </p>
          <p className="text-gray-700 mt-6">
            We’re here to assist students, faculty, and administrators with any queries regarding Smart PMS.
          </p>
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
