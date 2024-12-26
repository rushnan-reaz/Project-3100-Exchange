const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Types } = require("mongoose");

const QuestionDB = require("../models/Question");
const CommentDB = require("../models/Comment");
const AnswerDB = require("../models/Answer");
const UserDB = require("../models/User");

const authenticate = require("../middleware/authenticate"); // Add authentication middleware

// add question
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
    const normalizedTags = [
      ...new Set(req.body.tag.map((tag) => tag.toLowerCase())),
    ];

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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "newest";
    const search = req.query.search || "";

    console.log("Query params:", { page, limit, sort, search });

    // Create search query
    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { tag: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Apply search query to find
    let questions = await QuestionDB.find(searchQuery)
      .populate("user", "_id username")
      .lean();

    // Get total count with search
    const totalQuestions = questions.length;

    // Sort questions
    switch (sort) {
      case "likes":
        questions.sort((a, b) => 
          (b.likes?.length || 0) - (a.likes?.length || 0) ||
          b.created_at - a.created_at
        );
        break;
      case "answers":
        const answerCounts = await Promise.all(
          questions.map(async (q) => ({
            questionId: q._id,
            count: await AnswerDB.countDocuments({ question_id: q._id }),
          }))
        );
        const answerMap = new Map(
          answerCounts.map(({ questionId, count }) => [
            questionId.toString(),
            count,
          ])
        );
        questions.sort((a, b) =>
          (answerMap.get(b._id.toString()) || 0) -
          (answerMap.get(a._id.toString()) || 0) ||
          b.created_at - a.created_at
        );
        break;
      default:
        questions.sort((a, b) => b.created_at - a.created_at);
    }

    // Apply pagination
    questions = questions.slice(skip, skip + limit);

    // Enrich with comments and answers
    const enrichedQuestions = await Promise.all(
      questions.map(async (question) => {
        const [comments, answers] = await Promise.all([
          CommentDB.find({ question_id: question._id }).lean(),
          AnswerDB.find({ question_id: question._id }).lean(),
        ]);
        return {
          ...question,
          comments,
          answers,
        };
      })
    );

    return res.status(200).json({
      questions: enrichedQuestions,
      currentPage: page,
      totalPages: Math.ceil(totalQuestions / limit),
      totalQuestions,
    });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch a specific question by ID
router.get("/:id", async (req, res) => {
  try {
    // Fetch the specific question with user details populated
    const question = await QuestionDB.findById(req.params.id)
      .populate("user", "_id username")
      .lean();

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Fetch and populate answers with their users and comments
    const answers = await AnswerDB.find({ question_id: question._id })
      .populate("user", "_id username")
      .lean();

    // Fetch all comments for these answers
    const answerIds = answers.map((answer) => answer._id);
    const comments = await CommentDB.find({
      answer_id: { $in: answerIds },
    })
      .populate("user", "_id username")
      .lean();

    // Map comments to their respective answers
    const answersWithComments = answers.map((answer) => ({
      ...answer,
      comments: comments.filter(
        (comment) => String(comment.answer_id) === String(answer._id)
      ),
    }));

    // Return enriched question data
    res.status(200).json({
      ...question,
      answers: answersWithComments,
    });
  } catch (error) {
    console.error("Error retrieving question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/like/:id", authenticate, async (req, res) => {
  try {
    console.log(`Like request received for question: ${req.params.id}`);
    const questionId = req.params.id;
    const userId = req.session.userId;

    if (!questionId || !userId) {
      console.error("Missing required fields:", { questionId, userId });
      return res
        .status(400)
        .json({ status: false, message: "Missing required fields" });
    }

    const question = await QuestionDB.findById(questionId);
    if (!question) {
      console.error(`Question not found with ID: ${questionId}`);
      return res
        .status(404)
        .json({ status: false, message: "Question not found" });
    }

    if (!question.likes) question.likes = [];
    if (!question.dislikes) question.dislikes = [];

    const isLiked = question.likes.some((id) => id.toString() === userId);
    const isDisliked = question.dislikes.some((id) => id.toString() === userId);

    if (isLiked) {
      question.likes = question.likes.filter((id) => id.toString() !== userId);
    } else {
      question.likes.push(userId);
      if (isDisliked) {
        question.dislikes = question.dislikes.filter(
          (id) => id.toString() !== userId
        );
      }
    }

    await question.save();
    res.json({
      status: true,
      data: {
        _id: question._id,
        likes: question.likes,
        dislikes: question.dislikes,
        likeCount: question.likes.length,
        dislikeCount: question.dislikes.length,
      },
    });
  } catch (error) {
    console.error("Error in question like route:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

router.put("/dislike/:id", authenticate, async (req, res) => {
  try {
    console.log(`Dislike request received for question: ${req.params.id}`);
    const questionId = req.params.id;
    const userId = req.session.userId;

    if (!questionId || !userId) {
      console.error("Missing required fields:", { questionId, userId });
      return res
        .status(400)
        .json({ status: false, message: "Missing required fields" });
    }

    const question = await QuestionDB.findById(questionId);
    if (!question) {
      console.error(`Question not found with ID: ${questionId}`);
      return res
        .status(404)
        .json({ status: false, message: "Question not found" });
    }

    if (!question.likes) question.likes = [];
    if (!question.dislikes) question.dislikes = [];

    const isDisliked = question.dislikes.some((id) => id.toString() === userId);
    const isLiked = question.likes.some((id) => id.toString() === userId);

    if (isDisliked) {
      question.dislikes = question.dislikes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      question.dislikes.push(userId);
      if (isLiked) {
        question.likes = question.likes.filter(
          (id) => id.toString() !== userId
        );
      }
    }

    await question.save();
    res.json({
      status: true,
      data: {
        _id: question._id,
        likes: question.likes,
        dislikes: question.dislikes,
        likeCount: question.likes.length,
        dislikeCount: question.dislikes.length,
      },
    });
  } catch (error) {
    console.error("Error in question dislike route:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

module.exports = router;
