const mongoose = require('mongoose');

const CommentSchema= new mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    },
    comment: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    user: Object,
});

module.exports = mongoose.model('Comment', CommentSchema);