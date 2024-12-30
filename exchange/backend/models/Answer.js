const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
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
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    default: [] 
  },
  dislikes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    default: []  
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", 
      required: false,
    },
  ],
});

module.exports = mongoose.model("Answer", AnswerSchema);