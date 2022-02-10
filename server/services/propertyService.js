const propertyRepository = require('../repositories/propertyRepository')

class PropertyService {
    async create(data) {
        await propertyRepository.create(data)
    }

    async readAll() {
        const repositoryResult = await propertyRepository.readAll()
        return repositoryResult
    }

    async update(data) {
        await propertyRepository.update(data)
    }

    async delete(data) {
        await propertyRepository.delete(data)
    }

}

module.exports = new PropertyService()