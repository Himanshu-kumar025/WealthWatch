import express from "express";
import { goals, getGoals } from "../controllers/goals.controller.js";

// Create a new router instance
const router = express.Router();

router.get("/getGoals", getGoals);   //  GET endpoint to fetch goals
router.post("/goals", goals);     //  POST to save/update goals

export default router;