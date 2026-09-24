import React, { Component } from "react";
import { fetchUsersAircrafts } from '@/services' //!  tusers --> запити з json-server

import css from "./FormIdentification.module.css";

const INITIAL_STATE = {
    userEmail: "",
    userPassword: "",
};


export class FormIdentification extends Component {
    state = { ...INITIAL_STATE };

    //! Скидання state в початкове значення INITIAL_STATE
    reset = () => {
        this.setState({ ...INITIAL_STATE });
    };

    //? Метод для отримання масиву користувачів users з json-server: "http://localhost:3000/usersAircrafts"
    loadInitialData = async () => {
        try {
            return fetchUsersAircrafts()
        } catch (error) {
            console.log("❌", error);
        };
    };

    // todo: NEW
    // handleSubmit = event => {
    handleSubmit = async (event) => { //? робимо метод асинхронним 
        event.preventDefault();
        //! isActive - це тригер 🗣 активного (авторизованого) користувача
        const { userEmail, userPassword } = this.state;
        // console.log(`✉️E-mail: ${userEmail},🈳Password: ${userPassword}`);

        //! Перевірка на наявність userEmail (Ідентифікація)
        // const users = JSON.parse(localStorage.getItem("users")); // todo: old - завантажуємо "свіженких" users з localStorage
        const users = await this.loadInitialData(); //? завантажуємо "свіженких" users з json-server: "http://localhost:3000/usersAircrafts"
        console.log("users:", users); //?
        const isEmail = users.some(user => user.userEmail === userEmail);
        console.log("📩Такий Email є в db?:", isEmail); //!

        if (!isEmail) {
            alert(`Користувач з таким E-mail: ${userEmail} відсутній☹️`);
            console.log(`Користувач з таким E-mail: ${userEmail} відсутній☹️`);
            return;
        };

        //! Перевірка Пароля (Аутентифікація)
        const user = users.find(user => user.userEmail === userEmail);
        console.log("🤷🏻‍♂️user:", user); //!

        if (user.userPassword !== userPassword) {
            alert(`Введений неправильний пароль☹️☹️`);
            console.log(`Введений неправильний пароль☹️☹️`);
            return;
        };
        alert(`Вітаю Вас, ${user.userName} 😊 \nІдентифікація/Аутентифікація пройдена ✅`);
        // this.props.onAccountLogin({ ...this.state }); //! підняття стану + передача state в App.jsx
        this.props.onAccountLogin(userEmail, users); //? new: підняття стану + передача state в App.jsx
        this.reset();  //! очищуємо поля всіх інпутів
        this.props.onClose(); //todo: var.1 закриваємо модалку  
    };

    handleChange = event => {
        // console.log("event.currentTarget:", event.currentTarget); //!
        // console.log("event.currentTarget.name:", event.currentTarget.name); //!
        // console.log("event.currentTarget.value:", event.currentTarget.value); //!

        //! Деструктуризуємо:
        const { name, value } = event.currentTarget;
        //! Зберігаємо значення інпутів в state, використовуючи властивості об'єкта, що обчислюються
        this.setState({
            [name]: value,
        });
    };


    render() {
        const {
            userEmail,
            userPassword,

        } = this.state;

        console.log("-----------STATE FormIdentification-----------");
        console.log("🛅Значення userEmail:", userEmail);
        console.log("🛅Значення userPassword:", userPassword);
        // console.log("!true || !false:", !true || !false);
        console.log("______________________________________________");

        return (
            <>
                <h2 className={css.titleFormIdentification}>Ідентифікація/Аутентифікація</h2>
                <form
                    className={css.formIdentification}
                    onSubmit={this.handleSubmit}
                >
                    {/*//! E-mail, Пароль (input) */}
                    <label className={css.labelFormIdentification}>
                        E-mail:
                        <input
                            className={css.inputFormIdentification}
                            type="email"
                            name="userEmail"
                            value={userEmail}
                            required
                            onChange={this.handleChange}
                        />
                    </label>


                    <label className={css.labelFormIdentification}>
                        Пароль:
                        <input
                            className={css.inputFormIdentification}
                            type="password"
                            name="userPassword"
                            value={userPassword}
                            required
                            onChange={this.handleChange}
                        />
                    </label>

                    {/*//! Кнопки Login та Cancel */}
                    <div className={css.buttonBoxFormIdentification}>
                        <button
                            className={`${css.buttonFormIdentification} ${css.loginButton}`}
                            type="submit"
                            disabled={!userEmail || !userPassword} //! додаткове блокування кнопки Login
                        // disabled={!true || !true} 
                        >
                            Login
                        </button>

                        <button
                            className={`${css.buttonFormIdentification} ${css.cancelButton}`}
                            type="button"
                            onClick={this.props.onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </>
        );
    }
};
