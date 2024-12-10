const User = require('../models/User');

const getUserData = async (req, res) => {
  try {
    console.log('Session:', req.session); // Log the entire session object
    const userId = req.session.userId;

    if (!userId) {
      console.log('User ID is missing in session');
      return res.status(400).json({ error: 'User ID is missing in session' });
    }

    console.log('Fetching user with ID:', userId);
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found for ID:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found:', user);
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = getUserData;