const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const e = require('express');

dotenv.config();

const router = express.Router();

// Controller for user login
router.post('/', async (req, res) => {

  // clearance
  console.log('login is working');
  console.log('Login Request:', req.body);

  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    // Find a user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }
    else {
    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token,
      message: 'Login Successful',
      userId: user._id,
      email: user.email
    });
      console.log('Login Successful');
    }


  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

module.exports = router;