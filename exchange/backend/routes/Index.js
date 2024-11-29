const express = require('express');
const router = express.Router();
const QuestionRouter = require('./Question');
const AnswerRouter = require('./Answer');
const commentRouter = require('./Comment');

router.get('/', (req, res) => {
    res.send('Welcome to the backend');
});

router.use('/question', QuestionRouter);
router.use('/answer', AnswerRouter);
router.use('/comment', commentRouter);

module.exports = router;