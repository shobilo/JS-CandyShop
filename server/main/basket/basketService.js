const ApiError = require('../../helpers/ApiError')
const basketRepository = require('./basketRepository')

class BrandService {
  async read(data) {
    try {
      const basket = await basketRepository.read(data)
      
      const basketCandies = await basket.getCandies()
  
      const basketCandiesObjectsArray = basketCandies.map((candy) => {
        const candyObject = candy.get({ plain: true})
        const quantity = candyObject.basketCandy.quantity
        
        delete candyObject.basketCandy
        
        return {
          candy: candyObject,
          quantity: quantity
        }
      })
      
      const totalPrice = basketCandiesObjectsArray.reduce((accum, currValue) => {
        return accum + (+currValue.candy.price * currValue.quantity)
      }, 0)
      
      const totalPriceRounded = Math.ceil((totalPrice)*100)/100
      
      return {
        candies: basketCandiesObjectsArray,
        totalPrice: totalPriceRounded
      }
    } catch (error) {
      throw ApiError.internal((error.message))
    }
  }
  
  async update(data) {
    try {
      await basketRepository.update(data)
      
      return await this.read(data)
    } catch (error) {
      throw ApiError.internal(error.message)
    }
  }
  
  async delete(data) {
    try {
      await basketRepository.delete(data)
      
      return await this.read(data)
    } catch (error) {
      throw ApiError.internal(error.message)
    }
  }
  
  async order(data) {
    try {
      await basketRepository.order(data)
  
      return await this.read(data)
    } catch (error) {
      throw ApiError.internal(error.message)
    }
  }
}

module.exports = new BrandService()