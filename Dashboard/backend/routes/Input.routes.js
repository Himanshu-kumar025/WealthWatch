import express from 'express';
import { getInputData, SavedinputData, deleteInputData } from '../controllers/Input.controller.js';

// Create a new router instance
const router = express.Router();

router.post("/dashboard", SavedinputData);  // ] POST to input data
router.get("/alldata", getInputData);  //  GET endpoint to fetch goals
router.post("/deleteData", deleteInputData)    //  DELETE the InputData
export default router;

