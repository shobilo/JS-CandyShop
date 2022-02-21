const roleService = require("./roleService")

class RoleController {
    async create(req, res, next) {
        try {
            const data = req.body
            const serviceResult = await roleService.create(data)
            return res.status(201).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async readAll(req, res, next) {
        try {
            const serviceResult = await roleService.readAll()
            return res.status(200).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new RoleController()