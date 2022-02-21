const {validationResult} = require('express-validator');
const userService = require('./userService')
const ApiError = require('../../helpers/ApiError')

class UserController {
    async registration(req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return next(ApiError.badRequest('Validation errors', errors.array()))
        }

        try {
            const {email, password, name} = req.body
            const serviceResult = await userService.registration({email, password, name})

            return res.json({token: serviceResult})
        } catch (error) {
            return next(error)
        }
    }

    async login(req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return next(ApiError.badRequest('Validation errors', errors.array()))
        }

        try {
            const {email, password} = req.body
            const serviceResult = await userService.login({email, password})

            return res.json({token: serviceResult})
        } catch (error) {
            return next(error)
        }
    }

    async auth(req, res, next) {
        try {
            const {email} = req.user
            const serviceResult = await userService.auth({email})

            return res.json({token: serviceResult})
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new UserController()