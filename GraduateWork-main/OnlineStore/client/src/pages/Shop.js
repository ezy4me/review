import React, {useContext, useEffect} from 'react';
import TypeList from "../components/shop-page/TypeList";
import BrandList from "../components/shop-page/BrandList";
import DeviceList from "../components/shop-page/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getAllBrand, getAllDevices, getAllTypes} from "../http/deviceAPI";
import Page from "../components/pagination/Page";
import {getCartId} from "../http/cartAPI";


const Shop = observer(() => {

    const {device, user, cart} = useContext(Context)
    const userId = parseInt(JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id)

    useEffect(() => {
        if(user.isAuth){
            getCartId(userId).then(cartId => {
                cart.setCartId(cartId)
            })
        }
    }, [user.isAuth, userId, cart])
    useEffect(() => {
        getAllTypes().then(data => device.setType(data))
        getAllBrand().then(data => device.setBrand(data))
        getAllDevices(null, null, 1, 6).then(data => {
            device.setDevice(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device])

    useEffect(() => {
        getAllDevices(device.selectedBrand.id, device.selectedTypes.id, device.page, 6).then(data => {
            device.setDevice(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device, device.page, device.selectedBrand, device.selectedTypes])


    return (
        <div className={'shop-section flex'}>
            <div className="shop-section__row--left">
                <TypeList />
                <BrandList />

                <div className="shop-section__btn">
                    <button className="shop-section__btn--clear btn-reset"
                            onClick={() => {
                                device.setSelectedBrands({})
                                device.setSelectedTypes({})
                            }}>Очистить фильтры</button>
                </div>

            </div>
            <div className="pagination grid">
                <div className={"shop-section__row--right flex"}>
                    <DeviceList />
                </div>
                <div className="shop-section__pagination flex">
                    <Page/>
                </div>
            </div>
        </div>
    );
});

export default Shop;