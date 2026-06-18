const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const cloudStorageAuthors = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder:'epibooks-authors',
        format: async (req, file) => 'jpg',
        public_id: (req, file) => file.name
    }
})

const cloudStoragePosts = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder:'epibooks-posts',
        format: async (req, file) => 'jpg',
        public_id: (req, file) => file.name
    }
})

const internalStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9)
        const fileExtention = file.originalname.split('.').pop()
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtention}`)
    }
})

const upload = multer({storage: internalStorage})
const cloudAuthors = multer({storage: cloudStorageAuthors})
const cloudPosts = multer({storage: cloudStoragePosts})


module.exports = {
    upload,
    cloudAuthors,
    cloudPosts
}