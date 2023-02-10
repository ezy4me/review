const Router = require('express')
const router = new Router()

const deviceRouter = require('./deviceRoutes')
const userRouters = require('./userRoutes')
const brandRouters = require('./brandRoutes')
const typeRouters = require('./typeRoutes')
const cartRoutes = require('./cartRoutes')
const ratingRoutes = require('./ratingRoutes')

router.use('/user', userRouters)
router.use('/type', typeRouters)
router.use('/brand', brandRouters)
router.use('/device', deviceRouter)
router.use('/cart', cartRoutes)
router.use('/rating', ratingRoutes)

module.exports = router