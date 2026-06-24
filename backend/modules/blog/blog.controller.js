const blogService = require('./blog.service')
const BlogPostNotFoundException = require('../../exceptions/blog/blogNotFound')
const { sendNewPostEmail } = require('../email/mailService')
const getAllBlog = async (req, res) => {
    try {

        const { page = 1, pageSize = 3 } = req.query
        const {
            totalBlogs, 
            totalPages, 
            blogPosts
        } = await blogService.getAllBlog(page, pageSize)

        if(!blogPosts){
            return res.status(404)
                .send({
                    statusCode: 404,
                    message: 'blog not found'
                })
        }

        res.status(200)
            .send({
                statusCode: 200,
                totalPages,
                totalBlogs,
                page: Number(page),
                pageSize: Number(pageSize),
                blogPosts
            })
    } catch (error) {
        console.log(error)
        res.status(500)
            .send({
                statusCode: 500,
                message: 'Error during the Blog request'
            })
    }
}

const getOneBlogPost = async (req, res) => {
    try {
        const { id } = req.params
        const oneBlog = await blogService.getOneBlogPost(id)

        if(!oneBlog){
            throw new BlogPostNotFoundException()
        }

        res.status(200)
            .send({
                statusCode: 200,
                oneBlog
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: 'Error during the Blog request'
            })
    }
}

const createBlogPost = async (req, res) => {
    try {
        const { body } = req
        const newBlogPost = await blogService.createBlogPost(body)

        sendNewPostEmail(newBlogPost.author, newBlogPost.author)
        res.status(201)
            .send({
                statusCode: 201,
                newBlogPost
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: 'Error during the Blog request'
            })
    }
}

const updateBlogPost = async (req, res) => {
    try {
        const { body } = req
        const { id } = req.params

        const blogPostUpdated = await blogService.updateBlogPost(id, body)

        if (!blogPostUpdated) {
            throw new BlogPostNotFoundException()
        }
        res.status(200)
            .send({
                statusCode: 200,
                blogPostUpdated
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: 'Error during the Blog request'
            })
    }
}

const deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params
        const deletedBlogPost = await blogService.deleteBlogPost(id)

        if(!deletedBlogPost) {
            throw new BlogPostNotFoundException()
        }

        res.status(200)
            .send({
                statusCode:200,
                message: 'Blog deleted succesfully',
                deletedBlogPost
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: 'Error during the Blog request'
            })
    }
}

const uploadFileOnCloud = async (req, res, next) => {
    try{
        const idPost = req.params.blogPostId
        
        if (!req.file){
            return res.status(400)
                .json({
                    statusCode:400,
                    message:'file upload unsuccessfully'
                })
        }

        const coverUrl = req.file.path
        const blogPostUpdated = await blogService.updateBlogPost(idPost, { cover: coverUrl })

        if(!blogPostUpdated){
            throw new BlogPostNotFoundException()
        }

        res.status(200)
            .json({
                statusCode: 200,
                message: 'cover updated successfully',
                cover: coverUrl,
                blogPostUpdated
            })
    } catch(e) {
        next(e)
    }
}

module.exports = {
    getAllBlog,
    getOneBlogPost,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    uploadFileOnCloud
}