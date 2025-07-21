import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({

    // Reference to the associated user
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Profile picture filename (defaults to 'profile.png')
    profilePicture: {
        type: String,
        default: "profile.png"
    },

  
    name: {
        type: String,
        required: true
    },

    
    profession: {
        type: String,
        required: true
    },

    income: {
        type: Number,
        required: true
    },
});

// Create the Form model from the schema
const Form = mongoose.model("Form", FormSchema);

export default Form;
