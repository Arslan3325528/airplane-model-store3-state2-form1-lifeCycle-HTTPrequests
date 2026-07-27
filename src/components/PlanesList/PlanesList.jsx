import PropTypes from 'prop-types';
import css from "./PlanesList.module.css"; 
import { Planes } from '@/components/Planes/Planes.jsx'; //? Модальні вікна для блока зображень з Yet Another React Lightbox

import { getBgColorCSSModule } from '@/utils'; 


export function PlanesList({
    items,
    indicesArray,
    onActiveId,
    inputSearchValue, //! значення inputSearch
    inputSearchValueTrigger, //! тригер для коректної роботи інпуту після очищення
    // onHighlightTextProtection, //! функція підсвічування тексту та допоміжна функція ---> ВИНОСИМО в utils
    radioButtonValue, //! ⭕️Значення параметра для пошуку/фільтрації радіо-кнопки
    isCartOn, //! тригер: "якщо активна кнопка «Кошик»"
    isCartButtonDisabled, //! 🔐 тригер блокування кнопки «Кошик»
})
{
    return (
        <>
            {items.length
                ? <ul className={css.planesList}>
                    {items.map(item => 
                        <li
                            className={css[getBgColorCSSModule(item.info.year)]}
                            key={item.id}
                        >
                            <Planes
                                aircraftId={item.id}
                                aircraftType={item.aircraftType}
                                wikipediaPage={item.url.wikipedia}
                                urlMain={item.url.main}
                                urlPromotional={item.url.promotional}
                                nameBrief={item.name.brief}
                                nameFull={item.name.full}
                                nickname={item.name.nickname}
                                year={item.info.year}
                                countries={item.info.countries}
                                type={item.info.type}
                                price={item.info.price}
                                description={item.info.description}
                                modelColorsPrice={item.model.colorsPrice}
                                modelActualImages={item.model.actualImages}
                                modelActualFullImages={item.model.actualFullImages}
                                manufacturingStart={item.manufacturing.start}
                                manufacturingEnd={item.manufacturing.end}
                                onActiveId={onActiveId}
                                indicesArray={indicesArray}
                                // onHighlightTextProtection={onHighlightTextProtection} //! ---> ВИНОСИМО в utils
                                inputSearchValue={inputSearchValue} //! значення inputSearch
                                radioButtonValue={radioButtonValue} //! ⭕️ значення параметра для пошуку/фільтрації радіо-кнопки
                                isCartButtonDisabled={isCartButtonDisabled} //! 🔐 тригер блокування кнопки «Кошик»
                            />
                        </li>
                    )}
                </ul>
                : (inputSearchValue || inputSearchValueTrigger || !isCartOn)
                    ? <h2 className={css.invitation}>Нічого не знайдено... ☹️</h2> 
                    : <h2 className={css.invitation}>Додайте товар до кошику... 😉</h2>
            }
        </>
    );
};

PlanesList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    ),
};

