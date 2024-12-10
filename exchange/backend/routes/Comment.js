const express = require('express');
const router = express.Router();
const Question = require('../models/Question'); // Import Question model
const Answer = require('../models/Answer'); // Import Answer model
const Comment = require('../models/Comment'); // Import Comment model

// Welcome route
router.get('/', (req, res) => {
  res.send('Welcome to the comment router');
});

// Add comment route
router.post("/", async (req, res) => {
  try {
    const { question_id, answer_id, comment, user } = req.body;

    // Validate input
    if (!answer_id || !comment || !user) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields: answer_id, comment, or user.",
      });
    }

    // Create a new comment
    const newComment = await Comment.create({
      question_id,
      answer_id,
      comment,
      user,
    });

    // Add the comment ID to the answer's comments array
    const updatedAnswer = await Answer.findByIdAndUpdate(
      answer_id,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    if (!updatedAnswer) {
      return res.status(404).json({
        status: false,
        message: "Answer not found. Unable to add comment.",
      });
    }

    res.status(201).json({
      status: true,
      message: "Comment added successfully.",
      data: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({
      status: false,
      message: "Error adding comment. Please try again later.",
    });
  }
});

/// Get all answers with comments for a question
router.get("/:id", async (req, res) => {
    try {
      const question = await Question.findById(req.params.id).populate("user", "username");
  
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      // Fetch answers related to the question
      const answers = await Answer.find({ question_id: question._id })
        .populate("user", "username")
        .lean(); // Use `lean` to modify the object later
  
      // Fetch all comments for each answer
      for (let answer of answers) {
        // Populate the comments field with actual comment objects
        answer.comments = await Comment.find({ _id: { $in: answer.comments } })
          .populate("user", "username")
          .lean();
      }
  
      res.status(200).json({
        ...question.toObject(),
        answers,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  


module.exports = router;
