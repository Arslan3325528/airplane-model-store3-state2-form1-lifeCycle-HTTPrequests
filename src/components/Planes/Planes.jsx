import PropTypes from 'prop-types';
import { ActualImageModal } from '@/components/ActualImageModal/ActualImageModal.jsx'; //? Модальні вікна для блока зображень з бібліотекою Yet Another React Lightbox
import defaultImage from "@/components/Planes/default.jpg"; 
import template from "@/components/Planes/template-out-of-stock.jpg";
import css from "./Planes.module.css"; 

//! Бібліотека react-icons
import { AiOutlineFlag, AiOutlineInfoCircle, AiOutlineClockCircle, AiOutlineDollarCircle } from "react-icons/ai";
import { GiArmoredBoomerang, GiCeremonialMask, GiAirplaneDeparture, GiCommercialAirplane, GiCurlyMask } from "react-icons/gi";
import { CiBadgeDollar, CiGlobe, CiAirportSign1 } from "react-icons/ci";
import { TbClockHour4Filled } from "react-icons/tb";
import { FcTrademark } from "react-icons/fc";

//! Для розрахунку тривалості виробництва (реекспорт)
import {
  getManufacturingYears,
  getAircraftTitleBgColor,
  onHighlightTextProtection, //! функція підсвічування тексту та допоміжна функція
} from '@/utils'; 

//! Константи для розмірів іконок
import { iconSize } from '@/constants';


