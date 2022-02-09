const {Property} = require('../models/models')

class PropertyController {
    async create(req, res) {
        const {name} = req.body
        await Property.create({name})
        return res.status(201).json({message: "Added successfully"})
    }

    async readAll(req, res) {
        const properies = await Property.findAll()
        return res.json(properies)
    }

    async update(req, res) {
        
    }

    async delete(req, res) {
        
    }
}

module.exports = new PropertyController()