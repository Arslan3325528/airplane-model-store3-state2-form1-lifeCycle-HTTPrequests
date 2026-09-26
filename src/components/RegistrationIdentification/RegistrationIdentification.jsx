// import React, { Component } from "react";
import css from "./RegistrationIdentification.module.css";


//? Підняття стану
//! Звичайний компонент
export function RegistrationIdentification({
  onClose, //! відкриття/закриття модального вікна
  activeUser, //! 🗣 активний (авторизований) користувач
  onSignOut, //! завершення сеансу облікового запису
  loader, //! ⏳ індикатор завантаження (лоадер)
}) {
  console.log("RegistrationIdentification 🗣 Активний(авторизований) користувач:", activeUser); //!
  return (
    <div className={css.boxRegistrationIdentification}>
      {activeUser 
        ?
        <h2 className={css.titleRegistrationIdentification}>
          Вітаю вас, <span className={css.titleUserRegistrationIdentification}>{activeUser?.userName}</span>
        </h2>
        :
        <h2 className={`${css.titleRegistrationIdentification} ${css.titleReminderRegistrationIdentification}`}>
          <i>Для здійснення покупок необхідно увійти до свого акаунту ⇒</i>
        </h2>
      }
      <div className={css.buttonBoxRegistrationIdentification}>

        {!activeUser &&
          <button
            className={`${css.buttonRegistrationIdentification} ${css.buttonRegistration}`}
            type="button"
            // onClick={() => console.log('Клік в "Registration"')}
            onClick={onClose}
            // onClick={(event) => onClose(event.currentTarget.textContent)}
          >
            Registration
          </button>
        }

        {!activeUser &&
          <button
            className={`${css.buttonRegistrationIdentification} ${css.buttonLogin}`}
            type="button"
            // onClick={() => console.log('Клік в "Login"')}
            onClick={onClose}
            // onClick={(event) => onClose(event.currentTarget.textContent)}
          >
            Login
          </button>
        }

        {activeUser &&
          <button
            className={`${css.buttonRegistrationIdentification} ${css.buttonSignOut}`}
            type="button"
            onClick={onSignOut}
          >
            SignOut
          </button>
        }

      </div>
    </div>
  )
};
