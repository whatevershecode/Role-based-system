// In your adminController.js
const userModel = require('../models/userModel');
const ratingModel = require('../models/rating');

// Get KPI data
exports.getKPI = async (req, res) => {
  try {
    const data = await ratingModel.getKPI(); // Call the newly added getKPI function
    res.json(data); // Send the KPI data as the response
  } catch (error) {
    console.error('Error fetching KPI:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers(); // Fetch users from userModel
    res.json(users.rows); // Assuming you want to return the rows
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
