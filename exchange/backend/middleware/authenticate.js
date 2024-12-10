const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const authenticate = async (req, res, next) => {
  try {
    // Debug logging
    console.log('Request Headers:', req.headers);
    console.log('Cookies:', req.cookies);
    console.log('Session:', req.session);

    // Check if session exists
    if (!req.session) {
      console.log('No session found');
      return res.status(401).json({ error: 'No session found' });
    }

    // Check if user is authenticated in session
    if (!req.session.userId) {
      console.log('No userId found in session');
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Set userId in request object for downstream middleware
    req.userId = req.session.userId;
    console.log('Authenticated User ID:', req.userId);

    // Save session to ensure it persists
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          reject(err);
        }
        console.log('Session saved successfully');
        resolve();
      });
    });

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Internal server error during authentication' });
  }
};

module.exports = authenticate;