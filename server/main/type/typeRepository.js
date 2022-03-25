const Type = require('./typeModel')

class TypeRepository {
    async create(data) {
        return await Type.create(data)
    }

    async readAll() {
        return await Type.findAll({
            order: [["name", "ASC"]],
        })
    }

    async update(data) {
        const {id, name} = data

        const [count, rows] = await Type.update({
            name: name
        }, {
            where: {
                id: id
            },
            returning: true
        })

        const updatedType = rows[0]

        return updatedType
    }
    
    async delete(data) {
        const {id} = data

        return await Type.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = new TypeRepository()