const ApiError = require('../../helpers/ApiError')
const brandRepository = require('./brandRepository')

class BrandService {
    async create(data) {
        if (!data.name) {
            throw new ApiError.badRequest("Wrong data (empty or invalid)")
        }

        try {
            await brandRepository.create(data)
        } catch (error) {
            throw new ApiError.internal(error.message)
        }

    }

    async readAll() {
        try {
            const repositoryResult = await brandRepository.readAll()
            return repositoryResult
        } catch (error) {
            throw new ApiError.internal(error.message)
        }

    }

    async update(data) {
        if (!data.id) {
            throw new ApiError.badRequest("Wrong id (empty or invalid)")
        }

        try {
            await brandRepository.update(data)
        } catch (error) {
            throw new ApiError.internal(error.message)
        }

    }

    async delete(data) {
        if (!data.id) {
            throw new ApiError.badRequest("Wrong id (empty or invalid)")
        }

        try {
            await brandRepository.delete(data)
        } catch (error) {
            throw new ApiError.internal(error.message)
        }

    }

}

module.exports = new BrandService()