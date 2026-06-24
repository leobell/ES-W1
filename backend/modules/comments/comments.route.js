const express = require('express')
const comments = express.Router()
const commentsController = require('./comments.controller')

comments.get('/blogPosts/:id/comments', commentsController.getAllComments)
comments.get('/blogPosts/:id/comments/:commentId', commentsController.getOneComment)

comments.post('/blogPosts/:id', commentsController.createComment)

comments.patch('/blogPosts/:id/comments/:commentId', commentsController.updateComment)

comments.delete('/blogPosts/:id/comments/:commentId', commentsController.deleteComment)

module.exports = comments