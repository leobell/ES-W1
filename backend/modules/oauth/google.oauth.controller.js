const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authGoogle = async (req, res, next) => {
    try {
        const user = encodeURIComponent(JSON.stringify(req.user))
        const redirectUrl = `${process.env.FRONTEND_URL}/oauth/success?user=${user}`

        res.redirect(redirectUrl)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const manageOauthCallback = async (req, res, next) => {
    try {
        const user = req.user

        const token = jwt.sign(user, process.env.JWT_SECRET)
        const redirectUrl = `${process.env.FRONTEND_URL}/auth/success?token=${token}`
        res.redirect(redirectUrl)
    } catch(e) {
        console.error(e)
        next(e)
    }
}

module.exports = {
    authGoogle,
    manageOauthCallback
}