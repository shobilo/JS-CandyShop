const Router = require('express')
const router = new Router()
const typeController = require('./typeController')
const checkRole = require('../../middlewares/roleCheckMiddleware')

router.post('/', checkRole('admin'), typeController.create)
router.get('/', typeController.readAll)
router.put('/:id', checkRole('admin'), typeController.update)
router.delete('/:id', checkRole('admin'), typeController.delete)

module.exports = router