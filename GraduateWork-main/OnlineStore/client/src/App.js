import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from "./components/routes/AppRoutes";
import HighHeader from "./components/header/HighHeader";
import LowHeader from "./components/header/LowHeader";
import Footer from "./components/footer/Footer";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {TailSpin} from "react-loader-spinner";

const App = observer(() => {

    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            check().then(() => {
                user.setUser(true)
                user.setIsAuth(true)
            }).finally(() => setLoading(false))
        }, 1000)

    }, [])

    if (loading) {
        return <div className={"flex"}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 100 + "%",
                        width: 100 + "%"
                    }}>
            <TailSpin
                height="100"
                width="80"
                color="#0F3072"
                ariaLabel="tail-spin-loading"
                radius="3"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }


    return (
        <BrowserRouter>
            <HighHeader/>
            <LowHeader/>
            <AppRoutes/>
            <Footer/>
        </BrowserRouter>
    );
});

export default App;