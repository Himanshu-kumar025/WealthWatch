import express from "express";
import { signup, login } from "../controllers/user.controller.js";

// Create a new router instance
const router = express.Router();

router.route('/signup').post(signup);  //  POST to save/update Signup
router.route('/login').post(login);   //  POST to save/update Login

export default router;



