const express = require('express')
const cors = require('cors')
const path = require('path')
const startServer = require('./config/db')
const dns = require('node:dns')
dns.setServers(['1.1.1.1', '1.0.0.1']) 
const PORT = 9874

//middlewares
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/errors/errorHandler')


//routes
const authorsRoute = require('./modules/authors/authors.route')
const blogRoute = require('./modules/blog/blog.route')
const commentsRoute = require('./modules/comments/comments.route')
const authRoute = require('./modules/auth/auth.route')
const oauthGoogleRoute = require('./modules/oauth/google.oauth.route')

const server = express()
server.use(express.json())
server.use(logger)

server.use(cors())
server.use('/upload',express.static(path.join(__dirname, 'upload')))

server.use('/', authorsRoute)
server.use('/', blogRoute)
server.use('/', commentsRoute)
server.use('/', authRoute)
server.use('/', oauthGoogleRoute)

server.use(errorHandler)

startServer(PORT, server)