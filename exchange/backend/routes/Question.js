const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const QuestionDB = require("../models/Question");

// router.get('/', (req, res) => {
//   res.json({ message: 'This is the question route' });
// });

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
    await questiondata.save().then((doc) => {
      res.status(201).json({ status: true, data: doc});
    });

  } catch (error) {
    // Handle errors
    res.status(404).json({ status: false, message: "Error adding question" });
  }
});

router.get("/", async (req, res) => {
.Aggregate



module.exports = router; 
