const ApiError = require('../../helpers/ApiError')
const candyRepository = require('./candyRepository')

class CandyService {
    async create(data) {
        if (!data.name || !data.price) {
            throw ApiError.badRequest("Wrong data (empty or invalid)")
        }

        if (!data.image.name.endsWith('.png')) {
            throw ApiError.badRequest("Only png files are supported")
        }

        try {
            const properties = data.properties
            const objectProperties = properties.map(property => JSON.parse(property))
            const dataWithProperties = {
                ...data,
                properties: objectProperties
            }
            const repositoryResult = await candyRepository.create(dataWithProperties)
            return repositoryResult
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }

    async readAll(allQueries) {
        try {
            const {query, typeId, brandId, sort = "name", order = "ASC", page = 1, limit = 6} = allQueries

            const offset = page * limit - limit

            const repositoryResult = await candyRepository.readAll({
                query, sort, order, typeId, brandId, limit, offset
            })

            return repositoryResult
            
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }

    async readById(data) {
        try {
            const {id} = data

            const repositoryResult = await candyRepository.readById(id)

            return repositoryResult
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }

    async changeRating(data) {
        try {
            const repositoryResult = await candyRepository.changeRating(data)

            return repositoryResult
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }
}

module.exports = new CandyService()