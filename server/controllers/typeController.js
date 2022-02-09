const {Type} = require('../models/models')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        await Type.create({name})
        return res.status(201).json({message: "Added successfully"})
    }

    async readAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async update(req, res) {
        
    }

    async delete(req, res) {
        
    }
}

module.exports = new TypeController()