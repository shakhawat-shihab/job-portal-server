const mongoose = require('mongoose')
const validator = require('validator')
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "Please provide a first name"],
        minLength: 3,
        maxLength: 100,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Please provide a last name"],
        minLength: 3,
        maxLength: 100,
    },

    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
        required: [true, "Please provide a email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        validate: {
            validator: (value) => {
                validator.isStrongPassword(value, {
                    minLength: 6,
                    // minLowerCase: 1,
                    // minUpperCase: 1,
                    // minNumber: 1,
                    // minSymbol: 1
                })
            },
            message: 'Password {VALUE} is not strong enough'
        }
    },

    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Passwords don't match!",
        },
    },
    role: {
        type: String,
        enum: ['admin', 'hiring-manager', 'candidate'],
        default: 'candidate'
    },
    company: {
        name: {
            type: String,
            lowercase: true,
            // required: true,
        },
        id: {
            type: ObjectId,
            ref: "company",
            // required: true,
        }
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a mobile number"]
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a url"]
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked'],
        default: 'inactive'
    },
    appliedJob: [{
        type: ObjectId,
        ref: "job"
    }],
    confirmationToken: String,
    confirmationTokenExpires: Date,

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
    timestamps: true
})


userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        //  only run if password is modified, otherwise it will change every time we save the user!
        return next();
    }
    const password = this.password;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
});

userSchema.methods.comparePassword = function (planePassword, hashPassword) {
    const isPasswordValid = bcrypt.compareSync(planePassword, hashPassword);
    return isPasswordValid
}

userSchema.methods.generateConfirmationToken = function () {
    const token = crypto.randomBytes(32).toString("hex");
    this.confirmationToken = token;
    const date = new Date();
    date.setDate(date.getDate() + 1);
    this.confirmationTokenExpires = date;
    return token;
};

const User = mongoose.model("user", userSchema);

module.exports = User;