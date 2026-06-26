const HttpException = require('../index')

class AuthorNotFoundException extends HttpException {
    constructor (
        message = 'the requested resource is not found',
        error = 'Not found',
        statusCode = 404
    ) {
        super(message, error, statusCode)
    }
}

module.exports = AuthorNotFoundException