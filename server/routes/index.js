const Router = require('express')
const brandRouter = require('./brandRouter')
const candyRouter = require('./candyRouter')
const propertyRouter = require('./propertyRouter')
const roleRouter = require('./roleRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/roles', roleRouter)
router.use('/candy', candyRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/property', propertyRouter)

module.exports = router