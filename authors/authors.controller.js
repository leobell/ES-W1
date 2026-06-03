const authorService = require('./authors.service')

const getAuthors = async (request, response) => {
    try {
        const authors = await authorService.getAuthors()
        if (!authors) {
            return response.status(404)
                .send({
                    statusCode: 404,
                    message: 'Authors not found'
                })
        }
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

const getAuthor = async (request, response) => {
    try {
        idAuthor = request.params.id
        const author = await authorService.getAuthor(idAuthor)
        if (!author) {
            return response.status(404)
                .send({
                    statusCode: 404,
                    message: 'Author not found'
                })
        }
        response.status(200)
            .send({
                statusCode: 200,
                author
            })
    } catch (error) {
        response.status(500)
            .send({
                statusCode:500,
                messaga:'Error during the Author request'
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
                message:'Error during the create Author request'
            }) 
    }
}

const updateAuthor = async (req, res) => {
    try {
        const { body } = req
        const idAuthor = req.params.id
        const authorUpdated = await authorService.updateAuthor(idAuthor, body)

        if (!authorUpdated) {
            return res.status(404)
                .send({
                    statusCode: 404,
                    message: 'Author not found'
                })
        }

        res.status(200)
            .send({
                statusCode:200,
                authorUpdated
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message:'Error during the update Author request'
            })
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const idAuthor =req.params.id
        const authorDeleted = await authorService.deleteAuthor(idAuthor)
        if (!authorDeleted) {
                return res.status(404)
                    .send({
                        statusCode: 404,
                        message: 'Author not found'
                    })
            }
        res.status(200)
            .send({
                statusCode:200,
                authorDeleted,
                message: 'Author deleted succesfully'
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message:'Error during the delete Author request'
            })
    }
    
}

module.exports =  {
    getAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
}