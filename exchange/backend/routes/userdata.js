const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Types } = require("mongoose");

const QuestionDB = require("../models/Question");
const CommentDB = require("../models/Comment");
const AnswerDB = require("../models/Answer");
const UserDB = require("../models/User");

const authenticate = require("../middleware/authenticate");

// Get user profile and stats
router.get("/profile/:userId", authenticate, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserDB.findById(userId).select('-password');
    const questionCount = await QuestionDB.countDocuments({ user: userId });
    const answerCount = await AnswerDB.countDocuments({ user: userId });

    console.log("User Profile:", user);
    console.log("Question Count:", questionCount);
    console.log("Answer Count:", answerCount);
    
    res.json({
      user,
      stats: {
        questions: questionCount,
        answers: answerCount
      }
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get user's questions with details
router.get("/questions/:userId", authenticate, async (req, res) => {
  try {
    const questions = await QuestionDB.find({ user: req.params.userId })
      .populate("user", "_id username")
      .lean();

    // Enrich with comments and answers
    const enrichedQuestions = await Promise.all(
      questions.map(async (question) => {
        const [comments, answers] = await Promise.all([
          CommentDB.find({ question_id: question._id })
            .populate("user", "_id username")
            .lean(),
          AnswerDB.find({ question_id: question._id })
            .populate("user", "_id username")
            .lean(),
        ]);
        return {
          ...question,
          comments,
          answers,
        };
      })
    );

    console.log("User Questions:", enrichedQuestions);
    res.json(enrichedQuestions);
  } catch (error) {
    console.error("Error fetching user questions:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get user's answers with details
router.get("/answers/:userId", authenticate, async (req, res) => {
  try {
    console.log("Fetching answers for user:", req.params.userId);
    
    const answers = await AnswerDB.find({ user: req.params.userId })
      .populate({
        path: "question_id",  // Changed from question to question_id
        select: "title description tag"
      })
      .populate("user", "_id username")
      .populate({
        path: "likes",
        select: "_id username"
      })
      .populate({
        path: "dislikes",
        select: "_id username"
      })
      .lean();

    console.log("Raw answers with populated data:", answers);

    // Map question_id to question for frontend consistency
    const mappedAnswers = answers.map(answer => ({
      ...answer,
      question: answer.question_id  // Add question field for frontend
    }));

    console.log("Mapped answers:", mappedAnswers);
    res.json(mappedAnswers);
  } catch (error) {
    console.error("Error fetching user answers:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;