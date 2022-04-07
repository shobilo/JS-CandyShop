const basketService = require('./basketService')

class BasketController {
  async read(req, res, next) {
    try {
      const data = req.params
      const userId = req.user.id
      
      const dataWithUserId = {
        ...data,
        userId
      }
      const serviceResult = await basketService.read(dataWithUserId)
      
      return res.status(200).json(serviceResult)
    } catch (error) {
      return next(error)
    }
  }
  
  async update(req, res, next) {
    try {
      const data = req.body
      const userId = req.user.id
  
      const dataWithUserId = {
        ...data,
        userId
      }
      
      const serviceResult = await basketService.update(dataWithUserId)
      
      return res.status(201).json(serviceResult)
    } catch (error) {
      return next(error)
    }
  }
  
  async delete(req, res, next) {
    try {
      const data = req.params
      const userId = req.user.id
  
      const dataWithUserId = {
        ...data,
        userId
      }
      const serviceResult = await basketService.delete(dataWithUserId)
      
      return res.status(201).json(serviceResult)
    } catch (error) {
      return next(error)
    }
  }
  
  async order(req, res, next) {
    try {
      const data = req.body
      const userId = req.user.id
  
      const dataWithUserId = {
        ...data,
        userId
      }
  
      const serviceResult = await basketService.order(dataWithUserId)
  
      return res.status(201).json(serviceResult)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new BasketController()