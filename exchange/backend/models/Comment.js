const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  answer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

CommentSchema.pre('save', async function(next) {
  if (this.isNew) {
    const user = await User.findById(this.user);
    const userTimezone = user.timezone || 'UTC'; // Default to UTC if no timezone is set
    this.createdAt = moment().tz(userTimezone).toDate();
  }
  next();
});

module.exports = mongoose.model('Comment', CommentSchema);