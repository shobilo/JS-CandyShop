const ApiError = require('../helpers/ApiError')
const typeRepository = require('../repositories/typeRepository')

class TypeService {
    async create(data, res) {
        try {
            await typeRepository.create(data)
            return res.status(201).json({message: "Added successfully"})
        } catch(error) {
            return next(ApiError.badRequest(error))
        }
    }

    async readAll(res) {
        try {
            return await typeRepository.readAll()
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }

    async update(data, res) {
        try {
            await typeRepository.update(data)
            return res.status(201).json({message: "Updated successfully"})
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }

    async delete(data, res) {
        try {
            await typeRepository.delete(data)
            return res.status(200).json({message: "Deleted successfully"})
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }

}

module.exports = new TypeService()