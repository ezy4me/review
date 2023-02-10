import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {getAllCartItem, getCartId, removeAllItems, removeCartItem} from "../http/cartAPI";
import deleteItem from '../resources/img/cart/delete.png'
import {SHOP_ROUTE} from "../utils/consts";
import Swal from "sweetalert2";

const Cart = observer(() => {
    const {cart} = useContext(Context)
    const [order, setOrder] = useState([])
    const userId = parseInt(JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id)
    const history = useNavigate()
    let totalCost = 0

    useEffect(() => {
        if (cart.cartId === null) {
            getCartId(userId).then(cartId => {
                cart.setCartId(cartId)
            })
        }
    }, [userId, cart])

    useEffect(() => {
        if (cart.cartId !== null) {
            getAllCartItem(userId).then(data => {
                setOrder(data)
            })
        }
    }, [userId])

    return (
        <div className={"cart"}>
            <div className="cart__title">Моя корзина</div>

            <div className="cart__item">
                {
                    order && order.map((item, index) => {
                        totalCost += item.priceDevice
                        return (
                            <div className={"cart__order-form"} key={index}>
                                <ul className="cart__order-product order__product flex">
                                    <li className="order__product--item">
                                        <img src={process.env.REACT_APP_API_URL + item.img}
                                             alt="Device img"
                                             aria-label={"Device image"}
                                             style={{width: 150 + 'px', height: 150 + 'px'}}/>
                                    </li>

                                    <li className="order__product--item">
                                        <div className="device-info">
                                            <h3 className="device-info__name">
                                                {item.nameDevice}
                                            </h3>
                                            <div className="device-info__rate">
                                                Рейтинг: <b>{item.rating}</b>
                                            </div>
                                            <div className="device-info__price">
                                                Цена: <b>{item.priceDevice + ' рублей'}</b>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="order__product--item">
                                        <button className="delete__order btn-reset"
                                        onClick={() => {
                                            return Swal.fire({
                                                title: 'Маленькое уточнение',
                                                text: "Вы точно хотите удалить этот товар из корзины?",
                                                icon: 'question',
                                                showCancelButton: true,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Да, хочу'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    removeCartItem(userId, item.id).then(data => {
                                                        console.log(data)
                                                    })
                                                    getAllCartItem(userId).then(data => {
                                                        setOrder(data)
                                                    })
                                                    Swal.fire(
                                                        'Удалено!',
                                                        'Данный товар был удален из корзины',
                                                        'success'
                                                    )
                                                }
                                            })
                                        }}>
                                            <img src={deleteItem}
                                                 alt="delete item img"
                                                 aria-label={"delete item btn"}/>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
            {
                order.length !== 0 ?
                    <div className="cart__complete">
                        <div className="cart__complete-form form">
                            <div className="form__list">
                                <div className="form__list--item">
                                    <button className="btn__payment btn-reset"
                                            onClick={() => {
                                                removeAllItems(userId).then(data => {
                                                    console.log(data)
                                                })
                                                history(SHOP_ROUTE)
                                                return Swal.fire({
                                                    icon: 'success',
                                                    title: 'Спасибочки :)',
                                                    text: 'Выражаем огромную благодарность за то, что воспользовались нашим магазином. ' +
                                                        'Приходите к нам еще!'
                                                })
                                            }
                                            }>Оформить покупку
                                    </button>
                                </div>
                                <div className="form__list--item">
                                    <span className="total__price">Общая цена: {totalCost} рублей</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    :

                    <h2 className="cart__error">
                        Корзина пуста!
                    </h2>
            }
        </div>


        /*<Container>
            <h1>Моя корзина</h1>
            <Row className='d-flex flex-row justify-content-around'>
                {
                    order && order.map((item, index) => {
                            totalCost += item.priceDevice
                            return (
                                <Card key={index} className='m-1' style={{width: '19rem'}}>
                                    <Card.Img width={'100%'} height={200} variant="top"
                                              src={process.env.REACT_APP_API_URL + item.img}/>
                                    <Card.Body>
                                        <Card.Title>{item.nameDevice}</Card.Title>
                                        <div className='d-flex flex-column'>
                                            <p>Рейтинг: <b>{item.rating}</b></p>
                                            <p>Цена: <b>{item.priceDevice}</b></p>
                                        </div>
                                        <Button onClick={() => {
                                            removeCartItem(userId, item.id).then(data => {
                                                console.log(data)
                                            })
                                            getAllCartItem(userId).then(data => {
                                                setOrder(data)
                                            })
                                        }} variant='outline-danger'>Удалить</Button>
                                    </Card.Body>
                                </Card>
                            )
                        }
                    )
                }
            </Row>
            {
                order.length !== 0 ? <Row className='d-flex justify-content-around'>
                    <h4>Общая стоимость: {totalCost}</h4>
                    <Button onClick={() => {
                        removeAllItems(cart.cartId).then(data => {
                            console.log(data)
                        })
                        history(SHOP_ROUTE)
                    }} className='btn-lg'
                            variant={'outline-dark'}>Оплата</Button>
                </Row> :
                <Row className='d-flex justify-content-center'>
                    <h3>Корзина пуста</h3>
                </Row>
            }
        </Container>*/
    );
});

export default Cart;