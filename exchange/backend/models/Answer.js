const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
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
        type: Object,
        required: false,},

    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }
});

module.exports = mongoose.model('Answer', AnswerSchema);