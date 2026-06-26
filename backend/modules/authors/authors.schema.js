const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    password: {
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

Author.pre('save', async function() {
    const instance = this

    if(!instance.isModified()){
        return
    }

    const salt = await bcrypt.genSalt(10)
    instance.password = await bcrypt.hash(instance.password, salt)
})

Author.pre('findOneAndUpdate', async function() {
    const update = this.getUpdate()

    if(update.password){
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(update.password, salt)

        this.setUpdate({
            ...update,
            password: hashed
        })
    }
})
module.exports = mongoose.model('Author', Author, 'authors')