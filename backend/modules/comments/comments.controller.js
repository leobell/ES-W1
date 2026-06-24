const commentService = require('./comments.service')
const CommentNotFoundException = require('../../exceptions/comments/commentNotFound')
const commentsSchema = require('./comments.schema')

const getAllComments = async (req, res, next) => {
    try{
        const { id } = req.params
        const allComments = await commentService.getAllComment(id)

        if(!allComments){
            throw new CommentNotFoundException()
        }
        res.status(200)
            .json({
                statusCode: 200,
                allComments
            })
    } catch(e) {
        console.log(e)
        next(e)
    }
}

const getOneComment = async (req, res, next) => {
    try {
        const { id, commentId } = req.params
        const singleComment = await commentService.getOneComment(id, commentId)

        if(!singleComment){
            throw new CommentNotFoundException()
        }

        res.status(200)
            .json({
                statusCode: 200,
                singleComment
            })
    } catch (error) {
        next(error)
    }
}

const createComment = async (req, res, next) => {
    try {
        const { body } = req
        const { id } = req.params
        const newComment = await commentService.createComment(id, body)

        res.status(200)
            .json({
                statusCode: 200,
                message: 'Commento creato con successo',
                newComment
            })
    } catch (error) {
        next(error)
    }
}

const updateComment = async (req, res, next) => {
    try {
        const { body } = req
        const { commentId } = req.params

        const commentUpdated = await commentService.updateComment(commentId, body)

        if(!commentUpdated){
            throw new CommentNotFoundException()
        }

        res.status(200)
            .json({
                statusCode: 200,
                message:'commento modificato ed aggiornato con successo',
                commentUpdated
            })
    } catch (error) {
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const { id, commentId } = req.params
        const commentDeleted = await commentService.deleteComment(commentId, id)

        if(!commentDeleted){
            throw new CommentNotFoundException()
        }

        res.status(200)
            .json({
                statusCode: 200,
                message:'commento eliminato con successo',
                commentDeleted
            })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllComments,
    getOneComment,
    createComment,
    updateComment,
    deleteComment
}

