const ApiError = require('../helpers/ApiError')
const propertyRepository = require('../repositories/propertyRepository')

class PropertyService {
    async create(data, res) {
        try {
            await propertyRepository.create(data)
            return res.status(201).json({message: "Added successfully"})
        } catch(error) {
            return next(ApiError.badRequest(error))
        }
    }

    async readAll(res) {
        try {
            return await propertyRepository.readAll()
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }

    async update(data, res) {
        try {
            await propertyRepository.update(data)
            return res.status(201).json({message: "Updated successfully"})
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }

    async delete(data, res) {
        try {
            await propertyRepository.delete(data)
            return res.status(200).json({message: "Deleted successfully"})
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }

}

module.exports = new PropertyService()