const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const validator = require('validator')



const applicationSchema = mongoose.Schema({
    user: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            // required: true,
        },
        id: {
            type: ObjectId,
            ref: "user",
            required: true,
        }
    },
    job: {
        // name: {
        //     type: String,
        //     required: true,
        // },
        // salary: {
        //     type: Number,
        //     required: true,
        // },
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

const Application = mongoose.model('application', applicationSchema)
module.exports = Application;