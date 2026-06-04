const express = require('express')
const blogPosts = express.Router()
const blogController = require('./blog.controller')

blogPosts.get('/blogPosts', blogController.getAllBlog)
blogPosts.get('/blogPosts/:id', blogController.getOneBlogPost)
blogPosts.post('/blogPosts', blogController.createBlogPost)
blogPosts.patch('/blogPosts/:id', blogController.updateBlogPost)
blogPosts.delete('/blogPosts/:id', blogController.deleteBlogPost)

module.exports = blogPosts