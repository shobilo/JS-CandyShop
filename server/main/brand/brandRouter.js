const Router = require('express')
const router = new Router()
const brandController = require('./brandController')
const checkRole = require('../../middlewares/roleCheckMiddleware')

router.post('/', checkRole('admin'), brandController.create)
router.get('/', brandController.readAll)
router.put('/:id', checkRole('admin'), brandController.update)
router.delete('/:id', checkRole('admin'), brandController.delete)


module.exports = router