// src/pages/Features.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Features() {
  const features = [
    {
      title: "🎓 Student Dashboard",
      description:
        "Students can register projects, submit deliverables, track progress, and collaborate with their team and guides seamlessly.",
    },
    {
      title: "👨‍🏫 Faculty Dashboard",
      description:
        "Faculty members can view assigned projects, provide feedback, evaluate submissions, and track students' performance in real-time.",
    },
    {
      title: "🧠 AI Project Assistant",
      description:
        "Built-in AI helps generate project ideas, summarize reports, check originality, and recommend improvements automatically.",
    },
    {
      title: "💬 Real-Time Chat & Collaboration",
      description:
        "Integrated real-time chat lets teams and faculty communicate instantly for faster project reviews and discussions.",
    },
    {
      title: "📁 Secure File Uploads",
      description:
        "All project-related files and reports can be uploaded securely to the system and shared between members and guides.",
    },
    {
      title: "📊 Analytics & Reports",
      description:
        "View insights like project progress, deadlines, evaluation scores, and performance statistics in graphical dashboards.",
    },
    {
      title: "🔔 Smart Notifications",
      description:
        "Get notified instantly about deadlines, feedback, and important announcements with a robust notification system.",
    },
    {
      title: "🧾 Role-Based Access Control",
      description:
        "Each role — Student, Faculty, and Admin — has its own secure and customized access based on permissions.",
    },
    {
      title: "📢 Announcement Board",
      description:
        "Admins and faculty can broadcast important announcements and updates to students directly through the system.",
    },
    {
      title: "🛡️ Security & Authentication",
      description:
        "Secure login, JWT-based authentication, and encrypted file storage ensure that all data stays protected.",
    },
  ];

  const modules = [
    {
      name: "Student Module",
      description:
        "Allows students to submit projects, track progress, view feedback, and collaborate with team members and faculty.",
    },
    {
      name: "Faculty Module",
      description:
        "Enables faculty to monitor assigned projects, evaluate submissions, give feedback, and track student performance.",
    },
    {
      name: "Admin Module",
      description:
        "Allows admins to manage users, oversee all projects, generate reports, and maintain system security and permissions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">Smart PMS</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:underline">Landing</Link>
          <Link to="/home" className="hover:underline">Home</Link>
          <Link to="/features" className="underline font-semibold">Features</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-100 text-center py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Explore Smart PMS Features & Modules
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg">
          Smart PMS is an all-in-one solution to manage academic projects efficiently, offering AI tools, dashboards, real-time collaboration, and secure workflows.
        </p>
      </header>

      {/* Project Modules */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold text-blue-700 mb-6">Project Modules</h3>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Smart PMS is divided into several modules to cater to different users: Students, Faculty, and Admins. Each module is equipped with features to make project management seamless.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {modules.map((module, index) => (
            <div
              key={index}
              className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition transform duration-300"
            >
              <h4 className="text-2xl font-semibold text-blue-800 mb-2">{module.name}</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{module.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold text-blue-700 mb-6">All Features at a Glance</h3>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Here’s what makes Smart PMS unique and highly effective for academic project management.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition transform duration-300"
            >
              <h4 className="text-xl font-semibold text-blue-800 mb-2">{feature.title}</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
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
