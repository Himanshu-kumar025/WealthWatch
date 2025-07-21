import Form from "../models/form.models.js";
import User from "../models/user.models.js";

export const forms = async (req, res) => {
    const { name, profession, income, email } = req.body;

    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ error: 'No token provided' });

        const user = await User.findOne({ email });
        // If user is not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!name || !profession || !income) {
            return res.status(400).json({ message: "Please fill all fields." });
        }

        // If user exists, update the form
        const newForm = new Form({
            userId: user._id,
            name,
            profession,
            income
        });
        await newForm.save();

        return res.status(201).json({
            message: "Form filled successfully"
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
