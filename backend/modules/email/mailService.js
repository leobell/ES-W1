const sgMail = require('@sendgrid/mail')
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = async (mailUser, userName) => {
    const msg = {
        to:'bellleonardo06@gmail.com',
        from:'dev.leobell@gmail.com',
        subject: 'Welcome to Epibooks',
        text: `Hi ${userName}, thank you for being part of our community!! Enjoy your books`,
        html: `<strong>Hi ${userName}</strong>,<br>thank you for being part of our community🚀!! Enjoy your books!`
    }

    try {
        await sgMail.send(msg)
        console.log(`mail sent successfully to ${mailUser}!!`)
    } catch (error) {
        console.log(`Something went wrong: ${error}`)
        throw error
    }
}

const sendNewPostEmail = async (mailUser, userName) => {
    const msg = {
        to:'bellleonardo06@gmail.com',
        from:'dev.leobell@gmail.com',
        subject: 'Nice Post!!',
        text: `Hi ${userName}, thank you for sharing your post in our website`,
        html: `<strong>Hi ${userName}</strong>,<br>thank you for sharing your post in our website🚀!!`
    }

    try {
        await sgMail.send(msg)
        console.log(`mail sent successfully to ${mailUser}!!`)
    } catch (error) {
        console.log(`Something went wrong: ${error}`)
        throw error
    }
}

module.exports = {
    sendWelcomeEmail,
    sendNewPostEmail
}