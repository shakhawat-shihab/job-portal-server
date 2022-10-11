const User = require("../models/User");

exports.getUserService = async () => {
    const users = await User.find({});
    return users;
}
exports.signUpService = async (user) => {
    //console.log(user)
    const result = await User.create(user);
    return result;
}
exports.logInService = async (logInInfo) => {
    console.log(logInInfo)
    // const result = await User.create(user);
    // return result;
}

exports.findUserByEmailService = async (email) => {
    const user = await User.findOne({ email })
    return user;
}
exports.findUserByEmailExceptPasswordService = async (email) => {
    const user = await User.findOne({ email })
        .select('-password');
    return user;
}

exports.findUserByToken = async (token) => {
    return await User.findOne({ confirmationToken: token });
};