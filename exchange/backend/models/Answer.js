const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    // unique: true,
  },
  answer: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  dislikes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", 
    },
  ],
});

module.exports = mongoose.model("Answer", AnswerSchema);
