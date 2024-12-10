const session = require('express-session');
const crypto = require('crypto');
const MongoStore = require('connect-mongo');

const generateSessionSecret = () => {
  if (process.env.SESSION_SECRET) {
    return process.env.SESSION_SECRET;
  } else {
    return crypto.randomBytes(64).toString('hex');
  }
};

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60, // 1 day
  }),
  cookie: {
    httpOnly: true,
    sameSite: 'lax', // Change from 'None' to 'lax'
    secure: false, // Set to false for development
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
  name: 'sessionId', // cookie name
});

const logSession = (req, res, next) => {
  console.log('Session:', req.session); // Log the entire session object
  if (req.session.userId) {
    console.log(`Session updated with userId: ${req.session.userId}`);
  } else {
    console.log('New session created');
  }
  next();
};

module.exports = { sessionMiddleware, logSession };