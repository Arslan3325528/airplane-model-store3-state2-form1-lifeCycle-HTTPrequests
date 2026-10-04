import React, { Component } from "react";
import {
    loadData, //? метод-обгортка для отримання даних за допомогою колбек функції fetchData
    fetchUsersAircrafts,
    fetchPokemonForAircrafts
} from '@/services' //? users &  pokemon --> запити з json-server

import css from "./FormRegistration.module.css";

const INITIAL_STATE = {
    userName: "",
    userEmail: "",
    userPassword: "",
    userExperience: "",
    userAge: "",
    userLicence: false
};


export class FormRegistration extends Component {
    state = { ...INITIAL_STATE };

    //! Скидання state в початкове значення INITIAL_STATE
    reset = () => {
        this.setState({ ...INITIAL_STATE });
    };

    //? Метод-обгортка для отримання даних за допомогою колбек функції fetchData (вже є в import)
    //? Метод отримуєння масив користувачів users з json-server: "http://localhost:3000/usersAircrafts"
    // loadData = async (fetchData) => {
    //     try {
    //         return fetchData()
    //     } catch (error) {
    //         console.log("❌Помилка loadData()", error);
    //     };
    // };

    // todo: NEW
    // handleSubmit = event => {
    handleSubmit = async (event) => { //? робимо метод асинхронним 
        event.preventDefault();
        //? isActive - це тригер 🗣 активного (авторизованого) користувача ==> ВЖЕ НЕ ПОТРІБНО
        //! userAvatar - це зображення-аватар нового користувача
        //! userNickName - це це нікнейм нового користувача
        //! indicesSelectedModels - це масив індексів обраних моделей нового користувача
        // const { userName, userEmail, userPassword, userExperience, userAge, isActive = false, indicesSelectedModels = [] } = this.state; 
        const {
            userName,
            userEmail,
            userPassword,
            userExperience,
            userAge,
            // userLicence, //! не потрібна
            indicesSelectedModels = []
        } = this.state; //? NEW
        // console.log(`Name: ${userName}, ✉️E-mail: ${userEmail},🈳Password: ${userPassword}`);

        //! Перевірка на унікальність userEmail
        // const users = JSON.parse(localStorage.getItem("users")); // todo: old - завантажуємо "свіженких" users з localStorage
        // const users = await this.loadData(fetchUsersAircrafts); //? завантажуємо "свіженких" users з json-server: "http://localhost:3000/usersAircrafts"
        const users = await loadData(fetchUsersAircrafts); //? завантажуємо "свіженких" users з json-server: "http://localhost:3000/usersAircrafts" (беремо з import)
        console.log("users_db:", users); //?
        const isEmaiNotlUnique = users.some(user => user.userEmail === userEmail);
        console.log("📩Email не унікальний?:", isEmaiNotlUnique); //!
        
        if (isEmaiNotlUnique) {
            alert(`❗️Користувач з E-mail: ${userEmail} вже існує`);
            console.log(`❗️Користувач з E-mail: ${userEmail} вже існує`);
            return;
        };

        //? Створюємо значення додаткових властивостей userAvatar і userNickName
        // const pokemon = await this.loadData(fetchPokemonForAircrafts); //? завантажуємо об'єкт pokemon
        const pokemon = await loadData(fetchPokemonForAircrafts); //? завантажуємо об'єкт pokemon (беремо з import)
        console.log("❗️{🐷} Покемон-об'єкт:", pokemon);
        const userNickName = pokemon.name;
        const userAvatar = pokemon.sprites.front_default; //todo: var.1
        // const userAvatar = pokemon.sprites.other.home?.front_default; //todo: var.2
        // const userAvatar = pokemon.sprites.other['official-artwork'].front_default; //todo: var.3

        //! Підняття стану + передача state (не всього) та додаткових властивостей в App.jsx в метод submitForm
        // this.props.onSubmit({ ...this.state }); 
        // this.props.onSubmit({ userName, userEmail, userPassword, userExperience, userAge, isActive, indicesSelectedModels });
        this.props.onSubmit({
            userName,
            userEmail,
            userPassword,
            userAge,
            userExperience,
            userNickName, //? передача нової (додаткової) властивості
            userAvatar, //? передача нової (додаткової) властивості
            indicesSelectedModels
        }); 

        this.reset();  //! очищуємо поля всіх інпутів
        // this.props.onClose(); //! закриваємо модалку
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

    handleChangeCheckbox = event => {
        // console.log("event.currentTarget.checked:", event.currentTarget.checked); //!
        //! Деструктуризуємо:
        const { checked } = event.currentTarget;
        //! Зберігаємо значення checked в state
        this.setState({ userLicence: checked });
    };


    render() {
        const {
            userName,
            userEmail,
            userPassword,
            userExperience,
            userAge,
            userLicence
        } = this.state;

        console.log("------------STATE FormRegistration------------");
        console.log("🛅Значення userName:", userName);
        console.log("🛅Значення userEmail:", userEmail);
        console.log("🛅Значення userPassword:", userPassword);
        console.log("🛅Значення userExperience:", userExperience);
        console.log("🛅Значення userAge:", userAge);
        console.log("🛅Значення userLicence:", userLicence);
        console.log("______________________________________________");

        return (
            <>
                <h2 className={css.titleFormRegistration}>Реєстрація</h2>
                <form
                    className={css.formRegistration}
                    onSubmit={this.handleSubmit}
                >
                    {/*//! Ім'я, E-mail, Пароль (input) */}
                    <label className={css.labelFormRegistration}>
                        Ім'я:
                        <input
                            className={css.inputFormRegistration}
                            type="text"
                            name="userName"
                            value={userName}
                            required
                            onChange={this.handleChange}
                        />
                    </label>

                    <label className={css.labelFormRegistration}>
                        E-mail:
                        <input
                            className={css.inputFormRegistration}
                            type="email"
                            name="userEmail"
                            value={userEmail}
                            required
                            onChange={this.handleChange}
                        />
                    </label>
                    

                    <label className={css.labelFormRegistration}>
                        Пароль:
                        <input
                            className={css.inputFormRegistration}
                            type="password"
                            name="userPassword"
                            value={userPassword}
                            required
                            onChange={this.handleChange}
                        />
                    </label>
                    
                    {/*//! Ваш досвід (радіокнопки) */}
                    <h3>Ваш досвід:</h3>
                    <div className={css.radioGroupFormRegistration}>
                        <label>
                            Учень
                            <input
                                type="radio"
                                name="userExperience"
                                value="disciple"
                                checked={userExperience === "disciple"}
                                onChange={this.handleChange}
                            />
                        </label>

                        <label>
                            Майстер
                            <input
                                type="radio"
                                name="userExperience"
                                value="master"
                                checked={userExperience === "master"}
                                onChange={this.handleChange}
                            />
                        </label>

                        <label>
                            Гуру
                            <input
                                type="radio"
                                name="userExperience"
                                value="guru"
                                checked={userExperience === "guru"}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    
                    {/*//! Ваш вік (select) */}
                    <h3>Ваш вік:</h3>
                    <label>
                        {/* Ваш вік */}
                        <select
                            name="userAge"
                            value={userAge}
                            onChange={this.handleChange}
                        >
                            <option value="" disabled>...</option>
                            <option value="18-25">18-25</option>
                            <option value="26-35">26-35</option>
                            <option value="36+">36+</option>
                        </select>
                    </label>

                    {/*//! Згоден з умовами */}
                    <label>
                        Згоден з умовами
                        <input
                            type="checkbox"
                            name="userLicence"
                            checked={userLicence}
                            onChange={this.handleChangeCheckbox}
                        />
                    </label>

                    {/*//! Кнопки Submit та Cancel */}
                    <div className={css.buttonBoxFormRegistration}>
                        <button
                            className={`${css.buttonFormRegistration} ${css.registrationButton}`}
                            type="submit"
                            disabled={!userLicence} //! блокування кнопки чекбоксом
                        >
                            Submit
                        </button>

                        <button
                            className={`${css.buttonFormRegistration} ${css.cancelButton}`}
                            type="button"
                            onClick={this.props.onClose}
                        >
                            Cancel
                        </button>
                    </div >
                </form>
            </>
        );
    }
};
