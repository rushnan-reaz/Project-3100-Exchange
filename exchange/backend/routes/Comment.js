const express = require('express');
const router = express.Router();
const commentDB = require('../models/Comment');

// Welcome route
router.get('/', (req, res) => {
    res.send('Welcome to the comment router');
});

// Add comment route
router.post('/', async (req, res) => {
    try {
        // Validate request body
        const { question_id, answer_id, comment, user } = req.body;

        if (!question_id || !comment || !user) {
            return res.status(400).json({
                status: false,
                message: "Missing required fields: question_id, comment, or user.",
            });
        }

        // Create a new comment in the database
        const newComment = await commentDB.create({
            question_id,
            answer_id: answer_id || null, // Handle optional answer_id
            comment,
            user,
        });

        // Send success response
        res.status(201).json({
            status: true,
            message: "Comment added successfully.",
            data: newComment,
        });
    } catch (error) {
        // Handle any errors
        console.error("Error adding comment:", error.message);
        res.status(500).json({
            status: false,
            message: "Error adding comment. Please try again later.",
        });
    }
});

module.exports = router;
