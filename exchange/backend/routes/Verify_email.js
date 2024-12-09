const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

// Email verification route
router.get('/', async (req, res) => {
    console.log('Received verification request');
    try {
        const { token } = req.query;
        console.log('Token received:', token);

        if (!token) {
            console.log('No token provided');
            return res.status(400).json({ success: false, message: 'No token provided.' });
        }

        // Find the user associated with the token and check if it's still valid
        const user = await User.findOne({
            emailToken: token,
            emailTokenExpires: { $gt: Date.now() },
        });

        if (!user) {
            console.log('User not found or token expired:', token);
            return res.status(400).json({ success: false, message: 'Invalid or expired token.' });
        }

        // Update the user status
        user.isVerified = true;
        user.emailToken = undefined;
        user.emailTokenExpires = undefined;
        await user.save();

        console.log('User verified successfully:', user.email);
        res.status(200).json({ success: true, message: 'User verified successfully.' });
    } catch (error) {
        console.error('Verification Error:', error);
        res.status(500).json({ success: false, message: 'An error occurred during verification.' });
    }
});

module.exports = router;
