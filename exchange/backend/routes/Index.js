const express = require('express');
const router = express.Router();

// Importing individual route handlers
const QuestionRouter = require('./Question');
const AnswerRouter = require('./Answer');
const CommentRouter = require('./Comment');
const RegisterRouter = require('./UserReg');
const LoginRouter = require('./Userlogin');
const VerifyEmailRouter = require('./Verify_email');
const LogoutRoute = require('./Userlogout');

// Middleware imports
const authenticate = require('../middleware/authenticate'); // Authentication middleware
const getUserData = require('../helper/Fetchuser');

// Home route or base API route
router.get('/', (req, res) => {
    res.send('Welcome to the backend API');
});

// ** Public Routes (No authentication needed) **
router.use('/question', QuestionRouter);  // Route for handling questions
router.use('/answer', AnswerRouter);      // Route for handling answers
router.use('/comment', CommentRouter);    // Route for handling comments
router.use('/register', RegisterRouter);  // Route for user registration
router.use('/login', LoginRouter);        // Route for user login
router.use('/verify-email', VerifyEmailRouter); // Email verification route
router.use('/logout', LogoutRoute);       // Logout route

// ** Protected Routes (Authentication required) **
// User-related route with authentication
router.get('/user', authenticate, getUserData);

// Session route to check if user is logged in
router.get('/session', authenticate, (req, res) => {
    // Session data
    res.json({
        message: 'User is logged in',
        userId: req.userId, // Send the authenticated user's ID
    });
});

// Catch-all route for undefined routes
router.use('*', (req, res) => {
    res.status(404).send('API route not found');
});

module.exports = router;
