import express from "express";
import { askGeminiAI } from "../controllers/genAI.controller.js";

// Create a new router instance
const router = express.Router();

// Route to handle Ask oo Prompt for AI(POST request)
router.post("/ask/ai", askGeminiAI);

export default router;
