const { getUserService, signUpService, logInService, findUserByEmailService, findUserByToken } = require("../services/user.service");
const User = require("../models/User");
const { generateToken } = require("../utils/token");
// const { sendMailWithGmail } = require("../utils/email");

exports.getUser = async (req, res, next) => {
    try {
        const users = await getUserService()
        res.status(200).json({
            status: "success",
            messgae: "Data loaded successfully!",
            data: users,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " Data failed to load ",
            error: error.message,
        });
    }
}


exports.signUp = async (req, res, next) => {
    try {


        const user = await signUpService(req.body);
        const token = user.generateConfirmationToken();
        await user.save({ validateBeforeSave: false });

        // const mailData = {
        //     to: [user.email],
        //     subject: "Verify your Account",
        //     text: `Thank you for creating your account. Please confirm your account here: ${req.protocol
        //         }://${req.get("host")}${req.originalUrl}/confirmation/${token}`,

        // };
        // // await sendMailWithMailGun(mailData);
        // await sendMailWithGmail(mailData)

        res.status(200).json({
            status: "success",
            message: "Successfully signed up",
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Failed to sign up!! ",
            error: error.message,
        });
    }
}



/**
    1. check if email and password is given
    2. load user by email
    3. if no user found then wrong email, then send response
    4. compare password
    5. if password mismatched then wrong password, then send response
    6. check if the user status is not active, then send response
    7. generate token 
    8. send user and token
 */

exports.logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //1
        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                error: "Enter email and password",
            });
        }
        //2
        const user = await findUserByEmailService(email);
        //3
        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "No User with this email",
            });
        }
        //4
        const checkPassword = user.comparePassword(password, user?.password)
        //5
        if (!checkPassword) {
            return res.status(403).json({
                status: "fail",
                error: "Wrong password inserted",
            });
        }
        //6
        if (user?.status !== 'active') {
            return res.status(401).json({
                status: "fail",
                error: "Your account is not active yet.",
            });
        }
        //7
        const token = generateToken(user);
        //8
        const { password: pws, ...other } = user.toObject();
        res.status(200).json({
            status: "success",
            message: "Successfully logged in",
            data: {
                other,
                token
            }
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Failed to log in",
            error: error.message,
        });
    }
}

exports.getMe = async (req, res, next) => {
    try {
        const { user } = req;
        const userAllInfo = await findUserByEmailService(user?.email);
        res.status(200).json({
            status: "success",
            message: "Successfully logged in",
            data: userAllInfo
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Failed to log in",
            error: error.message,
        });
    }
}


exports.confirmEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await findUserByToken(token);

        if (!user) {
            return res.status(403).json({
                status: "fail",
                error: "Invalid token"
            });
        }

        const expired = new Date() > new Date(user.confirmationTokenExpires);
        if (expired) {
            return res.status(401).json({
                status: "fail",
                error: "Token expired"
            });
        }
        user.status = "active";
        user.confirmationToken = undefined;
        user.confirmationTokenExpires = undefined;
        user.save({ validateBeforeSave: false });

        res.status(200).json({
            status: "success",
            message: "Successfully activated your account.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            error,
        });
    }
};