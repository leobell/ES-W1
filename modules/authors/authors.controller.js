const authorService = require('./authors.service')
const AuthorNotFoundException = require('../../exceptions/authors/authorNotFound')
const { sendWelcomeEmail } = require('../email/mailService')

const getAuthors = async (request, response, next) => {
    try {
        const { page = 1, pageSize = 3} = request.query
        const {
            totalAuthors,
            totalPages,
            authors
        } = await authorService.getAuthors(page, pageSize)
        if (!authors) {
            throw new AuthorNotFoundException()
        }
        response.status(200)
            .send({
                statusCode: 200,
                page: Number(page),
                pageSize: Number(pageSize),
                totalAuthors,
                totalPages,
                authors
            })
    } catch (error) {
        next(error)     
    }
}

const getAuthor = async (request, response, next) => {
    try {
        const { id } = request.params
        const author = await authorService.getAuthor(id)
        if (!author) {
            throw new AuthorNotFoundException()
        }
        response.status(200)
            .send({
                statusCode: 200,
                author
            })
    } catch (error) {
        next(error)
    }
}

const createAuthor = async (request, response, next) => {
    try {
        const { body } = request
        const author = await authorService.createAuthor(body)

        sendWelcomeEmail(author.email, author.name)
            .catch(err => {
                console.error(`Utente registrato ma la mail di benvenuto è fallita: ${err}`)
            })
        response.status(201)
            .send({
                statusCode: 201,
                message:'Autore registrato con successo',
                author
            })
    } catch (error) {
        next(error)
    }
}

const updateAuthor = async (req, res, next) => {
    try {
        const { body } = req
        const idAuthor = req.params.id
        const authorUpdated = await authorService.updateAuthor(idAuthor, body)

        if (!authorUpdated) {
            throw new AuthorNotFoundException()
        }

        res.status(200)
            .send({
                statusCode:200,
                authorUpdated
            })
    } catch (error) {
        next(error)
    }
}

const deleteAuthor = async (req, res, next) => {
    try {
        const idAuthor =req.params.id
        const authorDeleted = await authorService.deleteAuthor(idAuthor)
        if (!authorDeleted) {
            throw new AuthorNotFoundException()
        }
        res.status(200)
            .send({
                statusCode:200,
                authorDeleted,
                message: 'Author deleted succesfully'
            })
    } catch (error) {
        next(error)
    }
    
}

const uploadOnDisk = async (req, res, next) => {
    try {
        const url = `${req.protocol}://${req.get('host')}`
        const name = req.file.filename

        res.status(200).json({ img:`${url}/upload/${name}` })
    } catch (error) {
        next(error)
    }
}

const uploadFileOnCloud = async (req, res, next) => {
    try{
        const idAuthor = req.params.id

        if (!req.file){
            return res.status(400)
                .json({
                    statusCode:400,
                    message:'file upload unsuccessfully'
                })
        }
        const avatarUrl = req.file.path
        const authorUpdated = await authorService.updateAuthor(idAuthor, {avatar: avatarUrl})

        if (!authorUpdated) {
            throw new AuthorNotFoundException()
        }

        res.status(200)
            .json({
                statusCode: 200,
                message: 'avatar updated successfully',
                avatar: avatarUrl,
                authorUpdated
            })
    } catch (e) {
        next(e)
    }
}

module.exports =  {
    getAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    uploadOnDisk,
    uploadFileOnCloud
}