const ApiError = require('../../helpers/ApiError')
const candyRepository = require('./candyRepository')

class CandyService {
    async create(data) {
        if (!data.name || !data.price) {
            throw ApiError.badRequest("Wrong data (empty or invalid)")
        }

        try {
            const properties = data.properties
            const objectProperties = properties.map(property => JSON.parse(property))
            data = {
                ...data,
                properties: objectProperties
            }
            await candyRepository.create(data)
        } catch (error) {
            throw ApiError.internal(error.message)
        }

    }
}

module.exports = new CandyService()