const Router = require('express')
const routes = new Router()
const BrandController = require('../controllers/brandController')

routes.post('/', BrandController.create)
routes.get('/', BrandController.getAll)
routes.get('/:id', BrandController.getOne)

module.exports = routes