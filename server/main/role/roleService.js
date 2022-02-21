const ApiError = require('../../helpers/ApiError')
const roleRepository = require('./roleRepository')

class RoleService {
    async create(data) {
        if (!data.name) {
            throw ApiError.badRequest("Wrong data (empty or invalid)")
        }

        try {
            const repositoryResult = await roleRepository.create(data)
            return repositoryResult
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }

    async readAll() {
        try {
            const repositoryResult = await roleRepository.readAll()
            return repositoryResult
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }
}

module.exports = new RoleService()