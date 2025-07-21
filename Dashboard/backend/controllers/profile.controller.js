import User from "../models/user.models.js";
import Form from "../models/form.models.js";
import InputData from "../models/inputData.models.js";

// Uploads and saves user's profile picture to the 'Form' model
export const uploadProfilePicture = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ message: "No file uploaded" });

        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ message: "No token provided" });

        const user = await User.findOne({ token });
        if (!user) return res.status(401).json({ message: "Unauthorized user" });

        const form = await Form.findOne({ userId: user._id });
        if (!form) return res.status(404).json({ message: "Form data not found" });

        // Save the uploaded filename to user's form profile
        form.profilePicture = req.file.filename;
        await form.save();

        return res.json({ message: "Profile Picture Updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Fetches both form data and user email for the logged-in user
export const getUserData = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ message: "No token provided" });

        const user = await User.findOne({ token });
        if (!user) return res.status(401).json({ message: "Unauthorized user" });

        // Fetch user's form data and email from User model
        const formData = await Form.findOne({ userId: user._id });
        const data = await User.findOne({ _id: user._id });
        const { email } = data;

        const userData = { email };

        if (!formData || !userData) {
            return res.status(404).json({ message: "No data found for this user" });
        }

        return res.status(200).json({ formData, userData });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Updates the user's profession and/or income and syncs the new income in InputData
export const updateProfileData = async (req, res) => {
    try {
        const { profession, income } = req.body;
        if (profession === undefined && income === undefined) {
            return res.status(400).json({ message: "No fields provided for update" });
        }

        const updateData = {};
        if (profession !== undefined) updateData.profession = profession;
        if (income !== undefined) updateData.income = income;

        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ message: "No token provided" });

        const user = await User.findOne({ token });
        if (!user) return res.status(401).json({ message: "Unauthorized user" });

        // Update profession and/or income in Form model
        const updatedProfile = await Form.findOneAndUpdate(
            { userId: user._id },
            { $set: updateData },
            { new: true }
        );
        if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });

        // If income is updated, also update current month's budget in InputData
        if (income !== undefined) {
            const inputData = await InputData.findOne({ userId: user._id });
            if (!inputData) {
                return res.status(404).json({ message: "Input data not found. Please fill in data first." });
            }

            const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();

            const monthEntryIndex = inputData.Monthly.findIndex(
                (m) => m.month.toLowerCase() === currentMonth
            );

            if (monthEntryIndex !== -1) {
                inputData.Monthly[monthEntryIndex].totalBudget = income;
            } else {
                inputData.Monthly.push({
                    month: currentMonth,
                    totalBudget: income,
                    expenses: []
                });
            }

            inputData.markModified('Monthly');
            await inputData.save();
        }

        return res.status(200).json(updatedProfile);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
