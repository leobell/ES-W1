const express = require('express')
const authors = express.Router()
const authorController = require('./authors.controller')


authors.get('/authors', authorController.getAuthors)
authors.post('/authors', authorController.createAuthor)




module.exports = authors