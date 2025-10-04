import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import FacultyDashboard from "./pages/dashboard/FacultyDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import RoleRoute from "./router/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Protected Dashboards */}
        <Route
          path="/dashboard/admin"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/dashboard/faculty"
          element={
            <RoleRoute allowedRoles={["faculty"]}>
              <FacultyDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/dashboard/student"
          element={
            <RoleRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </RoleRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
