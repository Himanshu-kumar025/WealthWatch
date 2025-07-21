import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import formRouter from "./routes/form.routes.js";
import userRoutes from "./routes/user.routes.js";
import goalsRoutes from "./routes/goal.routes.js";
import InputRoutes from "../backend/routes/Input.routes.js";
import profilesRoutes from "./routes/profile.routes.js";
import genAIRoutes from "./routes/genAI.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Setup for ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
dotenv.config(); // Load environment variables

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., profile images) from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Enable CORS for frontend apps
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB connection setup
const dblink = process.env.DB_CONNECT;
const connectDB = async () => {
    try {
        await mongoose.connect(dblink);
        console.log("SuccessFully Mongoose Connected !");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

// Register all API routes
app.use('/', userRoutes);
app.use('/', formRouter);
app.use('/', goalsRoutes);
app.use('/', InputRoutes);
app.use('/', profilesRoutes);
app.use('/', genAIRoutes);

// Global error handler middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        message: "Something went wrong!",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Health check route
app.get("/", (req, res) => {
    res.send("Backend Server is properly working on 8080.");
});

// Start server and connect to database
app.listen(8080, () => {
    console.log("Server is successfully running on 8080 port.");
    connectDB();
});
