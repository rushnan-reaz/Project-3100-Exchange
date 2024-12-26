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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  dislikes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

QuestionSchema.pre('save', async function(next) {
  if (this.isNew) {
    const user = await User.findById(this.user);
    const userTimezone = user.timezone || 'UTC'; 
    this.created_at = moment().tz(userTimezone).toDate();
  }
  next();
});

module.exports = mongoose.model("Question", QuestionSchema);
