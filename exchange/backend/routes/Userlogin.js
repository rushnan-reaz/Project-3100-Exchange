const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateTokens, setRefreshTokenInCookie } = require('../helper/logauth.js');
const createError = require('http-errors');
const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Login Request:', req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(403).json({ 
        message: 'Please verify your email before logging in.',
        isVerified: false
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Set session data
    req.session.userId = user._id;
    req.session.username = user.username;
    
    // Save session explicitly
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          reject(err);
        }
        resolve();
      });
    });

    console.log('Session saved with userId:', req.session);

    // Generate tokens and set refresh token cookie
    const tokens = generateTokens(user._id);
    setRefreshTokenInCookie(res, tokens.refreshToken);

    // Set response headers for CORS
    res.set({
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    });

    // Send response
    res.json({
      message: 'Login successful.',
      userId: user._id,
      username: user.username,
      email: user.email,
      accessToken: tokens.accessToken
    });

    console.log('Login Successful');
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;