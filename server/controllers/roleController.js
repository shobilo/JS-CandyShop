const ApiError = require('../helpers/ApiError')
const roleService = require("../services/roleService")

class RoleController {
    async create(req, res) {
        try {
            const data = req.body
            await roleService.create(data)
            return res.status(201).json({message: "Added successfully"})
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }

    async readAll(req, res) {
        try {
            const serviceResult = await roleService.readAll()
            return res.json(serviceResult)
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }
}

module.exports = new RoleController()