const mongoose = require('mongoose')
const databaseConnectionString = 'mongodb+srv://leoUser:nJAjpHaCBtBxb0FJ@epibooks.4khuqcy.mongodb.net/'

const initDb = async () => {
    try {
        await mongoose.connect(databaseConnectionString)
        console.log('databasa connected succesfully')
    } catch (error) {
        console.log('Db not connected', error.message)
        process.exit(1)
    }
}

const startServer = async (port, server) => {
    await initDb()
    server.listen(port, () => {
        console.log(`Server up and running on ${port}`)
    })

}

module.exports = startServer