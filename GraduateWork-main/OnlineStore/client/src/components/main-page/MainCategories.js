import React from 'react';
import {SHOP_ROUTE} from "../../utils/consts";
import tablet from "../../resources/img/main_categories/main_tablet.png";
import laptop from "../../resources/img/main_categories/main-laptop.png";
import phone from "../../resources/img/main_categories/main_phone.png";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";

const MainCategories = observer(() => {
    return (
        <div className={"main-section grid"}>
            <NavLink to={SHOP_ROUTE} className="phone categories__style">
                <div className="phone__text">
                    <div className={"phone__text--title"}>Телефоны</div>
                    <div className={"phone__text--descr"}>
                        Модели на&nbsp;любой вкус:
                        от&nbsp;самых бюджетных
                        до&nbsp;флагманских
                    </div>
                </div>
                <img src={phone}
                     alt="Phone"
                     aria-label={"Phone photo"}
                     className={"phone__img"}/>
            </NavLink>

            <NavLink to={SHOP_ROUTE} className="tablet categories__style">
                <div className="tablet__text">
                    <div className={"tablet__text--title"}>Планшеты</div>
                </div>
                <img src={tablet}
                     alt="Tablet"
                     aria-label={"Tablet photo"}
                     className={"tablet__img"}/>
            </NavLink>

            <NavLink to={SHOP_ROUTE} className="laptop categories__style">
                <div className="laptop__text">
                    <div className={"laptop__text--title"}>Ноутбуки</div>
                </div>
                <img src={laptop}
                     alt="Laptop"
                     aria-label={"Laptop photo"}
                     className={"laptop__img"}/>
            </NavLink>
        </div>
    );
});

export default MainCategories;