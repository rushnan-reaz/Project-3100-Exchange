const express = require('express');
const router = express.Router();
const QuestionRouter = require('./Question');
const AnswerRouter = require('./Answer');
const CommentRouter = require('./Comment');
const RegisterRouter = require('./UserReg'); 
const LoginRouter = require('./Userlogin');
const VerifyEmailRouter = require('./Verify_email');

// Home route or base API route
router.get('/', (req, res) => {
    res.send('Welcome to the backend API');
});

// Define other routes
router.use('/question', QuestionRouter);
router.use('/answer', AnswerRouter);
router.use('/comment', CommentRouter);
router.use('/register', RegisterRouter); 
router.use('/login', LoginRouter);
router.use('/verify-email', VerifyEmailRouter);

router.use('*', (req, res) => {
    res.status(404).send('API route not found');
});

module.exports = router;
