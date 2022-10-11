const mongoose = require('mongoose')
const validator = require('validator')
const { ObjectId } = mongoose.Schema.Types


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a category name"],
        lowercase: true,
        unique: true,
    },
    description: String,
    imageURL: {
        type: String,
        required: [true, "Please provide valid image"],
        validate: [validator.isURL, "Please provide a valid URL"]
    },
    jobs: [{
        type: ObjectId,
        ref: "job"
    }],
}, {
    timestamps: true
})

const Category = mongoose.model('category', categorySchema)
module.exports = Category;