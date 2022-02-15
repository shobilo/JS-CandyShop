const Router = require('express')
const router = new Router()
const brandController = require('./brandController')

router.post('/', brandController.create)
router.get('/', brandController.readAll)
router.put('/:id', brandController.update)
router.delete('/:id', brandController.delete)


module.exports = router