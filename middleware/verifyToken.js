const jwt = require("jsonwebtoken");
const { promisify } = require('util');
/*
    1. check if token exist
    2. if not token not exist, then send response
    3. decode token
    4. if valid token, then go to next
*/

module.exports = async (req, res, next) => {
    try {
        //1
        const token = req.headers?.authorization?.split(' ')[1];

        //2
        if (!token) {
            return res.status(401).json({
                status: "fail",
                error: "You are not logged in.",
            });
        }

        //3
        const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET)
        // we can load user here by email address....

        //4
        req.user = decoded
        //console.log(req.user)

        next()

    } catch (error) {
        return res.status(403).json({
            status: "fail",
            message: "invalid token",
        });

    }
}