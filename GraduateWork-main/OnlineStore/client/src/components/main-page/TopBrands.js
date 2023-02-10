import React from 'react';
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";
import apple from "../../resources/img/top_brands/apple.png";
import google from "../../resources/img/top_brands/google.png";
import huawei from "../../resources/img/top_brands/huawei.png";
import one_plus from "../../resources/img/top_brands/one_plus.png";
import samsung from "../../resources/img/top_brands/samsung.png";
import sony from "../../resources/img/top_brands/sony.png";
import xiaomi from "../../resources/img/top_brands/xiaomi.png";
import {observer} from "mobx-react-lite";

const TopBrands = observer(() => {
    return (
        <div className={"top-brands"}>
            <div className="top-brands__text">
                <span className={"top-brands__text--title"}>Топ бренды нашего магазина</span>
            </div>
            <ul className="top-brands__list flex">
                <li className="top-brands__list--item">
                    <NavLink to={SHOP_ROUTE}>
                        <img src={apple} alt="Apple" aria-label={"Apple brand"}/>
                    </NavLink>
                </li>
                <li className="top-brands__list--item">
                    <NavLink to={SHOP_ROUTE}>
                        <img src={google} alt="Google" aria-label={"Google brand"}/>
                    </NavLink>
                </li>
                <li className="top-brands__list--item">
                    <NavLink to={SHOP_ROUTE}>
                        <img src={huawei} alt="Huawei" aria-label={"Huawei brand"}/>
                    </NavLink>
                </li>
                <li className="top-brands__list--item">
                    <NavLink to={SHOP_ROUTE}>
                        <img src={one_plus} alt="Oneplus" aria-label={"Oneplus brand"}/>
                    </NavLink>
                </li>
                <li className="top-brands__list--item">
                    <NavLink to={SHOP_ROUTE}>
                        <img src={samsung} alt="Samsung" aria-label={"Samsung brand"}/>
                    </NavLink>
                </li>
                <li className="top-brands__list--item">
                    <NavLink to={SHOP_ROUTE}>
                        <img src={sony} alt="Sony" aria-label={"Sony brand"}/>
                    </NavLink>
                </li>
                <li className="top-brands__list--item">
                    <NavLink to={SHOP_ROUTE}>
                        <img src={xiaomi} alt="Xiaomi" aria-label={"Xiaomi brand"}/>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
});

export default TopBrands;