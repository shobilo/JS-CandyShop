const Type = require('./typeModel')

class TypeRepository {
    async create(data) {
        return await Type.create(data)
    }

    async readAll() {
        return await Type.findAll()
    }

    async update(data) {
        const {id, name} = data

        return await Type.update({
            name: name
        }, {
            where: {
                id: id
            }
        })
    }
    
    async delete(data) {
        const {id} = data
        await Type.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = new TypeRepository()