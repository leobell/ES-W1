const express = require('express')
const startServer = require('./config/db')
const dns = require('node:dns')
dns.setServers(['1.1.1.1', '1.0.0.1']) 
const PORT = 9874

const authorsRoute = require('./modules/authors/authors.route')
const blogRoute = require('./modules/blog/blog.route')
const server = express()
server.use(express.json())

server.use('/', authorsRoute)
server.use('/', blogRoute)

startServer(PORT, server)