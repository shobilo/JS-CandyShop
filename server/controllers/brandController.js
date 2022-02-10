const ApiError = require('../helpers/ApiError')
const brandService = require('../services/brandService')

class BrandController {
    async create(req, res) {
        try {
            const data = req.body
            await brandService.create(data)
            return res.status(201).json({message: "Added successfully"})
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }

    async readAll(req, res) {
        try {
            const serviceResult = await brandService.readAll()
            return res.json(serviceResult)
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }

    async update(req, res) {
        try {
            const data = req.body
            await brandService.update(data)
            return res.status(204).json({message: "Updated successfully"})
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }

    async delete(req, res) {
        try {
            const data = req.body
            await brandService.delete(data)
            return res.status(204).json({message: "Deleted successfully"})
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }
}

module.exports = new BrandController()