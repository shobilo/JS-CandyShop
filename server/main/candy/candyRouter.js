const Router = require('express')
const router = new Router()
const candyController = require('./candyController')
const checkRole = require('../../middlewares/roleCheckMiddleware')
const authCheck = require('../../middlewares/authCheckMiddleware')

router.post('/', checkRole('admin'), candyController.create)
router.post('/rating/:id', authCheck, candyController.changeRating)
router.get('/', candyController.readAll)
router.get('/:id', candyController.readById)
router.put('/:id', checkRole('admin'), candyController.update)
router.delete('/:id', checkRole('admin'), candyController.delete)


module.exports = router