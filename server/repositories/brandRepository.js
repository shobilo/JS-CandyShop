const {Brand} = require('../models/models')

class BrandRepository {
    async create(data) {
        await Brand.create(data)
    }

    async readAll() {
        return await Brand.findAll()
    }

    async update(data) {
        const {brandId, brandName} = data

        await Brand.update({
            name: brandName
        }, {
            where: {
                id: brandId
            }
        })
    }
    
    async delete(data) {
        const {brandId} = data
        Brand.destroy({
            where: {
                id: brandId
            }
        })
    }
}

module.exports = new BrandRepository()