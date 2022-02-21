const Router = require('express')
const router = new Router()
const roleController = require('./roleController')
const checkRole = require('../../middlewares/roleCheckMiddleware')

router.post('/', checkRole('admin'), roleController.create)
router.get('/', roleController.readAll)

module.exports = router