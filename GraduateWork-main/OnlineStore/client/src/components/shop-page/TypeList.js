import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const TypeList = observer(() => {
    const {device} = useContext(Context)

    /**
     * Реализация функции для кнопки "Показать еще".
     */
    const showMoreButton = () => {
        const showMore = document.querySelector('.typebar__btn--show')
        const typeLength = document.querySelectorAll('.typebar__list--item').length
        let items = 4

        showMore.addEventListener('click', () => {
            items += 3
            const array = Array.from(document.querySelector('.typebar__list').children)
            const visibleItem = array.splice(0, items)

            visibleItem.forEach(element => element.classList.add('is-visible'))

            if (visibleItem.length === typeLength) {
                showMore.style.display = 'none'
            }
        })
    }

    return (
        <div className={"typebar"}>
            <h3 className="typebar__h3--title">Типы устройств</h3>
            <ul className={"typebar__list"}>
                {device.type.map(types =>
                    <li className={"typebar__list--item"}
                        onClick={() => device.setSelectedTypes(types)}
                        key={types.id}>
                        {types.nameType}
                    </li>
                )}
            </ul>
            <div className="typebar__btn">
                <button className="typebar__btn--show"
                        onClick={showMoreButton}>Показать еще</button>
            </div>
        </div>
    );
});

export default TypeList;