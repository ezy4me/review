import {$host, $authHost} from "./index";
import jwt_decode from 'jwt-decode'

/**
 * Реализация функции регистрации из контроллера.
 * @param userName - никнейм пользователя.
 * @param userEmail - почта пользователя.
 * @param userPassword - пароль пользователя.
 * @returns {Promise<void>}
 */
export const registration = async (userName, userEmail, userPassword) => {
        const {data} = await $host.post('api/user/registration', {userName, userEmail, userPassword})
        localStorage.setItem('token', data.json_token)
        return jwt_decode(data.json_token)
}

/**
 * Реализация функции логина из контроллера.
 * @param userEmail - почта пользователя.
 * @param userPassword - пароль пользователя.
 * @returns {Promise<void>}
 */
export const login = async (userEmail, userPassword) => {
        const {data} = await $host.post('api/user/login', {userEmail, userPassword})
        localStorage.setItem('token', data.jwt_token)
        return jwt_decode(data.jwt_token)
}

/**
 * Реализация функции check из контроллера.
 * @returns {Promise<unknown>}
 */
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.jwt_token)
    return jwt_decode(data.jwt_token)
}