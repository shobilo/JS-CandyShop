const Candy = require("./candyModel")
const Property = require("../property/propertyModel")

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
            const dbProperty = await Property.create(property)
            await candy.addProperty(dbProperty)
        })
    }
}

module.exports = new CandyRepository()