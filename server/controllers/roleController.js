const {Role} = require('../models/models')

class RoleController {
    async create(req, res) {
        const {name} = req.body
        await Role.create({name})
        return res.status(201).json({message: "Added successfully"})
    }

    async readAll(req, res) {
        const roles = await Role.findAll()
        return res.json(roles)
    }
}

module.exports = new RoleController()