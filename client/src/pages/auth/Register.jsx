import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";

export default function Register({ onSuccess }) {
  const dispatch = useDispatch();

  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rollNo: "",
    facultyId: "",
    department: "",
    adminCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) return alert("Please select a role");

    try {
      const result = await dispatch(registerUser({ role: selectedRole, ...formData })).unwrap();
      alert(result.message || "✅ Registration successful!");
      onSuccess?.(); // optional: close modal
    } catch (err) {
      alert(err || "❌ Registration failed");
    }
  };

  // Role selection screen
  if (!selectedRole) {
    return (
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">Register as</h2>
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

  // Registration form
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-center text-blue-700">
        {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Registration
      </h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
        className="w-full border px-3 py-2 rounded-md"
      />
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
        <>
          <input
            name="facultyId"
            value={formData.facultyId}
            onChange={handleChange}
            placeholder="Faculty ID"
            required
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </>
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
        Register
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
