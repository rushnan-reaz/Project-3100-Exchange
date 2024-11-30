const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Controller for user registration
router.post('/', async (req, res) => {
  // console.log('Full Registration Request:', req.body);

  try {
    const { firstname, lastname, department, studentId, email, password } = req.body;

    // Check for missing fields
    if (!firstname || !lastname || !department || !studentId || !email || !password) {
      return res.status(400).json({ 
        message: 'All fields are required',
        receivedFields: Object.keys(req.body)
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ 
      $or: [{ email }, { studentId }] 
    });

    if (existingUser) {
      // console.log('Existing User Details:', existingUser);
      return res.status(400).json({ 
        message: 'User already exists',
        existingField: existingUser.email === email ? 'email' : 'studentId'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password Length:', hashedPassword.length);

    // Create new user
    const newUser = new User({
      firstname,
      lastname,
      department,
      studentId,
      email,
      password: hashedPassword
    });

    // Save user
    const savedUser = await newUser.save();
    console.log('Saved User:', savedUser);

    res.status(201).json({ 
      message: 'User registered successfully',
      userId: savedUser._id,
      email: savedUser.email
    });

  } catch (error) {
    console.error('Detailed Registration Error:', error);

    //mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation Error',
        details: messages 
      });
    }

    //server errors
    res.status(500).json({ 
      message: 'Server error during registration',
      error: error.message 
    });
  }
});

module.exports = router;
