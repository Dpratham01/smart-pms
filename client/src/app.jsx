// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <h1 className="text-center mt-20 text-3xl">Home Page</h1>
          }
        />
        <Route
          path="/features"
          element={
            <h1 className="text-center mt-20 text-3xl">Features Page</h1>
          }
        />
        <Route
          path="/about"
          element={
            <h1 className="text-center mt-20 text-3xl">About Page</h1>
          }
        />
        <Route
          path="/contact"
          element={
            <h1 className="text-center mt-20 text-3xl">Contact Page</h1>
          }
        />
      </Routes>
    </Router>
  );
}
