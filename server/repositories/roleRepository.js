const {Role} = require('../models/models')

class RoleRepository {
    async create(data) {
        await Role.create(data)
    }

    async readAll() {
        return await Role.findAll()
    }
}

module.exports = new RoleRepository()