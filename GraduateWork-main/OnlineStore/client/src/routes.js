import {
    ABOUT_ROUTE,
    CART_ROUTE,
    CONTACTS_ROUTE,
    DELIVERY_ROUTE,
    DEVICE_ROUTE,
    FINDUS_ROUTE,
    GUARANTEE_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    NOTFOUND_ROUTE,
    ORDER_MENU_ROUTE,
    PERSONAL_AREA_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import Cart from "./pages/Cart"
import PersonalArea from "./pages/PersonalArea"
import OrderMenu from "./pages/OrderMenu"
import Auth from "./pages/Auth"
import Device from "./pages/Device"
import Shop from "./pages/Shop"
import MainPage from "./pages/MainPage";
import AboutCompany from "./pages/site-info/AboutCompany";
import Contacts from "./pages/site-info/Contacts";
import Delivery from "./pages/site-info/Delivery";
import FindUs from "./pages/site-info/FindUs";
import Guarantee from "./pages/site-info/Guarantee";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

/**
 * Массив, который хранит в себе страницы,
 * которые доступны только для авторизованных пользователей.
 * @type {*[]} - Array.
 */
export const authRoutes = [
    {
        path: CART_ROUTE + '/:id',
        Component: Cart
    },
    {
        path: PERSONAL_AREA_ROUTE,
        Component: PersonalArea
    },
    {
        path: ORDER_MENU_ROUTE,
        Component: OrderMenu
    }
]

/**
 * Массив, который хранит в себе страницы,
 * которые доступны только для всех пользователей.
 * @type {*[]} - Array.
 */
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: Device
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: ABOUT_ROUTE,
        Component: AboutCompany
    },
    {
        path: CONTACTS_ROUTE,
        Component: Contacts
    },
    {
        path: DELIVERY_ROUTE,
        Component: Delivery
    },
    {
        path: FINDUS_ROUTE,
        Component: FindUs
    },
    {
        path: GUARANTEE_ROUTE,
        Component: Guarantee
    },
    {
        path: NOTFOUND_ROUTE,
        Component: NotFoundPage
    }
]