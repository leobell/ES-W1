const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    rate: {
        type: Number,
        default: 1
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model('Comment', CommentSchema)