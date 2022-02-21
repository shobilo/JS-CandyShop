const brandService = require('./brandService')

class BrandController {
    async create(req, res, next) {
        try {
            const data = req.body
            const serviceResult = await brandService.create(data)
            return res.status(201).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async readAll(req, res, next) {
        try {
            const serviceResult = await brandService.readAll()
            return res.status(200).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async update(req, res, next) {
        try {
            const data = req.body
            const serviceResult = await brandService.update(data)
            return res.status(201).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const data = req.body
            await brandService.delete(data)
            return res.status(204)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new BrandController()