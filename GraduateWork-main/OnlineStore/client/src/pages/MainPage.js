import React from 'react';
import MainCategories from "../components/main-page/MainCategories";
import TopBrands from "../components/main-page/TopBrands";
import OurSocial from "../components/main-page/OurSocial";

const MainPage = () => {
    return (
        <div className={"main"}>
            <MainCategories />
            <TopBrands />
            <OurSocial />
        </div>
    );
};

export default MainPage;