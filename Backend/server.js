// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// DB Connection
connectDB();

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", menuRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});