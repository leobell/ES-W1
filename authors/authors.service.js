const AuthorSchema = require('./authors.schema')

const getAuthors = async () => {
    return await AuthorSchema.find()
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