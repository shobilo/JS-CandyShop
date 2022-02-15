const ApiError = require('../../helpers/ApiError')
const typeRepository = require('./typeRepository')

class TypeService {
    async create(data) {
        if (!data.name) {
            throw new ApiError.badRequest("Wrong data (empty or invalid)")
        }

        try {
            await typeRepository.create(data)
        } catch (error) {
            throw new ApiError.internal(error.message)
        }
    }

    async readAll() {
        try {
            const repositoryResult = await typeRepository.readAll()
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
            await typeRepository.update(data)
        } catch (error) {
            throw new ApiError.internal(error.message)
        }
    }

    async delete(data) {
        if (!data.id) {
            throw new ApiError.badRequest("Wrong id (empty or invalid)")
        }

        try {
            await typeRepository.delete(data)
        } catch (error) {
            throw new ApiError.internal(error.message)
        }
    }

}

module.exports = new TypeService()