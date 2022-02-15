const Router = require('express')
const router = new Router()
const roleController = require('./roleController')

router.post('/', roleController.create)
router.get('/', roleController.readAll)

module.exports = router