const Router = require('express')
const router = new Router()
const propertyController = require('./propertyController')

router.post('/', propertyController.create)
router.get('/', propertyController.readAll)
router.put('/:id', propertyController.update)
router.delete('/:id', propertyController.delete)

module.exports = router