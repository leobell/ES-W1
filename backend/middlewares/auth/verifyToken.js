const jwt = require('jsonwebtoken')
const InvalidOrMissingTokenException = require('../../exceptions/auth/invalidOrMissingTokenException')

const EXLUDED_ROUTES = [
    '/login'
]

const verifyToken = async (req, res, next) => {
    if ( EXLUDED_ROUTES.includes(req.path) ){
        return next()
    }

    const token = req.header('authorization')

    if(!token){
        throw new InvalidOrMissingTokenException()
    }

    try {
        req.author = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        throw new InvalidOrMissingTokenException()
    }
}



module.exports = {
    verifyToken,
}