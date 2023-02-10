const {Rating} = require('../models/models')
const ApiError = require('../error/errorHandler');
const Functions = require("../validation/secondaryFunctions");
const ErrorHandler = require("../error/errorHandler");

class RatingController {

    /**
     * Создание рейтинга.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async createRate(req, res, next) {
        try {
            const {userId, deviceId, rate} = req.body

            if(!(Functions.isNumber(userId))) {
                return next(ErrorHandler.badRequest('Некорректно указан идентификатор пользователя.'))
            }

            if(!(Functions.isNumber(deviceId))) {
                return next(ErrorHandler.badRequest('Некорректно указан идентификатор устройства.'))
            }

            if(!(Functions.isNumber(rate))) {
                return next(ErrorHandler.badRequest('Некорректно указан рейтинг устройства.'))
            }

            const candidate = await Rating.findOne({where: {userId, deviceId}})

            if (candidate !== null) {
                return next(ApiError.badRequest('Вы уже оставляли оценку этому товару!'))
            }

            await Rating.create({rate, userId, deviceId})

            return res.status(200).json({message: 'Оценка добавлена!'})
        } catch (e) {
            return next(ApiError.badRequest({message: e}))
        }

    }
}

module.exports = new RatingController()