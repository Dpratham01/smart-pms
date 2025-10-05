import React from "react";
import { Link } from "react-router-dom";

export default function LearnMore() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Navbar */}
      <header className="fixed w-full bg-white/90 backdrop-blur-md shadow-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold text-blue-700">Smart Academic PMS</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/features" className="text-gray-700 hover:text-blue-600">Features</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="pt-32 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-blue-700 mb-6">About Smart Academic PMS</h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          The Smart Online Academic Project Management & Supervision System is designed to streamline
          the academic project workflow in colleges. From project proposal to faculty approvals, AI-assisted
          guidance, and final evaluation, the system ensures efficiency, transparency, and better project outcomes.
        </p>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Key Features</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>📁 Digital Project Tracking – Manage projects, milestones, and submissions online.</li>
            <li>🧾 Paperless Submission – Upload documents and track versions efficiently.</li>
            <li>👩‍🏫 Faculty Supervision – Review, approve, and provide AI-assisted feedback.</li>
            <li>🤖 AI Assistance – Generate project ideas, track progress, and analyze submissions.</li>
            <li>💬 Collaboration – Real-time chat and document sharing between students and faculty.</li>
            <li>📊 Performance Analytics – AI-powered insights for students and faculty.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Workflow Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-white border rounded-lg shadow">
              <div className="text-blue-700 font-bold text-lg">1️⃣ Register / Login</div>
              <p className="text-gray-700 mt-2">Students, faculty, and admin can sign in securely.</p>
            </div>
            <div className="p-4 bg-white border rounded-lg shadow">
              <div className="text-blue-700 font-bold text-lg">2️⃣ Create Project</div>
              <p className="text-gray-700 mt-2">Students can propose topics with required details.</p>
            </div>
            <div className="p-4 bg-white border rounded-lg shadow">
              <div className="text-blue-700 font-bold text-lg">3️⃣ Faculty Approval</div>
              <p className="text-gray-700 mt-2">Faculty can approve or suggest modifications.</p>
            </div>
            <div className="p-4 bg-white border rounded-lg shadow">
              <div className="text-blue-700 font-bold text-lg">4️⃣ AI Guidance</div>
              <p className="text-gray-700 mt-2">AI provides suggestions and quality analysis.</p>
            </div>
            <div className="p-4 bg-white border rounded-lg shadow">
              <div className="text-blue-700 font-bold text-lg">5️⃣ Evaluation</div>
              <p className="text-gray-700 mt-2">Projects are graded, feedback is provided, and reports are generated.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Benefits</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Enhanced transparency in project progress tracking.</li>
            <li>Time-saving for both students and faculty.</li>
            <li>Better project quality through AI suggestions.</li>
            <li>Seamless collaboration between students and faculty.</li>
            <li>Centralized system for all academic project workflows.</li>
          </ul>
        </section>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800"
        >
          ← Back to Landing
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 text-center mt-10">
        <p>
          © 2025 Smart Academic PMS | Developed by <span className="text-blue-400 font-semibold">Pratham Dhakate & Team</span>
        </p>
      </footer>
    </div>
  );
}
