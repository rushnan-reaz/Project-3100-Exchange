const express = require('express');
const router = express.Router();
const { logout } = require('../helper/logauth.js');

router.post('/', (req, res) => {
  try {
    // Use the centralized clearCookies utility
    logout(req, res);

    // Send a response indicating successful logout
    res.status(200).json({
      message: 'Logout successful.',
    });

    console.log('User logged out successfully');
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({
      message: 'Server error during logout.',
    });
  }
});

module.exports = router;
