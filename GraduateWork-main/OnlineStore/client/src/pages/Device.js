import React, {useEffect, useState} from 'react';
import start from '../resources/img/device/star.png'
import hurt from '../resources/img/device/hurt.png'
import {useParams} from "react-router-dom";
import {getOneDevice} from "../http/deviceAPI";
import {createCartItem} from "../http/cartAPI";
import Swal from "sweetalert2";

const Device = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    const userId = parseInt(JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id)

    useEffect(() => {
        getOneDevice(id).then(data => setDevice(data))
    }, [id])

    return (
        <div className={"phone-info"}>
            <div className="phone-info__top flex">
                <div className="phone-info__top--image">
                    <img src={process.env.REACT_APP_API_URL + device.img}
                         alt="device_img"
                         aria-label={"Device image"}/>
                </div>
                <div className="phone-info__about">
                    <h3 className={"phone-info__about--name"}>{device.nameDevice}</h3>
                    <div className="phone-info__about--star">

                        <ul className="phone-info__about--star-list flex">
                            <li className="phone-info__about--start-item">
                                <img src={start} alt="Star img" aria-label={"Star image"}/>
                            </li>
                            <li className="phone-info__about--star-item">
                                <img src={start} alt="Star img" aria-label={"Star image"}/>
                            </li>
                            <li className="phone-info__about--star-item">
                                <img src={start} alt="Star img" aria-label={"Star image"}/>
                            </li>
                            <li className="phone-info__about--star-item">
                                <img src={start} alt="Star img" aria-label={"Star image"}/>
                            </li>
                            <li className="phone-info__about--star-item">
                                <img src={start} alt="Star img" aria-label={"Star image"}/>
                            </li>
                        </ul>

                        <div className="phone-info__additionally">
                            <div className="phone-info__additionally--list flex">
                                <h3 className="phone-info__additionally--price">
                                    {device.priceDevice + " руб"}
                                </h3>
                                <img src={hurt}
                                     alt="Favourite"
                                     aria-label={"Favourite button"}
                                     className={'phone-info__additionally--favourite'}/>
                                <button className="phone-info__additionally--buy btn-reset"
                                onClick={() => {
                                    createCartItem(userId, parseInt(id)).then(data => {
                                        return Swal.fire({
                                            icon: 'success',
                                            title: 'Ваушки!',
                                            text: data.message
                                        })
                                    })
                                }}>
                                    Добавить в корзину
                                </button>
                            </div>
                            <div className="phone-info__additionally--descr">
                                {device.descriptionDevice}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="phone-info__bottom">
                <h2 className="phone-info__bottom--title">Общие хакартеристики</h2>
                {
                    device.info.map(info =>
                        <div className={"phone-info__bottom--data flex"} key={info.id}>
                            <div className={"phone-info__bottom--data-title"}>{info.titleInfo}</div>
                            <div className={"phone-info__bottom--data-descr"}>{info.descriptionInfo}</div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Device;