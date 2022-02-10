const ApiError = require('../helpers/ApiError')
const propertyService = require('../services/propertyService')

class PropertyController {
    async create(req, res) {
        try {
            const data = req.body
            await propertyService.create(data)
            return res.status(201).json({message: "Added successfully"})
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }

    async readAll(req, res) {
        try {
            const serviceResult = await propertyService.readAll()
            return res.json(serviceResult)
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }

    async update(req, res) {
        try {
            const data = req.body
            await propertyService.update(data)
            return res.status(204).json({message: "Updated successfully"})
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }

    async delete(req, res) {
        try {
            const data = req.body
            await propertyService.delete(data)
            return res.status(204).json({message: "Deleted successfully"})
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }
}

module.exports = new PropertyController()