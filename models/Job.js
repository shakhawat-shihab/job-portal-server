const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

// schema design
const jobSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this job."],
        trim: true,
        lowercase: true,
        minLength: [5, "Name must be at least 5 characters."],
        maxLenght: [150, "Name is too large"],
    },
    description: {
        type: String,
        required: true
    },
    company: {
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
            ref: "Company",
            required: true,
        }
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        enum: {
            values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur", "mymensingh"],
            message: "{VALUE} is not a valid division"
        }
    },
    weeklyVacation: Number,
    weeklyOfficeTime: Number,
    workPlace: {
        type: String,
        default: "offline",
        enum: {
            values: ["online", "offline"],
            message: "{VALUE} is not a valid division"
        }
    },
    skillsNedded: [{
        type: String,
        required: true,
    }],
    HiringManager: {
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
    salary: {
        type: Number,
        required: true
    },
    vecancy: {
        type: Number,
        default: 1
    },
    deadLine: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
})


jobSchema.pre('save', function (next) {
    //this -> 
    console.log(' Before saving data');

    next()
})


const Jobs = mongoose.model('jobs', jobSchema)

module.exports = Jobs;