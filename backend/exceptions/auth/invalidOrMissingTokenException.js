const HttpException = require('../index')

class InvalidOrMissingTokenException extends HttpException {
    constructor (
        message = 'StriveBlog: unauthorized!',
        error = 'Invalid or missing token detected.',
        statusCode = 404
    ) {
        super(message, error, statusCode)
    }
}

module.exports = InvalidOrMissingTokenException