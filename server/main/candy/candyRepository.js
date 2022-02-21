const Candy = require("./candyModel")
const Property = require("../property/propertyModel")
const {Op} = require("sequelize")

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
            limit: limit,
            offset: offset,
            order: [[sort, order]]
        })

       return repositoryResult 
    }

    async readById(id) {
        return await Candy.findOne({
            where: {id},
            include: [{model: Property, as: "properties"}]
        })
    }
}

module.exports = new CandyRepository()