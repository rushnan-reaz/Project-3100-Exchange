const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const QuestionDB = require("../models/Question");

router.get('/question', (req, res) => {
  res.json({ message: 'This is the question route' });
});

router.post("/", async (req, res) => {
  try {
    // Create a new QuestionDB object
    const questiondata = new QuestionDB({
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      user: req.body.user,
    });

    // Save the data to the database
    const savedData = await questiondata.save();

    // Respond with the saved data
    res.status(201).json({ status: true, data: savedData });
  } catch (error) {
    // Handle errors
    res.status(500).json({ status: false, message: "Error adding question" });
  }
});

module.exports = router; 
