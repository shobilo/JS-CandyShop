const brandRepository = require('../repositories/brandRepository')

class BrandService {
    async create(data) {
        await brandRepository.create(data)
    }

    async readAll() {
        const repositoryResult = await brandRepository.readAll()
        return repositoryResult
    }

    async update(data) {
        await brandRepository.update(data)
    }

    async delete(data) {
        await brandRepository.delete(data)
    }

}

module.exports = new BrandService()