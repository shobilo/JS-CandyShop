const brandService = require('../services/brandService')

class BrandController {
    async create(req, res) {
        const data = req.body
        return await brandService.create(data, res)
    }

    async readAll(req, res) {
        return await brandService.readAll(res)
    }

    async update(req, res) {
        const data = req.body
        return await brandService.update(data, res)
    }

    async delete(req, res) {
        const data = req.body
        return await brandService.delete(data, res)
    }
}

module.exports = new BrandController()