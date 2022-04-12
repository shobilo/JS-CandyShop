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
            const data = req.body
            const serviceResult = await userService.registration(data)

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
    
    async readUserOrders(req, res, next) {
        try {
            const userData = req.user
            const serviceResult = await userService.readUserOrders(userData)
    
            return res.status(200).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }
    
    async readOrderById(req, res, next) {
        try {
            const orderData = req.params
            const serviceResult = await userService.readOrderById(orderData)
            
            return res.status(200).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new UserController()