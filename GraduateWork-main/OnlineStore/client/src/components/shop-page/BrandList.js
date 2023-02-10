import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const BrandList = observer(() => {
    const {device} = useContext(Context)

    /**
     * Реализация функции для кнопки "Показать еще".
     */
    const showMoreButton = () => {
        const showMore = document.querySelector('.brandbar__btn--show')
        const brandLength = document.querySelectorAll('.brandbar__list--item').length
        let item = 3

        showMore.addEventListener('click', () => {
            item += 3
            const array = Array.from(document.querySelector('.brandbar__list').children)
            const visibleItem = array.splice(0, item)

            visibleItem.forEach(element => element.classList.add('is-visible'))

            if (visibleItem.length === brandLength) {
                showMore.style.display = 'none'
            }
        })
    }

    return (
        <div className={"brandbar"}>
            <h3 className="brandbar__h3--title">Бренды устройств</h3>
            <ul className={"brandbar__list"}>
                {device.brand.map(brands =>
                    <li className={"brandbar__list--item"}
                        onClick={() => device.setSelectedBrands(brands)}
                        key={brands.id}>
                        {brands.nameBrand}
                    </li>
                )}
            </ul>
            <div className="brandbar__btn">
                <button className="brandbar__btn--show"
                        onClick={showMoreButton}>Показать еще</button>
            </div>
        </div>
    );
});

export default BrandList;