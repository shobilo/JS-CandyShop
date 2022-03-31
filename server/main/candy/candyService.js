const ApiError = require('../../helpers/ApiError')
const candyRepository = require('./candyRepository')

class CandyService {
    async create(data) {
        if (!data.name || !data.price) {
            throw ApiError.badRequest("Wrong data (empty or invalid)")
        }

        if (data.image && !data?.image?.name?.endsWith('.png')) {
            console.log(data)
            throw ApiError.badRequest("Only png files are supported")
        }

        try {
            const properties = JSON.parse(data?.properties) || []
            const dataWithProperties = {
                ...data,
                properties: properties
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

            const repositoryObjects = repositoryResult.rows.map((row) => {
                const repositoryObject = row.get({ plain: true})

                const sumRating = repositoryObject.ratings.reduce((accum, currValue) => {
                    return accum + currValue.rating
                }, 0)

                const averageRating = sumRating / repositoryObject.ratings.length

                delete repositoryObject.ratings
                repositoryObject.averageRating = averageRating

                return repositoryObject
            })

            return {
                count: repositoryResult.count,
                rows: repositoryObjects
            }
            
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }

    async readById(data) {
        try {
            const {id} = data

            const repositoryResult = await candyRepository.readById(id)
            const repositoryObject = repositoryResult.get({ plain: true })

            const sumRating = repositoryResult.ratings.reduce((accum, currValue) => {
                return accum + currValue.rating
            }, 0)

            const averageRating = sumRating / repositoryObject.ratings.length

            delete repositoryObject.ratings
            repositoryObject.averageRating = averageRating

            return repositoryObject
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }

    async update(data) {
        if (!data.id) {
            throw ApiError.badRequest("Wrong id (empty or invalid)")
        }

        if (!data.name || !data.price) {
            throw ApiError.badRequest("Wrong data (empty or invalid)")
        }

        if (data.image && !data?.image?.name?.endsWith('.png')) {
            console.log(data.image)
            throw ApiError.badRequest("Only png files are supported")
        }

        try {
            const properties = JSON.parse(data?.properties) || []
            const dataWithProperties = {
                ...data,
                properties: properties
            }

            const repositoryResult = await candyRepository.update(dataWithProperties)
            
            return repositoryResult
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }

    async changeRating(data) {
        try {
            const changedCandyModel = await candyRepository.changeRating(data)

            const changedCandyObject = changedCandyModel.get({ plain: true })

            const sumRating = changedCandyModel.ratings.reduce((accum, currValue) => {
                return accum + currValue.rating
            }, 0)

            const averageRating = sumRating / changedCandyObject.ratings.length

            delete changedCandyObject.ratings
            changedCandyObject.averageRating = averageRating

            return changedCandyObject
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }

    async delete(data) {
        if (!data.id) {
            throw ApiError.badRequest("Wrong id (empty or invalid)")
        }

        try {
            const deletedRows = await candyRepository.delete(data)
            
            if (deletedRows === 0) {
                throw new Error(`No candy with such id: ${data.id}`)
            }

            return deletedRows
        } catch (error) {
            throw ApiError.internal(error.message)
        }
    }
}

module.exports = new CandyService()