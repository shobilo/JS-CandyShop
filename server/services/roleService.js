const roleRepository = require('../repositories/roleRepository')

class RoleService {
    async create(data) {
        await roleRepository.create(data)
    }

    async readAll() {
        const repositoryResult = await roleRepository.readAll()
        return repositoryResult
    }
}

module.exports = new RoleService()