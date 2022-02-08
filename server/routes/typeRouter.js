const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')

router.post('/', typeController.create)
router.get('/', typeController.readAll)
router.put('/:id', typeController.update)
router.delete('/:id', typeController.delete)

module.exports = router