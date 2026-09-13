import { Component } from 'react';

import { PokemonInfoViewСontainer } from './PokemonInfoViewСontainer.jsx';
import { PokemonInfoViewPending } from './PokemonInfoViewPending.jsx';
import { PokemonInfoViewError } from './PokemonInfoViewError.jsx';
import { PokemonInfoViewData } from './PokemonInfoViewData.jsx';
import pokemonAPI from '../services/pokemon-api.js'

// import css from "./PokemonInfo.module.css";

//? Застосуємо такі статуси:
//?     - idle - запиту ще немає, нічого не відбувається
//?     - pending - пішов запит
//?     - rejected - відповідь на запит з помилкою
//?     - resolved - успішна відповідь на запит

//* Плюси використання паттерна State Machine:
//*     - Зникають проблеми скидання полів «щоб працювало».
//*     - Не слід стежити за значеннями N полів. 
//*     - Зрозуміліші умови рендеру розмітки.


export class PokemonInfoAndErrorsStateMachine23 extends Component {
  state = {
    pokemon: null, //! об'єкт з даними про покемона
    error: null, //! обробка помилок
    status: 'idle', //! статус
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName; //! ім'я покемона (оновлене)

    if (prevName !== nextName) {
      console.log("❗️Змінилося ім'я ПОКЕМОНА");
      console.log("⏮️prevName (prevProps.pokemonName): ", prevProps.pokemonName);
      console.log("⏭️nextName (this.props.pokemonName): ", this.props.pokemonName);

      this.setState({ status: 'pending' }); //! статус

      //! Робимо HTTP-запит:
      setTimeout(() => { //! імітуємо час завантаження даних
        pokemonAPI
          .fetchPokemon(nextName)
          .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 3000);
    };
  };


  render() {
    const {
      pokemonName, //! ім'я покемона
    } = this.props;

    const {
      pokemon, //! об'єкт з даними про покемона
      error, //! обробка помилок
      status, //! статус
    } = this.state;

    console.log("----------------------------------------------");
    console.log("ℹ️props-> 🐷 Покемон-ім'я:", pokemonName);
    console.log("ℹ️{🐷} Покемон-об'єкт:", pokemon);
    console.log("ℹ️❌ Помилка:", error);
    console.log("ℹ️❓ Статус:", status);
    console.log("----------------------------------------------");

    //? idle - запиту ще немає, нічого не відбувається
    if (status === 'idle') {
      return (
        <PokemonInfoViewСontainer title="PokemonInfo">
          <h2><i>Введіть ім'я покемона</i></h2>
        </PokemonInfoViewСontainer>
      );
    };

    //? pending - пішов запит
    if (status === 'pending') {
      return (
        <PokemonInfoViewСontainer title="PokemonInfo">
          <PokemonInfoViewPending pokemonName={pokemonName} />
        </PokemonInfoViewСontainer>
      );
    };

    //? rejected - відповідь на запит з помилкою
    if (status === 'rejected') {
      return (
        <PokemonInfoViewСontainer title="PokemonInfo">
          <PokemonInfoViewError errorMessage={error.message} />
        </PokemonInfoViewСontainer>
      );
    };

    //? resolved - успішна відповідь на запит
    if (status === 'resolved') {
      return (
        <PokemonInfoViewСontainer title="PokemonInfo">
          <PokemonInfoViewData pokemon={pokemon} />
        </PokemonInfoViewСontainer>
      );
    };
  };
};
