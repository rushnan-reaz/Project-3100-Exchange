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

module.exports = router;