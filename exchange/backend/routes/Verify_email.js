// routes/emailVerification.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure the path is correct

// Email verification route
router.get('/verify-email', async (req, res) => {
    console.log('Received verification request');
    try {
        const { token } = req.query;
        console.log('Token:', token);
        if (!token) {
            return res.json({ success: false, message: 'No token provided.' });
        }

        const user = await User.findOne({
            emailToken: token,
            emailTokenExpires: { $gt: Date.now() },
        });

        if (!user) {
            console.log('User not found or token expired:', token);
            return res.json({ success: false, message: 'Invalid or expired token.' });
        }

        // Update the user
        user.isVerified = true;
        user.emailToken = undefined;
        user.emailTokenExpires = undefined;
        await user.save();

        res.json({ success: true, message: 'User verified successfully.' });
    } catch (error) {
        console.error('Verification Error:', error);
        res.json({ success: false, message: 'An error occurred during verification.' });
    }
});

module.exports = router;
