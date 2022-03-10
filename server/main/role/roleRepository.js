const {Role} = require('../../models')

class RoleRepository {
    async create(data) {
        return await Role.create(data)
    }

    async readAll() {
        return await Role.findAll({
            order: [["name", "ASC"]],
        })
    }
}

module.exports = new RoleRepository()