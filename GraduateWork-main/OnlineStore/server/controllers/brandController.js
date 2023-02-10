const {Brand} = require("../models/models");
const Functions = require('../validation/secondaryFunctions')
const ErrorHandler = require('../error/errorHandler')

/**
 * Контроллер для Бренда.
 */
class BrandController {

    /**
     * Создание бренда.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async create (req, res, next) {
        const {nameBrand} = req.body // req.body - позволяет получить доступ к параметру со стороны клиента.

        if (!(Functions.isString(nameBrand)) ||
             (Functions.isEmpty(nameBrand))) {
            return next(ErrorHandler.badRequest('Не верный параметр запроса.'))
        }

        const brand = await Brand.create({nameBrand})
        return res.json(brand)
    }

    /**
     * Получение брендов.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async getAll (req, res, next) {
        const brands = await Brand.findAll()

        if (Functions.isEmptyObject(brands)) {
            return next(ErrorHandler.badRequest('Данный объект является пустым.'))
        }

        return res.json(brands)
    }

    /**
     * Получение одного бренда.
     * @param req - запрос.
     * @param res - ответ.
     * @returns {Promise<*>}
     */
    async getOne(req, res) {
        const {id} = req.params
        const brandName = await Brand.findOne({where: {id}})
        return res.json(brandName)
    }
}

module.exports = new BrandController()