const JWT = require('jsonwebtoken')
const ApiError = require('../helpers/ApiError')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            next(ApiError.unauthorized("Token is not valid or empty"))
        }
        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decoded

        next()
    } catch (error) {
        next(ApiError.unauthorized("You are unauthorized")) 
    }
}