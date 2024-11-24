const express = require('express');
const router = express.Router();
const questionRouter = require('./Question');
// const answerRouter = require('./');
// const commentRouter = require('./');

router.get('/', (req, res) => {
    res.send('Welcome to the backend');
});

router.use('/question', questionRouter);
// router.use('/answer', answerRouter);
// router.use('/comment', commentRouter);

module.exports = router;