const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String
    },
    readTime: {
        value: Number,
        unit: {
            type: String,
            default: 'seconds'
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    content: {
        type: String,
        required: true
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default: []
        }
    ]
}, { strict: true })

module.exports = mongoose.model('Blog', BlogSchema)