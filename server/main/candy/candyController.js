const candyService = require("./candyService")

class CandyController {
    async create(req, res, next) {
        try {
            let data = req.body

            if (req.files) {
                const {image} = req.files

                data = {
                    ...data,
                    imageName: image.name,
                    imageData: image.data
                }
            }
            
            const serviceResult = await candyService.create(data)
            return res.status(201).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async readAll(req, res, next) {
        try {
            const queries = req.query
            const serviceResult = await candyService.readAll(queries)
            return res.status(200).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async readById(req, res, next) {
        try {
            const data = req.params
            const serviceResult = await candyService.readById(data)
            return res.status(200).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async update(req, res, next) {
        try {
            let data = req.body

            if (req.files) {
                const {image} = req.files

                data = {
                    ...data,
                    imageName: image.name,
                    imageData: image.data
                }
            }
            
            const serviceResult = await candyService.update(data)
            return res.status(201).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async changeRating(req, res, next) {
        try {
            const { id: candyId } = req.params
            const { id: userId} = req.user
            const { rating } = req.body

            const data = {
                candyId,
                userId,
                rating
            }
            
            const serviceResult = await candyService.changeRating(data)
            return res.status(200).json(serviceResult)
        } catch (error) {
            return next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const data = req.params
            const deletedRows = await candyService.delete(data)
            return res.status(204).json(deletedRows)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new CandyController()