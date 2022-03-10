const Brand = require('./brandModel')

class BrandRepository {
    async create(data) {
        return await Brand.create(data)
    }

    async readAll() {
        return await Brand.findAll({
            order: [["name", "ASC"]],
        })
    }

    async update(data) {
        const {id, name} = data

        return await Brand.update({
            name: name
        }, {
            where: {
                id: id
            }
        })
    }
    
    async delete(data) {
        const {id} = data
        await Brand.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = new BrandRepository()