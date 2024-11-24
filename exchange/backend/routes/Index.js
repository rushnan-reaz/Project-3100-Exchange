const express = require('express');
const router = express.Router();
const QuestionRouter = require('./Question');
// const answerRouter = require('./');
// const commentRouter = require('./');

router.get('/', (req, res) => {
    res.send('Welcome to the backend');
});

// router.get('/question', (req, res) => {
//     res.json({ message: 'This is the question route' });
// });

router.use('/question', QuestionRouter);
// router.use('/answer', answerRouter);
// router.use('/comment', commentRouter);

module.exports = router;