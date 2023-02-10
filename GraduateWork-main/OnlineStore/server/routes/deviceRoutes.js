const Router = require('express')
const routes = new Router()
const DeviceController = require('../controllers/deviceController')

routes.post('/', DeviceController.create)
routes.put('/:id', DeviceController.calculateMark)
routes.get('/', DeviceController.getAll)
routes.get('/:id', DeviceController.getOne)


module.exports = routes