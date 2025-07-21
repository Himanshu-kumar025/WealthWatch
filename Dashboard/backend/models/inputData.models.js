import mongoose from "mongoose";

// Schema for individual expense items
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  }
});

// Schema for a category containing multiple items
const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true  // (Corrected typo: was 'tru')
  },
  items: {
    type: [itemSchema],
    default: []
  }
});

// Schema for monthly data, including total budget and categorized expenses
const monthlySchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  totalBudget: {
    type: Number,
    required: true
  },
  expence: {  // (Consider renaming to 'expenses' for clarity)
    type: [categorySchema],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Main schema for storing a user's monthly input data
const InputDataSchema = new mongoose.Schema({
  userId: {
    type: String,  // (Consider using ObjectId and referencing User model)
    required: true
  },
  Monthly: {
    type: [monthlySchema],
    default: []
  }
});

// Create and export the model
const InputData = mongoose.model('InputData', InputDataSchema);
export default InputData;
