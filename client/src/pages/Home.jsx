// src/pages/Home.jsx
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-600 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Welcome to Smart PMS
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mb-8 text-gray-100">
          Smart Online Academic Project Management & Supervision System with AI Assistance and Real-Time Collaboration
        </p>
      </section>

      {/* About Project */}
      <section className="bg-white text-gray-800 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-blue-700">About Smart PMS</h2>
          <p className="text-lg mb-4">
            Smart PMS is a web-based platform designed to help students, faculty, and administrators manage academic projects efficiently. 
            It provides AI-assisted features, real-time collaboration, and centralized dashboards for seamless supervision.
          </p>
          <p className="text-lg">
            With Smart PMS, students can submit projects, track progress, and communicate with mentors easily. Faculty can monitor projects, give feedback, and manage multiple groups, while admins can oversee the entire academic workflow.
          </p>
        </div>
      </section>

      {/* Project Modules */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 text-blue-700">Modules of Smart PMS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-2xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Student Module</h3>
              <p>
                Submit projects, upload reports, view feedback, and collaborate with peers in real-time.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-2xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Faculty Module</h3>
              <p>
                Monitor student projects, provide feedback, track deadlines, and manage multiple project groups.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-2xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Admin Module</h3>
              <p>
                Oversee the entire system, manage users, track project progress, and generate reports for academic excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white text-gray-800 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 text-blue-700">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "AI Assistance", desc: "Get intelligent suggestions, project summaries, and progress reports powered by AI." },
              { title: "Real-Time Collaboration", desc: "Communicate and collaborate with your team, mentors, and supervisors instantly." },
              { title: "Centralized Dashboard", desc: "Track submissions, progress, and deadlines in one centralized platform." },
              { title: "Notifications", desc: "Receive instant updates and reminders for deadlines and project updates." },
              { title: "Document Management", desc: "Upload, share, and manage all project-related documents easily." },
              { title: "Reports & Analytics", desc: "Generate insightful reports and visualize project data effectively." },
            ].map((f, i) => (
              <div key={i} className="p-6 bg-blue-50 rounded-2xl shadow-md hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-3 text-blue-700">{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-gray-200 py-6 text-center">
        <p>© {new Date().getFullYear()} Smart PMS | Designed for Academic Excellence</p>
      </footer>
    </div>
  );
}
