const Property = require('./propertyModel')

class PropertyRepository {
    async create(data) {
        return await Property.create(data)
    }

    async readAll() {
        return await Property.findAll({
            order: [["name", "ASC"]],
        })
    }

    async update(data) {
        const {id, name, description} = data

        return await Property.update({
            name: name,
            description: description
        }, {
            where: {
                id: id
            }
        })
    }
    
    async delete(data) {
        const {id} = data
        await Property.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = new PropertyRepository()