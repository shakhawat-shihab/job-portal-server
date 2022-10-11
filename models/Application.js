const mongoose = require('mongoose')
const validator = require('validator')
const { ObjectId } = mongoose.Schema.Types


const applicationSchema = mongoose.Schema({
    user: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "User",
            required: true,
        }
    },
    job: {
        name: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "job",
            required: true,
        }
    },
    company: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "company",
            required: true,
        }
    },


}, {
    timestamps: true
})

const Application = mongoose.model('Application', applicationSchema)
module.exports = Application;