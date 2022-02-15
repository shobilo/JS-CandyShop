const Router = require('express')
const brandRouter = require('../main/brand/brandRouter')
const candyRouter = require('../main/candy/candyRouter')
const propertyRouter = require('../main/property/propertyRouter')
const roleRouter = require('../main/role/roleRouter')
const typeRouter = require('../main/type/typeRouter')
const userRouter = require('../main/user/userRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/roles', roleRouter)
router.use('/candy', candyRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/property', propertyRouter)

module.exports = router