const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Types } = require('mongoose');

const QuestionDB = require("../models/Question");
const CommentDB = require('../models/Comment'); 
const AnswerDB = require('../models/Answer'); 


// router.get('/', (req, res) => {
//   res.json({ message: 'This is the question route' });
// });

router.post("/", async (req, res) => {
  try {

    // Check if the user ID is valid
    // if (!req.body.user) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "User ID is required",
    //   });
    
    // // if (!Types.ObjectId.isValid(req.body.user)) {
    // //   return res.status(400).json({ 
    // //     status: false, 
    // //     message: "Invalid user ID" 
    // //   });
    
    // }

    // Create new QuestionDB object
    const questiondata = new QuestionDB({
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      user: req.body.user,
      // user: Types.ObjectId(req.body.user), 
    });

    // Save the data to the database
    const doc = await questiondata.save();
    res.status(201).json({ status: true, data: doc });

  } catch (error) {
    console.error("Question creation error:", error);
    res.status(500).json({ 
      status: false, 
      message: "Error adding question",
      errorDetails: error.message 
    });
  }
});


router.get("/", async (req, res) => {
  try {
    // Fetch all questions
    const questions = await QuestionDB.find({}).lean();

    if (!questions.length) {
      return res.status(404).json({ message: "No questions found" });
    }

    // Fetch all related comments and answers 
    const questionIds = questions.map((question) => question._id);

    const [comments, answers] = await Promise.all([
      CommentDB.find({ question_id: { $in: questionIds } }).lean(),
      AnswerDB.find({ question_id: { $in: questionIds } }).lean(),
    ]);

    // Map question with its comments and answers
    const enrichedQuestions = questions.map((question) => ({
      ...question,
      comments: comments.filter(
        (comment) => String(comment.question_id) === String(question._id)
      ),
      answers: answers.filter(
        (answer) => String(answer.question_id) === String(question._id)
      ),
    }));

    // Return data
    res.status(200).json(enrichedQuestions);
  } catch (error) {
    console.error("Error retrieving questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    // Fetch the specific question
    const question = await QuestionDB.findById(req.params.id).lean();

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Fetch related comments and answers 
    const [comments, answers] = await Promise.all([
      CommentDB.find({ question_id: question._id }).lean(),
      AnswerDB.find({ question_id: question._id }).lean(),
    ]);

    // Return question
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
