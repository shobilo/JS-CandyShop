const {Op} = require("sequelize")

const Candy = require("./candyModel")
const Property = require("../property/propertyModel")
const Brand = require("../brand/brandModel")
const Type = require("../type/typeModel")
const Rating = require("../../models/intermediateModels/ratingModel")

class CandyRepository {
    async create(data) {
        const {name, price, brandId, typeId, imageName, imageData} = data
        const {properties} = data
        
        const candy = await Candy.create({
            name,
            price,
            brandId,
            typeId,
            imageName,
            imageData
        })

        properties.forEach(async (property) => {
            const [dbProperty, created] = await Property.findOrCreate({
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
                }
            ],
            distinct: true
        })

       return repositoryResult 
    }

    async readById(id) {
        return await Candy.findOne({
            where: {id},
            include: [
                {
                    model: Property, 
                    as: "properties"
                },
                {
                    model: Rating,
                    as: 'ratings',
                    attributes: ['rating']
                }
            ]
        })
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
}

module.exports = new CandyRepository()