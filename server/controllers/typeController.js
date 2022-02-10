const typeService = require('../services/typeService')

class TypeController {
    async create(req, res) {
        const data = req.body
        const serviceResult = await typeService.create(data, res)
        return serviceResult
    }

    async readAll(req, res) {
        const serviceResult = await typeService.readAll(res)
        return serviceResult
    }

    async update(req, res) {
        const data = req.body
        const serviceResult = await typeService.update(data, res)
        return serviceResult
    }

    async delete(req, res) {
        const data = req.body
        const serviceResult = await typeService.delete(data, res)
        return serviceResult
    }
}

module.exports = new TypeController()