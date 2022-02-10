const roleService = require("../services/roleService")

class RoleController {
    async create(req, res) {
        const data = req.body
        const serviceResult = await roleService.create(data, res)
        return serviceResult
    }

    async readAll(req, res) {
        const serviceResult = await roleService.readAll(res)
        return serviceResult
    }
}

module.exports = new RoleController()