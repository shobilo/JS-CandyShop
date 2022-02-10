const ApiError = require('../helpers/ApiError')
const typeService = require('../services/typeService')

class TypeController {
    async create(req, res) {
        try {
            const data = req.body
            await typeService.create(data)
            return res.status(201).json({message: "Added successfully"})
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }

    async readAll(req, res) {
        try {
            const serviceResult = await typeService.readAll()
            return res.json(serviceResult)
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }

    async update(req, res) {
        try {
            const data = req.body
            await typeService.update(data)
            return res.status(204).json({message: "Updated successfully"})
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }

    async delete(req, res) {
        try {
            const data = req.body
            await typeService.delete(data)
            return res.status(204).json({message: "Deleted successfully"})
        } catch (error) {
            return next(ApiError.internal(error))
        }
    }
}

module.exports = new TypeController()