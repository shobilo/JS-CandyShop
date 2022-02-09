const ApiError = require('../helpers/ApiError')
const brandRepository = require('../repositories/brandRepository')

class BrandService {
    async create(data, res) {
        try {
            await brandRepository.create(data)
            return res.status(201).json({message: "Added successfully"})
        } catch(error) {
            return next(ApiError.badRequest(error))
        }
    }

    async readAll(res) {
        try {
            return await brandRepository.readAll()
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }

    async update(data, res) {
        try {
            await brandRepository.update(data)
            return res.status(201).json({message: "Updated successfully"})
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }

    async delete(data, res) {
        try {
            await brandRepository.delete(data)
            return res.status(200).json({message: "Deleted successfully"})
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }

}

module.exports = new BrandService()