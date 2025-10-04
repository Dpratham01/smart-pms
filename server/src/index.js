import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import http from "http";
import { initSocket } from "./sockets/chatSocket.js";
import path from "path";

dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 10 * 60 * 1000, max: 100 }));

// API Routes
app.use("/api/auth", authRoutes);
app.use(errorHandler);

// Serve frontend build
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

// Socket.IO setup
const server = http.createServer(app);
initSocket(server); // Pass the HTTP server to initSocket

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
