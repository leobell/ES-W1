const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Author = require('../authors/authors.schema')
const InvalidPasswordException = require('../../exceptions/auth/invalidPasswordException')

const login = async (email, password) => {
    const author = await Author.findOne({ email })  
    if(!author){
        throw new InvalidPasswordException()
    }

    const isPasswordValid = await bcrypt.compare(password, author.password)

    if(!isPasswordValid){
        throw new InvalidPasswordException()
    }

    const token = jwt.sign({
        name: author.name,
        surname: author.surname,
        email:author.email,
        id:author._id
    }, process.env.JWT_SECRET, {
        expiresIn: '3m'
    })

    return {
        token
    }
}

module.exports = {
    login
}