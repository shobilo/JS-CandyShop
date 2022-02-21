const Router = require('express')
const router = new Router()
const candyController = require('./candyController')
const checkRole = require('../../middlewares/roleCheckMiddleware')

router.post('/', checkRole('admin'), candyController.create)
router.get('/', candyController.readAll)
router.get('/:id', candyController.readById)


module.exports = router