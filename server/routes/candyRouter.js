const Router = require('express')
const router = new Router()
const candyController = require('../controllers/candyController')

router.post('/', candyController.create)
router.get('/', candyController.readAll)
router.get('/:id', candyController.readById)


module.exports = router