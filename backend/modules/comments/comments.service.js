const Comment = require('./comments.schema')
const Blog = require('../blog/blog.schema')

const getAllComment = async (blogId) => {
    const blog = await Blog.findById(blogId).populate('comment')
    console.log(blog.comment)
    if(!blog){
        return null
    }
    
    return blog.comment
}

const getOneComment = async (blogId, commentId) => {
    const blog = Blog.findOne({ _id:blogId, comment:commentId})

    if(!blog){
        return null
    }

    return Comment.findById(commentId)
}

const createComment = async (blogId, body) => {
    const newComment = new Comment(body)
    const saveComment = await newComment.save()

    await Blog.findByIdAndUpdate(
        blogId,
        {$push:{ comment: saveComment._id}}
    )

    return saveComment
}

const updateComment = async (id, body) => {
    return Comment.findByIdAndUpdate(id, body, {new:true})
}

const deleteComment = async (id, blogId) => {
    const deletedComment = await Comment.findByIdAndDelete(id)

    if(!deletedComment) {
        return null
    }

    await Blog.findByIdAndUpdate(
        blogId,
        {$pull:{ comment: id }}
    )

    return deletedComment
}

module.exports = {
    getAllComment,
    getOneComment,
    createComment,
    updateComment,
    deleteComment,
}

