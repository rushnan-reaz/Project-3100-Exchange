const express = require("express");
const router = express.Router();
const Question = require("../models/Question"); // Import Question model
const Answer = require("../models/Answer"); // Import Answer model
const Comment = require("../models/Comment"); // Import Comment model

// Welcome route
// router.get('/', (req, res) => {
//   res.send('Welcome to the comment router');
// });

// comment route
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
      createdAt: new Date(),
    });

    // Populate user details immediately
    const populatedComment = await Comment.findById(newComment._id)
      .populate("user", "username")
      .lean();

    // Add the comment ID to the answer's comments array
    const updatedAnswer = await Answer.findByIdAndUpdate(
      answer_id,
      { $push: { comments: newComment._id } },
      { new: true } // Add this to get updated answer
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

module.exports = router;
