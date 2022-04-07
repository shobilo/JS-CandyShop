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
  }
  
  async order(data) {
    const {userId} = data
    const currentDate = new Date()
    
    await Basket.update({
      ...data,
      state: "ordered",
      deliveryStartDate: currentDate,
      
    }, {
      where: {
        userId,
        state: "active"
      }
    })
    
    await Basket.create({
      userId,
      state: "active"
    })
  }
}

module.exports = new BasketRepository()