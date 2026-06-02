const authorService = require('./authors.service')

const getAuthors = async (request, response) => {
    try {
        const authors = await authorService.getAuthors()
        response.status(200)
            .send({
                statusCode: 200,
                authors
            })
    } catch (error) {
        response.status(500)
            .send({
                statusCode: 500,
                message:'Error during the Authors request'
            })        
    }
}

const createAuthor = async (request, response) => {
    try {
        const { body } = request
        const author = await authorService.createAuthor(body)
        response.status(201)
            .send({
                statusCode: 201,
                author
            })
    } catch (error) {
        response.status(500)
            .send({
                statusCode: 500,
                message:'Error during the Authors request'
            }) 
    }
}

module.exports =  {
    getAuthors,
    createAuthor
}