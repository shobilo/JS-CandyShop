const typeService = require('./typeService')

class TypeController {
    async create(req, res, next) {
        try {
            const data = req.body
            const serviceResult = await typeService.create(data)
            return res.status(201).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async readAll(req, res, next) {
        try {
            const serviceResult = await typeService.readAll()
            return res.status(200).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async update(req, res, next) {
        try {
            const data = req.body
            const serviceResult = await typeService.update(data)
            return res.status(201).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const data = req.body
            await typeService.delete(data)
            return res.status(204)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new TypeController()