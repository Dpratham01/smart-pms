import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home";
import Features from "../pages/Features";
import About from "../pages/About";
import Contact from "../pages/Contact";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import FacultyDashboard from "../pages/dashboard/FacultyDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard/student" element={<StudentDashboard />} />
          <Route path="dashboard/faculty" element={<FacultyDashboard />} />
          <Route path="dashboard/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
