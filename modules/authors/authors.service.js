const AuthorSchema = require('./authors.schema')

const getAuthors = async (page, pageSize) => {
    const authors = await AuthorSchema.find()
        .limit(pageSize)
        .skip((page - 1) * pageSize)

    const totalAuthors = await AuthorSchema.countDocuments()
    const totalPages = Math.ceil(totalAuthors/pageSize)

    return {
        page: Number(page),
        pageSize: Number(pageSize),
        totalAuthors,
        totalPages,
        authors
    }
}

const getAuthor = async (id) => {
    return await AuthorSchema.findById(id)
}

const createAuthor = async (body) => {
    const newAuthor = new AuthorSchema(body)
    return await newAuthor.save()
}

const updateAuthor = async (id, body) => {
    return await AuthorSchema.findByIdAndUpdate(id, body, {returnDocument: 'after', runValidators: true})
}

const deleteAuthor = async (id) => {
    return await AuthorSchema.findByIdAndDelete(id)
}

module.exports = {
    getAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
}