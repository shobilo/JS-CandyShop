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
            
            await candyService.create(data)
            return res.status(201).json({message: "Added successfully"})
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
}

module.exports = new CandyController()