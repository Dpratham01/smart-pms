// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";

export default function Login({ onSuccess }) {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rollNo: "",
    facultyId: "",
    adminCode: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) return alert("Please select a role");

    // Prepare login data
    let loginData = {
      email: formData.email.trim(),
      password: formData.password,
      role: selectedRole,
    };

    // Add only the relevant role-specific field
    if (selectedRole === "student") loginData.rollNo = formData.rollNo.trim();
    if (selectedRole === "faculty") loginData.facultyId = formData.facultyId.trim();
    if (selectedRole === "admin") loginData.adminCode = formData.adminCode.trim();

    try {
      const result = await dispatch(loginUser(loginData)).unwrap();

      alert("✅ Login successful!");

      // Open role-based dashboard in new tab
      if (result.role === "student") window.open("/dashboard/student", "_blank");
      else if (result.role === "faculty") window.open("/dashboard/faculty", "_blank");
      else if (result.role === "admin") window.open("/dashboard/admin", "_blank");

      // Optional: close modal
      onSuccess?.();
    } catch (err) {
      alert(err?.message || "❌ Login failed");
    }
  };

  // Role selection screen
  if (!selectedRole) {
    return (
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">Login as</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { role: "student", label: "Student" },
            { role: "faculty", label: "Faculty" },
            { role: "admin", label: "Admin" },
          ].map((r) => (
            <button
              key={r.role}
              onClick={() => setSelectedRole(r.role)}
              className="p-4 bg-blue-100 hover:bg-blue-200 rounded shadow font-semibold transition"
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Login form
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-center text-blue-700">
        {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login
      </h2>

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full border px-3 py-2 rounded-md"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full border px-3 py-2 rounded-md"
      />

      {/* Role-specific fields */}
      {selectedRole === "student" && (
        <input
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
          placeholder="Roll Number"
          required
          className="w-full border px-3 py-2 rounded-md"
        />
      )}
      {selectedRole === "faculty" && (
        <input
          name="facultyId"
          value={formData.facultyId}
          onChange={handleChange}
          placeholder="Faculty ID"
          required
          className="w-full border px-3 py-2 rounded-md"
        />
      )}
      {selectedRole === "admin" && (
        <input
          name="adminCode"
          value={formData.adminCode}
          onChange={handleChange}
          placeholder="Admin Code"
          required
          className="w-full border px-3 py-2 rounded-md"
        />
      )}

      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
      >
        Login
      </button>

      <p
        className="text-center text-gray-500 mt-2 cursor-pointer hover:underline"
        onClick={() => setSelectedRole("")}
      >
        ← Back to Role Selection
      </p>
    </form>
  );
}
