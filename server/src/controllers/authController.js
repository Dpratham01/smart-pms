import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// ==========================
// Role-based Registration
// ==========================
export const registerUser = async (req, res, next) => {
  try {
    const { role, name, email, password, rollNo, facultyId, department, adminCode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with role-specific fields
    const user = await User.create({
      role,
      name,
      email,
      password: hashedPassword,
      rollNo: role === "student" ? rollNo : undefined,
      facultyId: role === "faculty" ? facultyId : undefined,
      department: role === "faculty" ? department : undefined,
      adminCode: role === "admin" ? adminCode : undefined,
    });

    // Send success response with JWT token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      message: "Registration successful!",
    });
  } catch (err) {
    next(err);
  }
};

// ==========================
// Role-based Login
// ==========================
export const loginUser = async (req, res, next) => {
  try {
    const { email, password, role, rollNo, facultyId, adminCode } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Check role
    if (user.role !== role) return res.status(401).json({ message: "Invalid role" });

    // Validate only the relevant role-specific field
    if (
      (role === "student" && (!rollNo || user.rollNo?.trim() !== rollNo.trim())) ||
      (role === "faculty" && (!facultyId || user.facultyId?.trim() !== facultyId.trim())) ||
      (role === "admin" && (!adminCode || user.adminCode?.trim() !== adminCode.trim()))
    ) {
      return res.status(401).json({ message: "Invalid role credentials" });
    }

    // Send success response
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      message: "Login successful!",
    });
  } catch (err) {
    next(err);
  }
};
