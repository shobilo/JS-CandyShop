const brandService = require('../services/brandService')

class BrandController {
    async create(req, res) {
        const data = req.body
        const serviceResult = await brandService.create(data, res)
        return serviceResult
    }

    async readAll(req, res) {
        const serviceResult = await brandService.readAll(res)
        return serviceResult
    }

    async update(req, res) {
        const data = req.body
        const serviceResult = await brandService.update(data, res)
        return serviceResult
    }

    async delete(req, res) {
        const data = req.body
        const serviceResult = await brandService.delete(data, res)
        return serviceResult
    }
}

module.exports = new BrandController()