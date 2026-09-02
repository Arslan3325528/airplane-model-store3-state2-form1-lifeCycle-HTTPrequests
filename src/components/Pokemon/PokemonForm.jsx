import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
// import { toast } from 'react-toastify';

import css from "./PokemonForm.module.css";

const INITIAL_STATE = {
    pokemonName: "", //! ім'я покемона
};


export class PokemonForm extends Component {
    state = { ...INITIAL_STATE };

    //! Скидання state в початкове значення INITIAL_STATE
    reset = () => {
        this.setState({ ...INITIAL_STATE });
    };

    handleSubmit = event => {
        event.preventDefault();

        //! Перевірка на пустий інпут
        if (this.state.pokemonName.trim() === "") {
            alert("Введіть ім'я покемона");
            // toast.error("Введіть ім'я покемона");
            return;
        };

        const { pokemonName } = this.state;
        this.props.onSubmit(pokemonName); //! підняття стану + передача pokemonName в AppHTTPRequestAdvanced.jsx
        this.reset();  //! скидання state в початкове значення та очищення поля інпуту
    };

    handleChange = event => {
        //! Деструктуризуємо:
        const { name, value } = event.currentTarget;
        //! Зберігаємо значення інпутів в state, використовуючи властивості об'єкта, що обчислюються
        this.setState({
            [name]: value.toLowerCase(),
        });
    };


    render() {
        const {
            pokemonName,
        } = this.state;

        console.log("----------------------------------------------");
        console.log("🐷 Ім'я покемона:", pokemonName);
        console.log("______________________________________________");

        return (
            <form
                className={css.pokemonForm}
                onSubmit={this.handleSubmit}
            >
                <input
                    className={css.pokemonFormInput}
                    type="text"
                    name="pokemonName"
                    value={pokemonName}
                    onChange={this.handleChange}
                />
                <button
                    className={css.pokemonButton}
                    type="submit"
                >
                    <ImSearch style={{ marginRight: 8 }} />
                    Знайти
                </button>
            </form>
        );
    }
};

