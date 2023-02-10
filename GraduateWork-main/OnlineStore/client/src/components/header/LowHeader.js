import React, {useContext} from 'react';
import search from "../../resources/img/header_buttons/search.png"
import auth from "../../resources/img/header_buttons/auth.png";
import cart from "../../resources/img/header_buttons/cart.png";
import {NavLink, useNavigate} from "react-router-dom";
import {CART_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const LowHeader = observer(() => {

    const {user} = useContext(Context)
    const userId = parseInt(JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id)
    const history = useNavigate()

    /**
     * Функция выхода из аккаунта.
     */
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    /**
     * Функция получения имени.
     * @returns {Promise<void>}
     */
    const parseJwt = () => {
        return JSON.parse(atob(localStorage.getItem('token').split('.')[1])).name;
    };

    return (
        <div className={"low-header flex"}>
            <NavLink to={SHOP_ROUTE}>
                <button className="low-header__burger flex btn-reset">
                    <svg className={"low-header__burger--btn"}
                         viewBox="0 0 100 80"
                         width="40"
                         height="40">
                        <rect width="100" height="20" rx="8"></rect>
                        <rect y="30" width="100" height="20" rx="8"></rect>
                        <rect y="60" width="100" height="20" rx="8"></rect>
                    </svg>

                    <span className={"low-header__burger--text"}>Каталог товаров</span>
                </button>
            </NavLink>

            <form action={""} method={"get"} className={"low-header__search"}>
                <input className={"low-header__search--string"}
                       type="text"
                       placeholder="Поиск среди тысячи товаров"/>
                <button className={"low-header__search--btn btn-reset"}
                        type="submit"
                        aria-label={"Search button"}>
                    <img src={search} alt="logo" aria-label={"Search logo"}/>
                </button>
            </form>

            <NavLink to={CART_ROUTE + `/${userId}`} className={"low-header__cart flex"}>
                <div className={"low-header__cart--img"}>
                    <img src={cart} alt="cart" aria-label={"Cart"}/>
                </div>
                <div className={"low-header__cart--text"}>Корзина</div>
            </NavLink>
            {
                user._isAuth ?
                    <button className={"low-header__auth flex btn-reset"}
                            onClick={() => logOut() && history(SHOP_ROUTE)}>
                        <div className={"low-header__auth--img"}>
                            <img src={auth} alt="auth" aria-label={"auth"}/>
                        </div>
                        <div className={"low-header__auth--text"}>{user._isAuth ? parseJwt() : "Войти"}</div>
                    </button>
                    :
                    <NavLink className={"low-header__auth flex"} to={LOGIN_ROUTE}>
                        <div className={"low-header__auth--img"}>
                            <img src={auth} alt="auth" aria-label={"auth"}/>
                        </div>
                        <div className={"low-header__auth--text"}>{user._isAuth ? parseJwt() : "Войти"}</div>
                    </NavLink>
            }
        </div>

    );
});

export default LowHeader;