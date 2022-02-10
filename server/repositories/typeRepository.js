const {Type} = require('../models/models')

class TypeRepository {
    async create(data) {
        await Type.create(data)
    }

    async readAll() {
        return await Type.findAll()
    }

    async update(data) {
        const {typeId, typeName} = data

        await Type.update({
            name: typeName
        }, {
            where: {
                id: typeId
            }
        })
    }
    
    async delete(data) {
        const {typeId} = data
        Type.destroy({
            where: {
                id: typeId
            }
        })
    }
}

module.exports = new TypeRepository()