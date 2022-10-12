
// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
    secure: true,
    CLOUDINARY_URL: 'cloudinary://415964942699487:VxnVSrS-zp134L19Ne0fyRgwKIQ@dhzfbcypm'
});

// Log the configuration
console.log(cloudinary.config());