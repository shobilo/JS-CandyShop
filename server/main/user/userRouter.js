const Router = require('express')
const router = new Router()
const {body} = require('express-validator')
const userController = require('./userController')
const authCheckMiddleware = require('../../middlewares/authCheckMiddleware')

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 32}),
    body('name').isLength({min: 3, max: 16}),
    userController.registration
)
router.post(
    '/login',
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 32}),
    userController.login
)
router.get('/auth', authCheckMiddleware, userController.auth)

router.get('/orders', authCheckMiddleware, userController.readUserOrders)

module.exports = router