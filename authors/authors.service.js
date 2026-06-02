const AuthorSchema = require('./authors.schema')

const getAuthors = async () => {
    const authors = [
        { name:'mario', surname:'rossi', email:'mario.rossi@gmail.com', birthDate:'25-12-2000', avatar:'non saprei' },
        { name:'mirco', surname:'verdi', email:'mirco.verdi@gmail.com', birthDate:'23-03-2004', avatar:'ah boh' },
        { name:'marta', surname:'girardini', email:'marta.girardini@gmail.com', birthDate:'19-11-2002', avatar:'emmm' }
    ]

    return authors
}

const createAuthor = async (body) => {
    return {
        name: body.name,
        surname:body.surname,
        email:body.email,
        birthDate:body.birthDate,
        avatar: body.avatar
    }
}

module.exports = {
    getAuthors,
    createAuthor
}