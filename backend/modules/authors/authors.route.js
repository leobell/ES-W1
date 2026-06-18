const express = require('express')
const authors = express.Router()
const authorController = require('./authors.controller')
const { upload } = require('../../middlewares/multer/index')
const { cloudAuthors } = require('../../middlewares/multer/index')

authors.get('/authors', authorController.getAuthors)
authors.get('/authors/:id', authorController.getAuthor)

authors.post('/authors', authorController.createAuthor)
//authors.post('/authors/avatar/disk',upload.single('img'), authorController.uploadOnDisk)
//authors.post('/authors/avatar/cloud',cloud.single('img'), authorController.uploadFileOnCloud)

authors.patch('/authors/:id', authorController.updateAuthor)
authors.patch('/authors/:id/avatar',cloudAuthors.single('avatar'), authorController.uploadFileOnCloud)
authors.delete('/authors/:id', authorController.deleteAuthor)


module.exports = authors