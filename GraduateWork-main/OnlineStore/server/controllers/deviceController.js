const {Device, DeviceInfo, Rating} = require("../models/models");
const uuid = require('uuid') /*генерация случайного id*/
const Functions = require('../validation/secondaryFunctions')
const ErrorHandler = require("../error/errorHandler");
const path = require('path')
/**
 * Контроллер для Девайса.
 */
class DeviceController {

    /**
     * Создание девайса.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async create (req, res, next) {
        try {
            let {nameDevice, priceDevice, typeId, brandId, info, descriptionDevice} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg" /*v4 - генерирует id*/

            if ((!Functions.isString(nameDevice)) || Functions.isEmpty(nameDevice)) {
                return next(ErrorHandler.badRequest('Некорректно указано название устройства.'))
            }

            if(!(Functions.isNumber(priceDevice))) {
                return next(ErrorHandler.badRequest('Некорректно указана цена устройства.'))
            }

            if(!(Functions.isNumber(typeId))) {
                return next(ErrorHandler.badRequest('Некорректно указан тип устройства.'))
            }

            if(!(Functions.isNumber(brandId))) {
                return next(ErrorHandler.badRequest('Некорректно указан бренд устройства.'))
            }

            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({nameDevice, priceDevice, img: fileName, descriptionDevice, typeId, brandId})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        titleInfo: i.titleInfo,
                        descriptionInfo: i.descriptionInfo,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device);
        } catch {
            next(ErrorHandler.internal('Неправильно обработан запрос.'))
        }
    }

    /**
     * Получение девайсов.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - переход к работе Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async getAll (req, res, next) {

        /** Деструктуризация объекта для вывода товаров на страницу.
         * @param brandId - Id бренда.
         * @param typeId - Id типа.
         * @param currentPage - текущая страница.
         * @param countShow - количество девайсов на странице.
         */
        let {brandId, typeId, limit, page} = req.query

        page = page || 1
        limit = limit || 9

        let offset = page * limit - limit // отступ при переходе на новую страницу
        let devices;

        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({order: ['id'], limit, offset})
        }

        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }

        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }

        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }

        return res.json(devices)
    }

    /**
     * Получение девайса.
     * @param req - запрос.
     * @param res - ответ.
     * @returns {Promise<void>} - Объект.
     */
    async getOne (req, res) {
        const {id} = req.params

        const device = await Device.findOne({
            where: {id},
            include: [{
                model: DeviceInfo, as: 'info'
            }]
        })

        return res.json(device)
    }

    /**
     * Расчет средней оценки устройства.
     * @param req - запрос.
     * @returns {Promise<void>}
     */
    async calculateMark(req) {
        try {
            const {id} = req.params
            const marksData = await Rating.findAll({where: {deviceId: id}})
            const marks = marksData.map(mark => mark.dataValues.rate)
            let resultMark = 0;

            for (let i = 0; i < marks.length; i++) {
                resultMark += marks[i]
            }
            resultMark = resultMark / marks.length

            Device.update({rating: resultMark}, {where: {id}})
                .then(() => {
                    console.log('Рейтинг обновлён')
                })

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new DeviceController()