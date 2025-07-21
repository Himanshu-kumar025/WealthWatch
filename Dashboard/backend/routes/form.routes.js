import express from "express";
import { forms } from "../controllers/form.controller.js";

// Create a new router instance
const router = express.Router();

// Route to handle form submission (POST request)
router.post('/form', forms); 

// Export the router to be used in the main app
export default router;
