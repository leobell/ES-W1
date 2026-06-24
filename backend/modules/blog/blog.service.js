const BlogSchema = require('./blog.schema')
const AuthorSchema = require('../authors/authors.schema')

const getAllBlog = async (page, pageSize) => {
    const blogPosts = await BlogSchema.find()
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .populate('author','name surname email')
    
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
    return BlogSchema.findById(id).populate('author','name surname email')
}

const createBlogPost = async (body) => {
    const newBlogPost = new BlogSchema(body)
    const blogSaved = await newBlogPost.save()
    
    await AuthorSchema.updateOne(
        { _id:body.author},
        {$push:{posts:blogSaved}}
    )

    return blogSaved
}

const updateBlogPost = async (id, body) => {
    return BlogSchema.findByIdAndUpdate(id, body, {returnDocument: 'after', runValidators: true})
}

const deleteBlogPost = async (id) => {
    const blogDeleted = await BlogSchema.findById(id)

    if(!blogDeleted){
        return null
    }

    await BlogSchema.findByIdAndDelete(id)
    await AuthorSchema.updateOne(
        {_id:blogDeleted.author},
        {$pull:{posts:id}}
    )

    return blogDeleted
}

module.exports = {
    getAllBlog,
    getOneBlogPost,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost
}