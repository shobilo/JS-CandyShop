const {Role} = require('../../models')

class RoleRepository {
    async create(data) {
        return await Role.create(data)
    }

    async readAll() {
        return await Role.findAll()
    }
}

module.exports = new RoleRepository()