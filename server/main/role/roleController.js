const roleService = require("./roleService")

class RoleController {
    async create(req, res) {
        try {
            const data = req.body
            await roleService.create(data)
            return res.status(201).json({message: "Added successfully"})
        } catch (error) {
            return next(error)
        }
    }

    async readAll(req, res) {
        try {
            const serviceResult = await roleService.readAll()
            return res.status(200).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new RoleController()