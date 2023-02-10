import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import logo from "../resources/img/auth_logo/logo.png"
import close from "../resources/img/auth_logo/btn_close.png"
import {observer} from "mobx-react-lite";
import {login, registration} from "../http/userAPI";
import Swal from 'sweetalert2'
import {Context} from "../index";

const Auth = observer(() => {

    const {user} = useContext(Context)

    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [firstPassword, setFirstPassword] = useState('')
    const [secondPassword, setSecondPassword] = useState('')

    /**
     * Функция для авторизации / регистрации по JWT-токену.
     * @returns {Promise<*[]>}
     */
    const reg_auth = async () => {
        try {
            if (isLogin) {
               await  login(email, firstPassword)
            } else {
                if (firstPassword === secondPassword) {
                    await registration(name, email, firstPassword)
                } else {
                    return Swal.fire({
                        icon: "error",
                        title: "Ошибочка",
                        text: "Пароли не совпадают"
                    })
                }
            }

            user.setUser(user)
            user.setIsAuth(true)
            history(SHOP_ROUTE)
            return Swal.fire({
                icon: "success",
                title: "Успешно",
                text: "Добро пожаловать!"
            })
        } catch (e) {
            return Swal.fire({
                icon: "error",
                title: "Ошибочка",
                text: e.response.data.message
            })
        }
    }

    return (
        <div className={"auth"}>
            <div className="auth-header flex">
                <div className="auth-header__img">
                    <img src={logo} alt="Logotype" aria-label={"Site logotype"}/>
                </div>
                <p className="auth-header__text">
                    TechnoWorld
                </p>
            </div>

            <div className="auth-form__center flex">
                <div className="auth-form">
                    <div className="auth-form__header flex">
                        <NavLink to={SHOP_ROUTE} className="auth-form__header--btn btn-reset">
                            <img src={close} alt="Close" aria-label={"Closes button"}/>
                        </NavLink>
                    </div>
                    <h1 className="auth-form__h1--text">{isLogin ? "Авторизация" : "Регистрация"}</h1>
                    {
                        !(isLogin) &&
                        <div className="auth-form__text">
                            <input type="text"
                                   value={name}
                                   onChange={e => setName(e.target.value)}/>
                            <span></span>
                            <label>Никнейм</label>
                        </div>
                    }
                    <div className="auth-form__text">
                        <input type="text"
                               value={email}
                               onChange={e => setEmail(e.target.value)}/>
                        <span></span>
                        <label>Электронная почта</label>
                    </div>
                    <div className="auth-form__text">
                        <input type="password"
                               value={firstPassword}
                               onChange={e => setFirstPassword(e.target.value)}/>
                        <span></span>
                        <label>Пароль</label>
                    </div>
                    {
                        isLogin ?
                            <div>
                                <button className={"auth-form__text--btn btn-reset"}
                                        onClick={reg_auth}>Войти в аккаунт
                                </button>
                                <div className="auth-form__bottom--part grid">
                                    <label>Впервые у нас?</label>
                                    <NavLink to={REGISTRATION_ROUTE} className={"auth-form__bottom--part-link flex"}>
                                        Зарегистрироваться
                                    </NavLink>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="auth-form__text">
                                    <input type="password"
                                           value={secondPassword}
                                           onChange={e => setSecondPassword(e.target.value)}/>
                                    <span></span>
                                    <label>Повторите пароль</label>
                                </div>

                                <button className={"auth-form__text--btn btn-reset"}
                                        onClick={reg_auth}>
                                    Зарегистрироваться
                                </button>

                                <div className="auth-form__bottom--part grid">
                                    <label>Уже есть аккаунт?</label>
                                    <NavLink to={LOGIN_ROUTE} className={"auth-form__bottom--part-link flex"}>
                                        Войти
                                    </NavLink>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
});

export default Auth;