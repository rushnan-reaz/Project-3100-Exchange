const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: false, 
  },
  answer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
    required: true, 
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
