import mongoose from "mongoose";
import { Schema } from "mongoose";

const GoalsSchema = new mongoose.Schema({
        // Reference to the associated user
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    Food: {
        type: Number,
    },
    Housing: {
        type: Number
    },
    Personal: {
        type: Number
    },
    Saving: {
        type: Number
    },
    Transportation: {
        type: Number
    }
});

// Create the Goals model from the schema
const Goals = mongoose.model("Goals", GoalsSchema);

export default Goals;