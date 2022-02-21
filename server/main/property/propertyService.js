const ApiError = require('../../helpers/ApiError')
const propertyRepository = require('./propertyRepository')

class PropertyService {
    async create(data) {
        if (!data.name) {
            throw ApiError.badRequest("Wrong data (empty or invalid)")
        }

        try {
            const repositoryResult = await propertyRepository.create(data)
            return repositoryResult
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }

    async readAll() {
        try {
            const repositoryResult = await propertyRepository.readAll()
            return repositoryResult
        } catch (error) {
            throw ApiError.internal(error.message)
        }

    }

    async update(data) {
        if (!data.id) {
            throw ApiError.badRequest("Wrong id (empty or invalid)")
        }

        try {
            const repositoryResult = await propertyRepository.update(data)
            return repositoryResult
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }

    async delete(data) {
        if (!data.id) {
            throw ApiError.badRequest("Wrong id (empty or invalid)")
        }

        try {
            await propertyRepository.delete(data)
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }

}

module.exports = new PropertyService()