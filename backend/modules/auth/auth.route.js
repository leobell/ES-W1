const express = require('express')
const auth = express.Router()
const authController = require('./auth.controller')
const { verifyToken } = require('../../middlewares/auth/verifyToken')

auth.post('/login', authController.login)
auth.get('/me', verifyToken, authController.getMe)

module.exports = auth