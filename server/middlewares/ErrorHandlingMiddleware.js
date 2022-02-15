const ApiError = require('../helpers/ApiError')

module.exports = function (error, req, res, next) {
    if (error instanceof ApiError) {
        return res.status(err.status).json({
            message: error.message
        })
    }

    return res.status(500).json({
        message: error.message
    })
}