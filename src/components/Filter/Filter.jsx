// import React, { Component } from "react";
import css from "./Filter.module.css";


//? Підняття стану
//! Звичайний компонент
export function Filter({
  onAll,
  onPlanes,
  onBiplanes,
  onHelicopters,
  onCart,
  filterButton, //! візуалізація активної кнопки
  numberOfSelectedModels, //! кількість обраних моделей
  isCartButtonDisabled, //! 🔐 тригер блокування кнопки «Кошик»
})
{
  return (
    <div className={css.filterBox}>
      <button
        // className={css.buttonAllFiltration}
        className={
          filterButton === "allButton"
            ? `${css.buttonAllFiltration} ${css.active}`
            : css.buttonAllFiltration
        }
        type="button"
        onClick={onAll}
      >
        ВСІ
      </button>

      <button
        // className={css.buttonPlaneFiltration}
        className={
          filterButton === "planeButton"
            ? `${css.buttonPlaneFiltration} ${css.active}`
            : css.buttonPlaneFiltration
        }
        type="button"
        onClick={onPlanes}
      >
        Літаки
      </button>

      <button
        // className={css.buttonBiplaneFiltration}
        className={
          filterButton === "biplaneButton"
            ? `${css.buttonBiplaneFiltration} ${css.active}`
            : css.buttonBiplaneFiltration
        }
        type="button"
        onClick={onBiplanes}
      >
        Біплани
      </button>

      <button
        // className={css.buttonHelicopterFiltration}
        className={
          filterButton === "helicopterButton"
            ? `${css.buttonHelicopterFiltration} ${css.active}`
            : css.buttonHelicopterFiltration
        }
        type="button"
        onClick={onHelicopters}
      >
        Вертольоти
      </button>

      <button
        className={
          filterButton === "cartButton"
            ? `${css.buttonCartFiltration} ${css.active}`
            : css.buttonCartFiltration
        }
        type="button"
        disabled={isCartButtonDisabled} //! блокування кнопки
        onClick={onCart}
      >
        Кошик&nbsp;&nbsp;
        <span
          // className={css.quantityInCart}
          //! Зміна кольору фону, якщо кошик не пустий
          className={
            numberOfSelectedModels
              ? `${css.quantityInCart} ${css.notEmpty}`
              : css.quantityInCart
          }
        >
          {/* {88} */}
          {numberOfSelectedModels}
        </span>
      </button>
    </div>
  )
};
