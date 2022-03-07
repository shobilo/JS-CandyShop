const jwt = require('jsonwebtoken')
const ApiError = require('../helpers/ApiError')
const roleCheck = require('../helpers/roleCheck')

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] 

            if (!token) {
                next(ApiError.unauthorized("Token is not valid or empty"))
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

            const isRoleValid = roleCheck(decoded.roles, role)

            console.log(isRoleValid)

            if (!isRoleValid) {
                next(ApiError.forbiddenAccess("Forbidden access"))
                
            }

            req.user = decoded;

            next()
        } catch (e) {
            next(ApiError.unauthorized("You are unauthorized")) 
        }
    };
}
