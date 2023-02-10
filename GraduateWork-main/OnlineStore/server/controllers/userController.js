const {User, Cart} = require("../models/models");
const ErrorHandler = require('../error/errorHandler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Function = require('../validation/secondaryFunctions')

/**
 * Контроллер для пользователя.
 */
class UserController {

    /**
     * Регистрация.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async registration (req, res, next) {
        const {userName, userEmail, userPassword, roleUser} = req.body

        if ((!(Function.isString(userName))) || (Function.isEmpty(userName))) {
            return next(ErrorHandler.badRequest("Некорректно указано имя пользователя."))
        }

        if ((!(Function.isString(userEmail))) || (Function.isEmpty(userEmail))) {
            return next(ErrorHandler.badRequest("Некорректно указана почта пользователя."))
        }

        if ((!(Function.isString(userPassword))) || (Function.isEmpty(userPassword))) {
            return next(ErrorHandler.badRequest("Некорректно указан пароль пользователя."))
        }

        if (!(Function.validateEmail(userEmail))) {
            return next(ErrorHandler.badRequest("Введенная Вами почта не валидна."))
        }

        if (!(Function.validatePassword(userPassword))) {
            return next(ErrorHandler.badRequest("Пароль должен содержать:\n" +
                                                "1) Как минимум одну строчную букву.\n" +
                                                "2) Как минимум одну заглавную букву.\n" +
                                                "3) Как минимум одну цифру.\n" +
                                                "4) Размер пароля должен быть от 8 до 15 символов.\n" +
                                                "5) Раскладка исключительно латиницей."));
        }

        const candidateOnName = await User.findOne({where: {userName}})
        if (candidateOnName) {
            return next(ErrorHandler.badRequest("Пользователь с таким именем уже имеется в системе!"));
        }

        const candidateOnEmail = await User.findOne({where: {userEmail}})
        if (candidateOnEmail) {
            return next(ErrorHandler.badRequest("Пользователь с такой почтой уже имеется в системе!"));
        }

        const hashPassword = await bcrypt.hash(userPassword, 3) // асинхронное хеширование паролей в количестве 3-х раз
        const user = await User.create({userName, userEmail, userPassword: hashPassword, roleUser})
        await Cart.create({userId: user.id})

        const json_token = Function.generateJwt(user.id, user.userName, user.userEmail, user.roleUser)
        return res.json({json_token})
    }


    /**
     * Авторизация.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async login (req, res, next) {
        const {userEmail, userPassword} = req.body

        if ((!(Function.isString(userEmail))) || (Function.isEmpty(userEmail))) {
            return next(ErrorHandler.badRequest("Некорректно указана почта пользователя."))
        }

        if ((!(Function.isString(userPassword))) || (Function.isEmpty(userPassword))) {
            return next(ErrorHandler.badRequest("Некорректно указан пароль пользователя."))
        }

        if (!(Function.validateEmail(userEmail))) {
            return next(ErrorHandler.badRequest("Введенная Вами почта не валидна."))
        }

        if (!(Function.validatePassword(userPassword))) {
            return next(ErrorHandler.badRequest("Введенный Вами пароль не валиден ."))
        }

        const user = await User.findOne({where: {userEmail}})
        if (!(user)) {
            return next(ErrorHandler.internal("Такого пользователя не найдено в системе."))
        }

        const notHashedPassword = bcrypt.compareSync(userPassword, user.userPassword)
        if (!(notHashedPassword)) {
            return next(ErrorHandler.internal("Пароли не совпадают."))
        }

        const jwt_token = Function.generateJwt(user.id, user.userName, user.userEmail, user.roleUser)
        return res.json({jwt_token})
    }

    /**
     * Генерация нового jwt-токена и отправка его на клиент.
     * @param req - запрос.
     * @param res - ответ.
     * @returns {Promise<void>} - Объект.
     */
    async check (req, res) {
        const jwt_token = Function.generateJwt(req.user.id,
                                               req.user.name,
                                               req.user.email,
                                               req.user.role)
        return res.json({jwt_token})
    }
}

module.exports = new UserController()