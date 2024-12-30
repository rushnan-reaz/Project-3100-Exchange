const express = require('express');
const router = express.Router();

// Import route handlers
const QuestionRouter = require('./Question');
const AnswerRouter = require('./Answer');
const CommentRouter = require('./Comment');
const RegisterRouter = require('./UserReg');
const LoginRouter = require('./Userlogin');
const VerifyEmailRouter = require('./Verify_email');
const LogoutRouter = require('./Userlogout');
const UserdataRouter = require('./userdata');

// Import middleware
const authenticate = require('../middleware/authenticate');
const getUserData = require('../helper/Fetchuser');

// Base routes
router.get('/', (req, res) => {
    res.send('Welcome to the backend API');
});

// API routes
router.use('/question', QuestionRouter);
router.use('/answer', AnswerRouter);
router.use('/comment', CommentRouter);
router.use('/register', RegisterRouter);
router.use('/login', LoginRouter);
router.use('/verify-email', VerifyEmailRouter);
router.use('/logout', LogoutRouter);
router.use('/userdata', UserdataRouter);

// Protected routes
router.get('/user', authenticate, getUserData);
router.get('/session', authenticate, (req, res) => {
    res.json({
        message: 'User is logged in',
        userId: req.userId
    });
});

// 404 handler
router.use('*', (req, res) => {
    res.status(404).send('API route not found');
});

module.exports = router;