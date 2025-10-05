// src/router/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Features from "../pages/Features";
import About from "../pages/About";
import Contact from "../pages/Contact";
import DashboardLayout from "../layout/DashboardLayout";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import FacultyDashboard from "../pages/dashboard/FacultyDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/home" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Dashboard Pages */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="student" element={<StudentDashboard />} />
        <Route path="faculty" element={<FacultyDashboard />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}
