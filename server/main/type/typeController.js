const typeService = require('./typeService')

class TypeController {
    async create(req, res) {
        try {
            const data = req.body
            await typeService.create(data)
            return res.status(201).json({message: "Added successfully"})
        } catch (error) {
            return next(error)
        }
    }

    async readAll(req, res) {
        try {
            const serviceResult = await typeService.readAll()
            return res.status(200).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async update(req, res) {
        try {
            const data = req.body
            await typeService.update(data)
            return res.status(204)
        } catch (error) {
            return next(error)
        }
    }

    async delete(req, res) {
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