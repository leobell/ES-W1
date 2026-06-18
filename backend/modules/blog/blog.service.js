const BlogSchema = require('./blog.schema')

const getAllBlog = async (page, pageSize) => {
    const blogPosts = await BlogSchema.find()
        .limit(pageSize)
        .skip((page - 1) * pageSize)
    
    const totalBlogs = await BlogSchema.countDocuments()
    const totalPages = Math.ceil(totalBlogs/pageSize)

    return {
        page: Number(page),
        pageSize: Number(pageSize),
        totalBlogs,
        totalPages,
        blogPosts
    }
}

const getOneBlogPost = async (id) => {
    return BlogSchema.findById(id)
}

const createBlogPost = async (body) => {
    const newBlogPost = new BlogSchema(body)
    return newBlogPost.save()
}

const updateBlogPost = async (id, body) => {
    return BlogSchema.findByIdAndUpdate(id, body, {returnDocument: 'after', runValidators: true})
}

const deleteBlogPost = async (id) => {
    return BlogSchema.findByIdAndDelete(id)
}

module.exports = {
    getAllBlog,
    getOneBlogPost,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost
}