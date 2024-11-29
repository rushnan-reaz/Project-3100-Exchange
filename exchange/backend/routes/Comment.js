const express = require('express');
const router = express.Router();
const commentDB = require('../models/Comment');

// Welcome route
router.get('/', (req, res) => {
    res.send('Welcome to the comment router');
});

// Add comment route
router.post('/:id', async (req, res) => {
    try {
        // Create a new comment in the database
        const newComment = await commentDB.create({
            question_id: req.body.question_id,
            comment: req.body.comment,
            user: req.body.user,
        });

        // Send success response
        res.status(201).json({ status: true, data: newComment });
    } catch (error) {
        // Handle any errors
        console.error("Error adding comment:", error.message);
        res.status(500).json({ status: false, message: "Error adding comment" });
    }
});

module.exports = router;
