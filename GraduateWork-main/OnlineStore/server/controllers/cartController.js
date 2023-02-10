const {Cart, Device, CartDevice} = require("../models/models");
const Functions = require('../validation/secondaryFunctions')
const ErrorHandler = require("../error/errorHandler");

/**
 * Контроллер для Корзины
 */
class CartController {

    /**
     * Вывод корзины определенного кандидата.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async getCartId(req, res, next) {
        try {
            const {id} = req.params
            if (!(Functions.isNumber(id))) {
                return next(ErrorHandler.badRequest('Не верный параметр запроса.'))
            }

            const cart = await Cart.findOne({where: {userId: id}})
            return res.json(cart.dataValues.id)
        } catch {
            next(ErrorHandler.internal('Неправильно обработан запрос.'))
        }
    }

    /**
     * Вывод всех товаров из корзины.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async getAllGoods(req, res, next) {
        try {
            const {id} = req.params

            const cartItems = await CartDevice.findAll({where: {cartId: id}})
            const deviceItemsInCart = cartItems.map(item => item.deviceId)

            const cartDevices = []

            for (let i = 0; i < deviceItemsInCart.length; i++) {
                const device = await Device.findOne({where: {id: deviceItemsInCart[i]}})
                cartDevices.push(device.dataValues)
            }

            return res.json(cartDevices)
        } catch (e) {
            next(ErrorHandler.internal('Неправильно обработан запрос.'))
        }
    }

    /**
     * Добавление товара в корзину.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async createGoods(req, res, next) {
        try {
            const {cartId, deviceId} = req.body
            if (!(Functions.isNumber(cartId)) ||
                !(Functions.isNumber(deviceId))) {
                return next(ErrorHandler.badRequest('Не верный параметр запроса.'))
            }

            await CartDevice.create({cartId, deviceId})
            return res.status(200).json({message: `Товар успешно добавлен в корзину!`})
        } catch {
            next(ErrorHandler.internal('Неправильно обработан запрос.'))
        }
    }

    /**
     * Удаление товара из корзины.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async deleteItem(req, res, next) {
        try {
            const {cartId, deviceId} = req.params
            if (!(Functions.isNumber(cartId)) ||
                !(Functions.isNumber(deviceId))) {
                return next(ErrorHandler.badRequest('Не верный параметр запроса.'))
            }

            const candidate = await CartDevice.findOne({where: {cartId, deviceId}})
            if (candidate) {
                await candidate.destroy()
                return res.status(200).json({message: 'Товар успешно удален из корзины!'})
            } else {
                return next(ErrorHandler.badRequest('Данный товар не найден в корзине'))
            }
        } catch {
            next(ErrorHandler.internal(`Неправильно обработан запрос.`))
        }
    }

    /**
     * Очистка корзины.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async deleteAllItems(req, res, next) {
        try {
            const {cartId} = req.params
            if (!(Functions.isNumber(cartId))) {
                return next(ErrorHandler.badRequest('Не верный параметр запроса.'))
            }

            const candidate = await CartDevice.findAll({where: {cartId}})
            if (candidate) {
                candidate.map(item => {
                    item.destroy()
                })
                return res.status(200).json({message: "Оплата прошла успешно!"})
            } else {
                return next(ErrorHandler.badRequest('Невозможно очистить корзину.'))
            }
        } catch {
            next(ErrorHandler.internal('Неправильно обработан запрос.'))
        }
    }
}

module.exports = new CartController()