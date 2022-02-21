const Router = require('express')
const router = new Router()
const propertyController = require('./propertyController')
const checkRole = require('../../middlewares/roleCheckMiddleware')

router.post('/', checkRole('admin'), propertyController.create)
router.get('/', propertyController.readAll)
router.put('/:id', checkRole('admin'), propertyController.update)
router.delete('/:id', checkRole('admin'), propertyController.delete)

module.exports = router