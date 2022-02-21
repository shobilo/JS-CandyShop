const propertyService = require('./propertyService')

class PropertyController {
    async create(req, res, next) {
        try {
            const data = req.body
            const serviceResult = await propertyService.create(data)
            return res.status(201).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async readAll(req, res, next) {
        try {
            const serviceResult = await propertyService.readAll()
            return res.status(200).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async update(req, res, next) {
        try {
            const data = req.body
            const serviceResult = await propertyService.update(data)
            return res.status(201).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const data = req.body
            await propertyService.delete(data)
            return res.status(204)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new PropertyController()