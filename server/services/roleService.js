const ApiError = require('../helpers/ApiError')
const roleRepository = require('../repositories/roleRepository')

class RoleService {
    async create(data, res) {
        try {
            await roleRepository.create(data)
            return res.status(201).json({message: "Added successfully"})
        } catch(error) {
            return next(ApiError.badRequest(error))
        }
    }

    async readAll(res) {
        try {
            return await roleRepository.readAll()
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }
}

module.exports = new RoleService()