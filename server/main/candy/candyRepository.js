const {Op} = require("sequelize")

const Candy = require("./candyModel")
const Property = require("../property/propertyModel")
const Brand = require("../brand/brandModel")
const Type = require("../type/typeModel")
const Rating = require("../../models/intermediateModels/ratingModel")

class CandyRepository {
    async create(data) {
        const {name, price, brandId, typeId, imageName, imageData, properties} = data
        
        const candy = await Candy.create({
            name,
            price,
            brandId,
            typeId,
            imageName,
            imageData
        })

        properties?.forEach(async (property) => {
            const [ dbProperty ] = await Property.findOrCreate({
                where: {
                    name: property.name,
                    description: property.description
                }
            })
            await candy.addProperty(dbProperty)
        })

        return candy
    }

    async readAll(data) {
        const {query, sort, order, typeId, brandId, limit, offset} = data

        const repositoryResult = await Candy.findAndCountAll({
            where: {
                ...(brandId && {brandId}),
                ...(typeId && {typeId}),
                ...(query && {name : {[Op.substring] : query}})
            },
            attributes: {exclude: ["brandId", "typeId"]},
            limit: limit,
            offset: offset,
            order: [[sort, order]],
            include: [
                {
                    model: Rating,
                    as: 'ratings',
                    attributes: ['rating'],
                },
                {
                    model: Brand,
                    as: 'brand',
                    attributes: ["id", "name"],
                },
                {
                    model: Type,
                    as: 'type',
                    attributes: ["id", "name"],
                },
                {
                    model: Property,
                    as: 'properties',
                    attributes: ["id", "name", "description"],
                }
            ],
            distinct: true
        })

       return repositoryResult 
    }

    async readById(id) {
        return await Candy.findOne({
            where: {id},
            attributes: {exclude: ["brandId", "typeId"]},
            include: [
                {
                    model: Rating,
                    as: 'ratings',
                    attributes: ['rating'],
                },
                {
                    model: Brand,
                    as: 'brand',
                    attributes: ["id", "name"],
                },
                {
                    model: Type,
                    as: 'type',
                    attributes: ["id", "name"],
                },
                {
                    model: Property,
                    as: 'properties',
                    attributes: ["id", "name", "description"],
                }
            ],
        })
    }

    async update(data) {
        const {id, name, price, imageName, imageData, typeId, brandId, properties} = data

        const [count, rows] = await Candy.update({
            name,
            price,
            ...(imageName && {imageName}),
            ...(imageData && {imageData}),
            typeId,
            brandId,
        }, {
            where: {id},
            returning: true,
        })

        const updatedCandy = rows[0]

        updatedCandy.setProperties([])
        
        properties?.forEach(async (property) => {
            const [ dbProperty ] = await Property.findOrCreate({
                where: {
                    name: property.name,
                    description: property.description
                }
            })
            await updatedCandy.addProperty(dbProperty)
        })

        return this.readById(id)
    }

    async changeRating(data) {
        const {userId, candyId, rating} = data

        const [dbRating, created] = await Rating.findOrCreate({
            where: {
                userId,
                candyId,
            },
            defaults: {
                rating
            }
        })

        if (!created) {
            dbRating.update({
                rating
            })
        }

        return dbRating
    }

    async delete(data) {
        const {id} = data

        return await Candy.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = new CandyRepository()