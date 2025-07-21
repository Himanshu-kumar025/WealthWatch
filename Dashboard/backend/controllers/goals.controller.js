import Goals from '../models/goals.models.js';
import User from '../models/user.models.js';

// GET goals for a user
export const getGoals = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token provided" });// if token is missing 

    const user = await User.findOne({ token });
    if (!user) return res.status(401).json({ message: "Unauthorized user" });// Token does not match any user in the database

    const goalsData = await Goals.findOne({ userId: user._id });

    // No Goals Found From Database for this user
    if (!goalsData) {
      return res.status(404).json({ message: "No goals found for this user" });
    }

    return res.status(200).json(goalsData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// POST or UPDATE a goal
export const goals = async (req, res) => {
  try {
    const { name, value } = req.body;

    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const user = await User.findOne({ token }); 
    if (!user) return res.status(401).json({ message: "Unauthorized user" });

    const update = { $set: { [name]: value } };

    // Update Goals From Database
    const updatedGoal = await Goals.findOneAndUpdate(
      { userId: user._id },
      update,
      { new: true }
    );

    //If it's not exist then Create new Goals
    if (!updatedGoal) {
      const createdGoal = await Goals.create({ userId: user._id, [name]: value });
      return res.status(201).json(createdGoal);
    }
    return res.status(200).json(updatedGoal);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



