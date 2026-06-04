const blogService = require('./blog.service')

const getAllBlog = async (req, res) => {
    try {
        const allBlog = await blogService.getAllBlog()

        if(!allBlog){
            return res.status(404)
                .send({
                    statusCode: 404,
                    message: 'blog not found'
                })
        }

        res.status(200)
            .send({
                statusCode: 200,
                allBlog
            })
    } catch (error) {
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
            return res.status(404)
                .send({
                    statusCode: 404,
                    message:'blog not found'
                })
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
            return res.status(404)
                .send({
                    statusCode:404,
                    message: 'Blog post not found'
                })
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
            return res.status(404)
                .send({
                    statusCode: 404,
                    message: 'Blog not found'
                })
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

module.exports = {
    getAllBlog,
    getOneBlogPost,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost
}