const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
    destination: "files/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const supportedFile = /pdf/
        const extension = path.extname(file.originalname);
        if (supportedFile.test(extension)) {
            // console.log('file ext correct ')
            cb(null, true)
        }
        else {
            // console.log('file ext not correct ')
            cb(new Error('Must be a pdf file.'))
        }
    },
    limits: {
        fileSize: 5000000
    }
})

exports.handleUpload = async (req, res, next) => {
    try {
        const upload = uploader.single('resume');
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                console.log('multer error = ', err.message)
                res.status(400).json({
                    status: "fail",
                    message: "can't upload, multer error occured",
                    error: err.message,
                });
            } else if (err) {
                // An unknown error occurred when uploading.
                console.log('non multer error = ', err.message)
                res.status(400).json({
                    status: "fail",
                    message: "can't upload",
                    error: err.message,
                });
            }
            next()
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't upload",
            error: error.message,
        });
    }
}



