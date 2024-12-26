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

AnswerSchema.pre('save', async function(next) {
  if (this.isNew) {
    const user = await User.findById(this.user);
    const userTimezone = user.timezone || 'UTC'; // Default to UTC if no timezone is set
    this.createdAt = moment().tz(userTimezone).toDate();
  }
  next();
});

module.exports = mongoose.model("Answer", AnswerSchema);
