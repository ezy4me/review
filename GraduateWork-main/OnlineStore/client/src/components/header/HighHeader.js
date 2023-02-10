import React from 'react';
import {
    ABOUT_ROUTE,
    CONTACTS_ROUTE,
    DELIVERY_ROUTE,
    FINDUS_ROUTE,
    GUARANTEE_ROUTE,
    MAIN_ROUTE
} from "../../utils/consts";
import {NavLink} from "react-router-dom";
import logo from '../../resources/img/header_buttons/logo.png'

const HighHeader = () => {
    return (
        <div className={"high-header flex"}>
            <NavLink to={MAIN_ROUTE}>
                <img src={logo}
                     alt="Logotype"
                     aria-label={"Logotype site"}/>
            </NavLink>

            <ul className="high-header__info flex">
                <li className="high-header__info--item">
                    <NavLink to={ABOUT_ROUTE}>О компании</NavLink>
                </li>
                <li className="high-header__info--item">
                    <NavLink to={DELIVERY_ROUTE}>Доставка</NavLink>
                </li>
                <li className="high-header__info--item">
                    <NavLink to={GUARANTEE_ROUTE}>Гарантия</NavLink>
                </li>
                <li className="high-header__info--item">
                    <NavLink to={CONTACTS_ROUTE}>Контакты</NavLink>
                </li>
                <li className="high-header__info--item">
                    <NavLink to={FINDUS_ROUTE}>Как нас найти?</NavLink>
                </li>
            </ul>

            <ul className="high-header__numbers flex">
                <li className="high-header__numbers--item">
                    <a href={"tel:89999999999"} >+7 (999) 999-99-99</a>
                </li>
                <li className="high-header__numbers--item">
                    <a href={"tel:89999999999"}>+7 (999) 999-99-99</a>
                </li>
            </ul>
        </div>
    );
};

export default HighHeader;