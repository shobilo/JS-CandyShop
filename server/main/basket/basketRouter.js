const Router = require('express')
const router = new Router()
const basketController = require('./basketController')
const authCheckMiddleware = require('../../middlewares/authCheckMiddleware')

router.get('/', authCheckMiddleware, basketController.read)
router.post('/update', authCheckMiddleware, basketController.update)
router.delete('/delete/:candyId', authCheckMiddleware, basketController.delete)

module.exports = router