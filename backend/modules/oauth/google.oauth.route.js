const express = require('express')
const oauth = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const session = require('express-session')
const googleController = require('./google.oauth.controller')

oauth.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false
}))

oauth.use(passport.initialize())
oauth.use(passport.session())

passport.serializeUser(( user, done ) => {
    done(null, user)
})

passport.deserializeUser(( user, done ) => {
    done(null, user)
})

passport.use( new GoogleStrategy({
    clientID: process.env.GOOGLE_ID_CLIENT,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    console.log('PROFILE:', profile)
    done(null, profile)
}))

oauth.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }), googleController.authGoogle)

oauth.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleController.manageOauthCallback)

module.exports = oauth