export function Planes({
  aircraftId,
  aircraftType,
  wikipediaPage,
  urlMain = defaultImage, //! Дефолтне зображення
  urlPromotional,
  nameBrief,
  nameFull,
  nickname = "не відомо",
  year,
  countries,
  type,
  price = "немає інформації",
  description,
  modelColorsPrice,
  modelActualImages = [template],
  modelActualFullImages = [],
  manufacturingStart,
  manufacturingEnd,
  indicesArray,
  onActiveId,
  // onHighlightTextProtection, //! функція підсвічування тексту та допоміжна функція ---> ВИНОСИМО в utils
  inputSearchValue, //! значення inputSearch
  radioButtonValue, //! ⭕️ значення параметра для пошуку/фільтрації радіо-кнопки
  isCartButtonDisabled, //! 🔐 тригер блокування кнопки «Кошик»
})
{
  //! Рахуємо кількість моделей <numberModels> виходячи з наявності фактичної ціни
  const numberModels = Object.values(modelColorsPrice).filter(el => Number(el)).length;
  // console.log("📌📌📌numberModels :", numberModels);
  return (
    <>
      {/* <h3 className={css.planeTitle}>{nameBrief}</h3> */}
      <h3 className={css[getAircraftTitleBgColor(aircraftType)]}>
        {nameBrief}
        {numberModels > 1 && <span className={css.baseTitleNumberModels}>{numberModels}</span>}
      </h3>
      <a href={wikipediaPage} target="_blank" rel="noreferrer noopener"><img src={urlMain} alt={nameBrief} /></a>
      <p className={css.textField}><FcTrademark size={iconSize.md} className={css.icon} /> Повна назва: <span className={css.boldStyle} >{nameFull}</span></p>
      <p className={css.textField}><GiCommercialAirplane size={iconSize.md} className={css.icon} /> Тип: <span className={css.textFieldValue}>{type}</span></p>
      {/* <p className={css.textField}><GiCurlyMask size={iconSize.md} className={css.icon} /> Прізвисько: <span className={css.textFieldValue}>{nickname}</span></p> */}
      <p className={css.textField}><GiCurlyMask size={iconSize.md} className={css.icon} /> Прізвисько: <span className={css.textFieldValue}>{onHighlightTextProtection(nickname, inputSearchValue, radioButtonValue)}</span></p>
      {/* <p className={css.textField}><CiGlobe size={iconSize.md} className={css.icon} /> Країна виробник: <span className={css.textFieldValue}>{country}</span></p> */}
      <p className={css.textField}>
        <CiGlobe size={iconSize.md} className={css.icon} /> Країна виробник: <span className={css.textFieldValue}>
          {countries.map(
            (country, index, arr) =>
              <span key={index}>
                {country}{index === arr.length - 1 ? "" : ", "}
              </span>
          )}
      </span></p>
      <p className={css.textField}><AiOutlineClockCircle size={iconSize.md} className={css.icon} /> Рік випуску: <span className={css.textFieldValue}>{year}</span></p>
      <p className={css.textField}><TbClockHour4Filled size={iconSize.md} className={css.icon} /> Тривалість виробництва (в роках): <span className={css.textFieldValue}>{getManufacturingYears(manufacturingStart, manufacturingEnd)}</span></p>
      <p className={css.textField}><AiOutlineDollarCircle size={iconSize.md} className={css.icon} /> Ціна: <span className={css.textFieldValue}>{price}</span></p>
      <p className={css.textField}><AiOutlineInfoCircle size={iconSize.md} className={css.icon} /> Опис: <span className={css.textFieldValue}>{description}</span></p>
      {/*//! заголовок зображень */}
      <h4 className={css.imageTitles}><GiAirplaneDeparture size={iconSize.lg} className={css.iconImageTitles} /> Рекламна модель:</h4>
      <img src={urlPromotional} alt={nameBrief} className="promotionalImage" />
      {/*//! заголовок зображень */}
      <h4 className={css.imageTitles}><CiAirportSign1 size={iconSize.lg} className={css.iconImageTitles} /> Реальна модель:</h4>
      {/* //? Блок зображень без модальних вікон */}
      {/* <div className={css.actualImageBox}>
        {modelActualImages.map(item =>
          <img
            key={item} //* вже унікальний 
            src={item}
            alt={nameBrief}
            className={css.actualImage}
          />
        )}
      </div> */}
      {/* //? Модальні вікна для блока зображень з Yet Another React Lightbox */}
      <ActualImageModal
        images={modelActualImages}
        imagesFull={modelActualFullImages}
        nameBrief={nameBrief}
        nameFull={nameFull}
        description={description}
        templateImage={template}
      />
      <button
        type="button"
        // className={css.planeButton}
        //! Якщо немає в наявності або доданий в кошик
        className={
          (modelActualImages[0] === template)
            ? `${css.planeButton} ${css.buttonDisabled}` //! якщо немає в наявності
            // : css.planeButton
            : (indicesArray.includes(aircraftId)) //! якщо доданий в кошик
              ? `${css.planeButton} ${css.inCart}`
              : css.planeButton 
        }
        //! Бокування кнопки, якщо немає в наявності
        disabled={modelActualImages[0] === template || isCartButtonDisabled}

        // onClick={() => console.log("ID:", aircraftId)}
        onClick={() => onActiveId(aircraftId)}
      >
        {/* Додати до кошику */}
        {/*//! Зміна стилю кнопки, якщо товар доданий до кошику */}
        {indicesArray.includes(aircraftId)
          ? "❌ Видалити із кошика"
          : "✅ Додати до кошику"
        }
      </button>
    </>
  );
};

//! Контроль типу змінних - propTypes
Planes.propTypes = {
  aircraftId: PropTypes.string.isRequired,
  aircraftType: PropTypes.string.isRequired,
  wikipediaPage: PropTypes.string.isRequired,
  urlMain: PropTypes.string.isRequired,
  urlPromotional: PropTypes.string.isRequired,
  nameBrief: PropTypes.string.isRequired,
  nameFull: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  modelActualImages: PropTypes.array,
  modelActualFullImages: PropTypes.array,
  manufacturingStart: PropTypes.string.isRequired,
  manufacturingEnd: PropTypes.string.isRequired,
  onActiveId: PropTypes.func.isRequired
};
