const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadResume = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'edukeeda/resumes',
      allowed_formats: ['pdf', 'doc', 'docx'],
      resource_type: 'raw' // For PDF and Docs
    },
  }),
});

const uploadImage = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'edukeeda/images',
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
  }),
});

module.exports = { cloudinary, uploadResume, uploadImage };
