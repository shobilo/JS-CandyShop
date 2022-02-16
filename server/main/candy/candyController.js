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
        
    }

    async readById(req, res, next) {
        
    }
}

module.exports = new CandyController()