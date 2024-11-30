const express = require('express');
const router = express.Router();
const QuestionRouter = require('./Question');
const AnswerRouter = require('./Answer');
const CommentRouter = require('./Comment');
const RegisterRouter = require('./UserReg'); 
const UserLoginRouter = require('./Userlogin');

router.get('/', (req, res) => {
    res.send('Welcome to the backend');
});


router.use('/question', QuestionRouter);
router.use('/answer', AnswerRouter);
router.use('/comment', CommentRouter);
router.use('/register', RegisterRouter); 
router.use('/login', UserLoginRouter);

module.exports = router;
