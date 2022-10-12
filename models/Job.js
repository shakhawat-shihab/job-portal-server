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
    responsibilities: [{
        type: String,
        required: true,
    }],
    company: {
        name: {
            type: String,
            lowercase: true,
            required: true,
        },

        id: {
            type: ObjectId,
            ref: "company",
            required: true,
        }
    },
    // application: [{
    //     // name: String,
    //     // candidateId: {
    //     //     type: ObjectId,
    //     //     ref: "User",
    //     //     required: true,
    //     // },
    //     applicationId: {
    //         type: ObjectId,
    //         ref: "Application",
    //         required: true,
    //     }
    // }],
    // candidate: [{
    //     candidateId: {
    //         type: String,
    //         ref: "user",
    //         required: true,
    //     },
    // }],
    application: [{
        type: ObjectId,
        ref: "application"
    }],
    candidate: [{
        type: ObjectId,
        ref: "user"
    }],

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
            values: ["online", "onsite"],
            message: "{VALUE} is not a valid division"
        }
    },
    skillsNedded: [{
        type: String,
        required: true,
    }],
    hiringManager: {
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
            ref: "user",
            required: true,
        }
    },
    salary: {
        type: Number,
        required: true
    },
    experience: String,
    vacancy: {
        type: Number,
        default: 1
    },
    deadLine: {
        type: Date,
        required: true
    },
    applyCount: {
        type: Number,
        default: 0
    },


}, {
    timestamps: true,
})


jobSchema.pre('save', function (next) {
    //this -> 
    console.log(' Before saving data');

    next()
})


const Job = mongoose.model('job', jobSchema)

module.exports = Job;