const jwt = require('jsonwebtoken')
exports.generateToken = (userInfo) => {
    const payload = {
        id: userInfo?._id,
        email: userInfo?.email,
        role: userInfo?.role
    }
    // crypto.randomBytes(64).toString('hex')
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '10h'
    })
    return token;
}