const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


exports.register = async (req, res) => {
  const { username, email, password, role, address } = req.body;

  // Check if username or email already exists
  const existingUser = await userModel.getUserByUsernameOrEmail(username, email);
  if (existingUser.rows.length > 0) {
    return res.status(400).json({ error: 'Username or email already in use' });
  }

  const hashed = await bcrypt.hash(password, 10);
  await userModel.createUser(username, email, hashed, address, role);
  res.sendStatus(201);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.getUserByUsername(email);
  if (!user.rows.length) return res.status(401).json({ message: 'Invalid credentials' });

  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

  const { id, role, address, username } = user.rows[0];

  // Include address or username in token if needed
  const token = jwt.sign({ id, role, address, username }, 'secret');

  res.json({
    token,
    user: {
      id,
      email,
      role,
      address,
      username,
    }
  });
};
