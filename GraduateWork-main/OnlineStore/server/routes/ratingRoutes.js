const Router = require('express')
const routes = new Router()
const RatingController = require('../controllers/ratingController')

routes.post('/', RatingController.createRate)

module.exports = routes