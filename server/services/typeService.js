const typeRepository = require('../repositories/typeRepository')

class TypeService {
    async create(data) {
        await typeRepository.create(data)
    }

    async readAll() {
        const repositoryResult = await typeRepository.readAll()
        return repositoryResult
    }

    async update(data) {
        await typeRepository.update(data)
    }

    async delete(data) {
        await typeRepository.delete(data)
    }

}

module.exports = new TypeService()