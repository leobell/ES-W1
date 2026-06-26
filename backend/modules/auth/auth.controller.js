const authService = require('./auth.service')

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const { token } = await authService.login(email, password)

        res
            .header('authorization', token)
            .status(200)
            .json({
                statusCode:200,
                message:'Login success!!',
                token
            })
    } catch (error) {
        next(error)
    }
}

const getMe = async (req, res, next) => {
    try{
        return res.status(200)
            .json({
                author: {
                    id: req.author._id,
                    name: req.author.name,
                    surname: req.author.surname,
                    email: req.author.email
                },
                token: req.token
            })
            
    } catch (e) {
        next(e)
    }
}

module.exports = {
    login,
    getMe
}