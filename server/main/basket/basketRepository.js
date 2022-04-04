const Basket = require('./basketModel')
const BasketCandy = require('../../models/intermediateModels/basketCandyModel')
const Candy = require('../candy/candyModel')

class BasketRepository {
  async read(data) {
    const {userId} = data
    
    const basket = await Basket.findOne({
      where: {
        userId,
        state: "active"
      }
    })
    
    return basket
  }
  
  async update(data) {
    const {userId, candyId, quantity} = data
    
    const basket = await this.read({userId})
    
    const candy = await Candy.findOne({
      where: {
        id: candyId
      }
    })
    
    await basket.addCandy(candy)
    
    const basketId = basket.getDataValue('id')
    
    const basketCandy = await BasketCandy.findOne({
      where: {
        candyId,
        basketId
      }
    })
    
    basketCandy.setDataValue('quantity', quantity)
    await basketCandy.save()
    
    return basket
  }
  
  async delete(data) {
    const {userId, candyId} = data
  
    const basket = await this.read({userId})
  
    const candy = await Candy.findOne({
      where: {
        id: candyId
      }
    })
    
    await basket.removeCandy(candy)
    
    return basket
  }
}

module.exports = new BasketRepository()