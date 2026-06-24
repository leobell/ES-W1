const mongoose = require('mongoose')

const Author = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    birthDate: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    posts: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Blog'
            }
        ],
        default: []
    }
}, { strict:true })

module.exports = mongoose.model('Author', Author, 'authors')