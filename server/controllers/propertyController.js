const propertyService = require("../services/propertyService")

class PropertyController {
    async create(req, res) {
        const data = req.body
        const serviceResult = await propertyService.create(data, res)
        return serviceResult
    }

    async readAll(req, res) {
        const serviceResult = await propertyService.readAll(res)
        return serviceResult
    }

    async update(req, res) {
        const data = req.body
        const serviceResult = await propertyService.update(data, res)
        return serviceResult
    }

    async delete(req, res) {
        const data = req.body
        const serviceResult = await propertyService.delete(data, res)
        return serviceResult
    }
}

module.exports = new PropertyController()