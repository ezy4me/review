import React from 'react';
import {NavLink} from "react-router-dom";
import tg from "../../resources/img/social/tg.png";
import wa from "../../resources/img/social/ws.png";
import {
    ABOUT_ROUTE,
    CONTACTS_ROUTE,
    DELIVERY_ROUTE,
    FINDUS_ROUTE,
    GUARANTEE_ROUTE
} from "../../utils/consts";

const Footer = () => {
    const TG_PATH = "https://t.me/SvenSaveno";
    const WA_PATH = "https://wa.me/79372881098";

    return (
        <div className={"footer grid"}>
            <div className="footer-container grid">
                <div className="footer-container__left">
                    <ul className="footer-container__left--list flex">
                        <li className="footer-container__left--item">
                            <NavLink to={ABOUT_ROUTE} aria-label={'Company info'}>О компании</NavLink>
                        </li>
                        <li className="footer-container__left--item">
                            <NavLink to={DELIVERY_ROUTE} aria-label={'Delivery'}>Доставка</NavLink>
                        </li>
                        <li className="footer-container__left--item">
                            <NavLink to={GUARANTEE_ROUTE} aria-label={'Guarantee'}>Гарантия</NavLink>
                        </li>
                        <li className="footer-container__left--item">
                            <NavLink to={CONTACTS_ROUTE} aria-label={'Contacts'}>Контакты</NavLink>
                        </li>
                        <li className="footer-container__left--item">
                            <NavLink to={FINDUS_ROUTE} aria-label={'How you can find us?'}>Как нас найти?</NavLink>
                        </li>
                    </ul>
                    <div className="footer__copyright grid">
                        <p>© 2023 Маркетплейс TechnoWorld</p>
                        <p>Сайт носит сугубо информационный характер и&nbsp;не&nbsp;является публичной офертой, <br/>
                            определяемой Статьей 437 (2) ГК&nbsp;РФ.
                        </p>
                    </div>
                </div>

                <div className="footer-container__right">
                    <div className="footer-container__contact grid">
                        <div className="footer-container__contact--text">Всегда на связи</div>
                        <ul className="footer-container__contact--list grid">
                            <li className="footer-container__contact--item">
                                <NavLink to={WA_PATH}>
                                    <img src={wa} alt="Whatsapp" aria-label={"Whatsapp messenger"}/>
                                </NavLink>
                            </li>
                            <li className="footer__contact--item">
                                <NavLink to={TG_PATH}>
                                    <img src={tg} alt="Tg" aria-label={"Telegram messenger"}/>
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="footer-container__phone--list grid">
                            <li className="footer-container__phone--item">
                                <a className="phones-footer__link" href="tel:+74951804130">8 (999) 999 · 99 · 99</a>
                            </li>
                            <li className="footer__phone--item">
                                <a className="phones-footer__link" href="tel:+74997033667">8 (999) 999 · 99 · 99</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Footer;