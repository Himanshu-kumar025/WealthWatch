import InputData from '../models/inputData.models.js';
import User from '../models/user.models.js';
import Form from '../models/form.models.js';

// POST: Save expense input data (grouped by month & category)
export const SavedinputData = async (req, res) => {
  const { category, paymentMethod, date, name, price } = req.body;

  try {
    // Token validation
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const user = await User.findOne({ token });
    if (!user) return res.status(401).json({ error: 'Unauthorized user' });


    // Retrieve income from the associated form
    const form = await Form.findOne({ userId: user._id });
    if (!form) return res.status(404).json({ error: 'Form data not found' });

    const income = form.income;
    const currentDate = new Date(date); // Input date
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' }).toLowerCase(); // E.g. "july"
    const sixMonthsAgo = new Date(currentDate);
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    // Fetch existing input data for this user
    let inputData = await InputData.findOne({ userId: user._id });

    //  If user is adding data for the first time 
    if (!inputData) {
      inputData = new InputData({ userId: user._id, Monthly: [] });

      // Pre-fill last 5 months (empty) + current month (with data)
      const filledMonths = [];
      for (let i = 5; i >= 1; i--) {
        const prevDate = new Date(currentDate);
        prevDate.setMonth(currentDate.getMonth() - i);
        const prevMonth = prevDate.toLocaleString('default', { month: 'long' }).toLowerCase();

        filledMonths.push({
          month: prevMonth,
          totalBudget: income,
          expence: [],
          createdAt: prevDate
        });
      }

      // Add the current month with the provided expense data
      const currentMonthEntry = {
        month: currentMonth,
        totalBudget: income,
        expence: [{
          category,
          items: [{ name, price, date, paymentMethod }]
        }],
        createdAt: currentDate
      };

      inputData.Monthly = [...filledMonths, currentMonthEntry];

    } else {
      /* ----If inputData already exists---  */

      // Keep only the last 6 months
      inputData.Monthly = inputData.Monthly.filter(entry => {
        const entryDate = new Date(entry.createdAt);
        return entryDate >= sixMonthsAgo;
      });

      // Check if current month entry already exists
      let monthEntryIndex = inputData.Monthly.findIndex(
        m => m.month.toLowerCase() === currentMonth
      );

      if (monthEntryIndex === -1) {
        // If current month doesn't exist, add it
        const newMonthEntry = {
          month: currentMonth,
          totalBudget: income,
          expence: [{
            category,
            items: [{ name, price, date, paymentMethod }]
          }],
          createdAt: currentDate
        };

        inputData.Monthly.push(newMonthEntry);
      } else {
        // If current month exists, update it
        const monthEntry = inputData.Monthly[monthEntryIndex];
        let categoryEntry = monthEntry.expence.find(e => e.category === category);

        if (!categoryEntry) {
          // If category doesn't exist, add it
          monthEntry.expence.push({
            category,
            items: [{ name, price, date, paymentMethod }]
          });
        } else {
          // If category exists, append to items
          categoryEntry.items.push({ name, price, date, paymentMethod });
        }

        // Move updated month to the end (to maintain recent order)
        const updatedMonth = inputData.Monthly.splice(monthEntryIndex, 1)[0];
        inputData.Monthly.push(updatedMonth);
      }

      // Sort months by date and keep only latest 6
      inputData.Monthly.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      inputData.Monthly = inputData.Monthly.slice(-6);
    }

    // Inform Mongoose that Monthly array has been modified
    inputData.markModified('Monthly');
    await inputData.save();

    return res.status(200).json({ message: 'Data saved successfully' });

  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

// GET: Fetch all input data for authenticated user
export const getInputData = async (req, res) => {
  try {

    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }

    const data = await InputData.find({ userId: user._id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE: Remove a specific item from a category in the current user's input data
export const deleteInputData = async (req, res) => {
  const { category, name, month } = req.body;  // add month in frontend too

  try {
    if (!category || !name || !month) {
      return res.status(400).json({ error: 'Category, name, and month are required.' });
    }

    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }

    // Step 1: Find the user's InputData
    const userData = await InputData.findOne({ userId: user._id });
    if (!userData) {
      return res.status(404).json({ error: 'User data not found' });
    }

    // Step 2: Find the Monthly record
    const monthlyData = userData.Monthly.find(m => m.month.toLowerCase() === month.toLowerCase());
    if (!monthlyData) {
      return res.status(404).json({ error: 'Month data not found' });
    }

    // Step 3: Find the expense category
    const categoryData = monthlyData.expence.find(e => e.category.toLowerCase() === category.toLowerCase());
    if (!categoryData) {
      return res.status(404).json({ error: 'Category not found in month data' });
    }

    // Step 4: Remove the item
    const originalLength = categoryData.items.length;
    categoryData.items = categoryData.items.filter(item => item.name !== name);

    if (categoryData.items.length === originalLength) {
      return res.status(404).json({ error: 'Item not found in category' });
    }

    // Step 5: Save updated user data
    await userData.save();

    return res.status(200).json({ message: 'Item deleted successfully' });

  } catch (error) {
    console.error('Error deleting item:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};