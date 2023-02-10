import React from 'react';
import {NavLink} from "react-router-dom";
import vk from "../../resources/img/social/vk.png";
import tg from "../../resources/img/social/tg.png";
import inst from "../../resources/img/social/inst.png";

const OurSocial = () => {

    const VK_PATH = "https://vk.com/sanya198olegovich";
    const INST_PATH = "https://www.instagram.com/qui_vicit_terra/";
    const TG_PATH = "https://t.me/SvenSaveno";

    return (
        <div className={"social"}>
            <h3 className="social__h3-title">
                Подписывайтесь и&nbsp;следите за&nbsp;новостями
            </h3>

            <ul className="social__list flex">
                <li className={"social__item"}>
                    <NavLink to={VK_PATH} className={"social__link grid"}>
                            <h3 className={"social__text--title"}>Вконтакте</h3>
                            <p className={"social__text--descr"}>
                                @technoworldru
                            </p>
                        <img src={vk} alt="Vk" aria-label={"Social site VK"}/>
                    </NavLink>
                </li>

                <li className={"social__item"}>
                    <NavLink to={TG_PATH} className={"social__link grid"}>
                        <h3 className={"social__text--title"}>Вконтакте</h3>
                        <p className={"social__text--descr"}>
                            @technoworld
                        </p>
                        <img src={tg} alt="Tg" aria-label={"Messengers Telegram"}/>
                    </NavLink>
                </li>

                <li className={"social__item"}>
                    <NavLink to={INST_PATH} className={"social__link grid"}>
                        <h3 className={"social__text--title"}>Вконтакте</h3>
                        <p className={"social__text--descr"}>
                            @technoworldru
                        </p>
                        <img src={inst} alt="Inst" aria-label={"Social site Instagram"}/>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default OurSocial;