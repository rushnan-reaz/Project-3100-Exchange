const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Types } = require("mongoose");

const QuestionDB = require("../models/Question");
const CommentDB = require("../models/Comment");
const AnswerDB = require("../models/Answer");
const UserDB = require("../models/User");

const authenticate = require('../middleware/authenticate'); // Add authentication middleware

router.post("/", authenticate, async (req, res) => {
  try {
    // Get userId from authenticated session
    const userId = req.session.userId;

    console.log("userId", userId);

    if (!userId) {
      return res.status(401).json({
        status: false,
        message: "Authentication required",
      });
    }

    // Normalize tags
    const normalizedTags = [...new Set(req.body.tag.map((tag) => tag.toLowerCase()))];

    // Create question with authenticated user
    const questionData = new QuestionDB({
      title: req.body.title,
      description: req.body.description,
      tag: normalizedTags,
      user: userId, // Use authenticated userId
    });
  console.log("questionData", questionData);



    const doc = await questionData.save();
    res.status(201).json({ status: true, data: doc });
  } catch (error) {
    console.error("Question creation error:", error);
    res.status(500).json({
      status: false,
      message: "Error adding question",
      errorDetails: error.message,
    });
  }
});

// Fetch all questions
router.get("/", async (req, res) => {
  try {
    // Fetch all questions with user details populated (ObjectId and username only)
    const questions = await QuestionDB.find({})
      .populate("user", "_id username") // Populate ObjectId and username
      .lean();

    if (!questions.length) {
      return res.status(404).json({ message: "No questions found" });
    }

    // Fetch all related comments and answers
    const questionIds = questions.map((question) => question._id);

    const [comments, answers] = await Promise.all([
      CommentDB.find({ question_id: { $in: questionIds } }).lean(),
      AnswerDB.find({ question_id: { $in: questionIds } }).lean(),
    ]);

    // Map each question with its comments and answers
    const enrichedQuestions = questions.map((question) => ({
      ...question,
      comments: comments.filter(
        (comment) => String(comment.question_id) === String(question._id)
      ),
      answers: answers.filter(
        (answer) => String(answer.question_id) === String(question._id)
      ),
    }));

    res.status(200).json(enrichedQuestions);
  } catch (error) {
    console.error("Error retrieving questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch a specific question by ID
router.get("/:id", async (req, res) => {
  try {
    // Fetch the specific question with user details populated (ObjectId and username only)
    const question = await QuestionDB.findById(req.params.id)
      .populate("user", "_id username") // Populate the user for the question itself
      .lean();

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Fetch related answers and populate user field for each answer
    const answers = await AnswerDB.find({ question_id: question._id })
      .populate("user", "_id username") // Populate user for each answer
      .lean();

    // Fetch related comments (you can populate if necessary)
    const comments = await CommentDB.find({ question_id: question._id }).lean();

    // Return the enriched question data with populated answers and comments
    res.status(200).json({
      ...question,
      comments,
      answers,
    });
  } catch (error) {
    console.error("Error retrieving question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
