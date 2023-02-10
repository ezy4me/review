const Router = require('express')
const routes = new Router()
const CartController = require('../controllers/cartController')

routes.get('/:id', CartController.getCartId)
routes.get('/get-all-goods/:id', CartController.getAllGoods)
routes.post('/', CartController.createGoods)
routes.delete('/:cartId/:deviceId', CartController.deleteItem)
routes.delete('/:cartId', CartController.deleteAllItems)
module.exports = routes