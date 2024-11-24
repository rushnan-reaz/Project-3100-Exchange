const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    },
    Answer: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    user: Object,
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }
});

module.exports = mongoose.model('Answer', AnswerSchema);