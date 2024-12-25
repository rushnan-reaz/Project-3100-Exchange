const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const AnswerDB = require("../models/Answer");

router.get('/', (req, res) => {
    res.json({ message: 'This is the answer route' });
    });

router.post("/", async (req, res) => {
    try {
        const answerdata = new AnswerDB({
            question_id: req.body.question_id,
            answer: req.body.answer,
            createdAt: req.body.created_at,
            user: req.body.user,
        });

        // Save the data to the database
        const savedData = await answerdata.save();
        res.status(201).json({ status: true, data: savedData });
    } catch (error) {
        console.error("Error adding answer:", error.message);
        res.status(500).json({ status: false, message: "Error adding answer" });
    }
});

// Add like route

// router.put("/like", async (req, res) => {
//     res.json({ message: 'This is the like route' });
// });


router.put("/like/:id", async (req, res) => {
    try {
      console.log(`Like request received for answer: ${req.params.id}`);
      const answerId = req.params.id;
      const userId = req.body.userId;

      if (!answerId || !userId) {
        console.error('Missing required fields:', { answerId, userId });
        return res.status(400).json({ status: false, message: "Missing required fields" });
      }

      console.log(`Finding answer with ID: ${answerId}`);
      const answer = await AnswerDB.findById(answerId);
      if (!answer) {
        console.error(`Answer not found with ID: ${answerId}`);
        return res.status(404).json({ status: false, message: "Answer not found" });
      }

      // Initialize arrays if they don't exist
      answer.likes = answer.likes || [];
      answer.dislikes = answer.dislikes || [];

      console.log('Current answer state:', {
        likes: answer.likes.length || 0,
        dislikes: answer.dislikes.length || 0
      });

      const isLiked = answer.likes.includes(userId);
      const isDisliked = answer.dislikes.includes(userId);
      console.log('User interaction state:', { isLiked, isDisliked });

      if (isLiked) {
        console.log(`Removing like from user: ${userId}`);
        answer.likes = answer.likes.filter(id => id.toString() !== userId);
      } else {
        console.log(`Adding like from user: ${userId}`);
        answer.likes.push(userId);
        if (isDisliked) {
          console.log(`Removing dislike from user: ${userId}`);
          answer.dislikes = answer.dislikes.filter(id => id.toString() !== userId);
        }
      }

      await answer.save();
      console.log('Answer updated successfully:', {
        likes: answer.likes.length,
        dislikes: answer.dislikes.length
      });
      
      res.json({ status: true, data: answer });
    } catch (error) {
      console.error('Error in like route:', error);
      res.status(500).json({ status: false, message: error.message });
    }
});

router.put("/dislike/:id", async (req, res) => {
    try {
        console.log(`Dislike request received for answer: ${req.params.id}`);
        const answerId = req.params.id;
        const userId = req.body.userId;

        // Input validation
        if (!answerId || !userId) {
            console.error('Missing required fields:', { answerId, userId });
            return res.status(400).json({ status: false, message: "Missing required fields" });
        }

        // Find and validate answer
        console.log(`Finding answer with ID: ${answerId}`);
        const answer = await AnswerDB.findById(answerId);
        if (!answer) {
            console.error(`Answer not found with ID: ${answerId}`);
            return res.status(404).json({ status: false, message: "Answer not found" });
        }

        // Initialize arrays if null
        if (!answer.likes) answer.likes = [];
        if (!answer.dislikes) answer.dislikes = [];

        console.log('Current answer state:', {
            likes: answer.likes.length,
            dislikes: answer.dislikes.length
        });

        // Check user interaction using toString()
        const isDisliked = answer.dislikes.some(id => id.toString() === userId);
        const isLiked = answer.likes.some(id => id.toString() === userId);
        console.log('User interaction state:', { isLiked, isDisliked });

        // Handle dislike logic
        if (isDisliked) {
            console.log(`Removing dislike from user: ${userId}`);
            answer.dislikes = answer.dislikes.filter(id => id.toString() !== userId);
        } else {
            console.log(`Adding dislike from user: ${userId}`);
            answer.dislikes.push(userId);
            if (isLiked) {
                console.log(`Removing like from user: ${userId}`);
                answer.likes = answer.likes.filter(id => id.toString() !== userId);
            }
        }

        // Save and return updated answer
        await answer.save();
        console.log('Answer updated successfully:', {
            likes: answer.likes.length,
            dislikes: answer.dislikes.length
        });

        res.json({
            status: true,
            data: {
                _id: answer._id,
                likes: answer.likes,
                dislikes: answer.dislikes,
                likeCount: answer.likes.length,
                dislikeCount: answer.dislikes.length
            }
        });
    } catch (error) {
        console.error('Error in dislike route:', {
            error: error.message,
            stack: error.stack,
            answerId: req.params.id,
            userId: req.body.userId
        });
        res.status(500).json({ 
            status: false, 
            message: error.message,
            details: "Error processing dislike action"
        });
    }
});

module.exports = router;