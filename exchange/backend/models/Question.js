
const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: [String], 
    required: true,
  },
  user: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId, /
    // ref: 'User', 
    required:false, 
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
