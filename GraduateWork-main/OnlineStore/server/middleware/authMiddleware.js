const ErrorHandler = require('../error/errorHandler')
const jwt = require('jsonwebtoken')

/**
 * Middleware на проверку авторизирован ли пользователь или нет.
 * @param req - запрос.
 * @param res - ответ.
 * @param next - Передача управления следующему в цепочке Middleware.
 */
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        /*
         * Тут происходит проверка валидности токена.
         * Обычно токены помещают в Header Authorization и хранят его в следующем формате: <тип токена> <токен>
         * Чтобы выцепить именно токен мы делаем split и берем первый элемент массива.
         * Пример: Bearer fnIDFIUndersign378
         * */
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        req.user = jwt.verify(token, process.env.SECRET_KEY)

        next()

    } catch (e) {
        return next(ErrorHandler.unauthorized("Данный пользователь не авторизирован."))
    }
}