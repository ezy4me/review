import React, {useEffect, useState} from 'react';
import star from "../../resources/img/device/star.png"
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {getOneBrand} from "../../http/deviceAPI";
import {createCartItem} from "../../http/cartAPI";
import Swal from "sweetalert2";

const DeviceItem = ({device, deviceBrandId}) => {
    const history = useNavigate()

    const [brandName, setBrandName] = useState('')
    const userId = parseInt(JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id)
    useEffect(() => {
        getOneBrand(deviceBrandId).then(data => {
            setBrandName(data.nameBrand)
        })

    }, [deviceBrandId])

    return (
        <article className="device" onClick={() => {history(DEVICE_ROUTE + '/' + device.id)}}>
            <div className="device__image flex">
                <img src={process.env.REACT_APP_API_URL + device.img} alt="Device img" aria-label={"Device img"}/>
            </div>

            <div className="device__info flex">
                <h3 className="device__title">
                    {brandName}
                </h3>

                <div className="device__rating flex">
                    <h3 className="device__rating--rate">{device.rating}</h3>
                    <img src={star}
                         alt="Star img"
                         aria-label={"Star label"}
                         className="device__rating--star" />
                </div>
            </div>

            <div className="device__name">{device.nameDevice}</div>

            <h3 className="device__price">{device.priceDevice + " руб"}</h3>

            <div className="device__add">
                <button className="device__add--btn btn-reset flex"
                        onClick={() => {
                    createCartItem(userId, parseInt(device.id)).then(data => {
                        history(SHOP_ROUTE)
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

        </article>
    );
};

export default DeviceItem;