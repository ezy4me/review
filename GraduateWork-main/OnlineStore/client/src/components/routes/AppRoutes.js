import React, {useContext} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../../routes";
import {NOTFOUND_ROUTE} from "../../utils/consts";
import {Context} from "../../index";

/**
 * Описание логики переходов между страницами
 * (куда может зайти не авторизованный пользователь, а куда не может).
 * @returns {JSX.Element}
 * @constructor
 */
const AppRoutes = () => {
    const {user} = useContext(Context)
    console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} exact element={<Component/>}/> // настройка пути с последующей маршрутизацией и валидацией на авторизированного пользователя
                                                                                 // (ключ нужен для того, чтобы показать, что все пути уникальны)
            )}

            {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} exact element={<Component/>}/> // настройка пути с последующей маршрутизацией без валидацией на авторизированного пользователя
                                                                                 // (ключ нужен для того, чтобы показать, что все пути уникальны)
            )}

            <Route path="*" element={<Navigate to={NOTFOUND_ROUTE} replace/>}/>
        </Routes>
    );
};

export default AppRoutes;