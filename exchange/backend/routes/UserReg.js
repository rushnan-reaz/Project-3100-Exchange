const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // For generating email verification tokens


dotenv.config();

const router = express.Router();

// Utility to generate a username
const generateUsername = (studentId, firstName) => `${studentId}_${firstName.toLowerCase()}`;

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send a verification email
const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  console.log('Verification URL:', verificationUrl);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email Address',
    text: `Hello,\n\nPlease verify your email by clicking the link below:\n\n${verificationUrl}\n\nBest regards,\nThe Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

// Registration route
router.post('/', async (req, res) => {
  console.log('Received registration data:', req.body); // Log incoming request body for debugging

  try {
    const { firstName, lastName, department, studentId, email, password } = req.body;

    // Check for missing fields
    if (!firstName || !lastName || !department || !studentId || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required.',
        receivedFields: Object.keys(req.body), // Log the fields that were actually received
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
        existingField: existingUser.email === email ? 'email' : 'studentId',
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate email verification token
    const emailToken = crypto.randomBytes(32).toString('hex');
    const emailTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // Token expires in 24 hours

    // Create new user
    const newUser = new User({
      firstname: firstName,
      lastname: lastName,
      department,
      studentId,
      email,
      password: hashedPassword,
      username: generateUsername(studentId, firstName),
      emailToken,
      emailTokenExpires,
    });

    // Save user
    const savedUser = await newUser.save();

    // Send verification email
    await sendVerificationEmail(email, emailToken);

    res.status(201).json({
      message: 'User registered successfully. Please verify your email to activate your account.',
      userId: savedUser._id,
      email: savedUser.email,
    });
  } catch (error) {
    console.error('Detailed Registration Error:', error);

    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: 'Validation Error',
        details: messages,
      });
    }

    // Handle general server errors
    res.status(500).json({
      message: 'Server error during registration',
      error: error.message,
    });
  }
});

module.exports = router;
