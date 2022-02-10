const {Property} = require('../models/models')

class PropertyRepository {
    async create(data) {
        await Property.create(data)
    }

    async readAll() {
        return await Property.findAll()
    }

    async update(data) {
        const {propertyId, propertyName, propertyDescription} = data

        await Property.update({
            name: propertyName,
            description: propertyDescription
        }, {
            where: {
                id: propertyId
            }
        })
    }
    
    async delete(data) {
        const {propertyId} = data
        Property.destroy({
            where: {
                id: propertyId
            }
        })
    }
}

module.exports = new PropertyRepository()