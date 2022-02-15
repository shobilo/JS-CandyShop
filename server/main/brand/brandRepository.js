const {Brand} = require('../../models')

class BrandRepository {
    async create(data) {
        await Brand.create(data)
    }

    async readAll() {
        return await Brand.findAll()
    }

    async update(data) {
        const {id, name} = data

        await Brand.update({
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