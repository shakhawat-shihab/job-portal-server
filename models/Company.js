const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const companySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a company name"],
        maxLength: 100,
        lowercase: true,
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a mobile number"]
    },
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"]
    },
    address: {
        type: String,
        required: true,
        enum: {
            values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur", "mymensingh"],
            message: "{VALUE} is not a valid division"
        }
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a url"]
    },
    hiringManagers: [{
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
    }],
    jobs: [{
        type: ObjectId,
        ref: "Job"
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }

}, {
    timestamps: true
});

const Company = mongoose.model("company", companySchema);

module.exports = Company;