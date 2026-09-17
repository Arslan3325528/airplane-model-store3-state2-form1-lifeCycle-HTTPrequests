import { Component } from 'react';

import { PokemonInfoViewСontainer } from './PokemonInfoViewСontainer.jsx';
import { PokemonInfoViewPending } from './PokemonInfoViewPending.jsx';
import { PokemonInfoViewPendingLoaders } from './PokemonInfoViewPendingLoaders.jsx'; //! + бібліотеки з Loaders (спінерами)
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

      this.setState({
        pokemon: null, //! прибираємо попереднього покемона при завантаженні наступного
        error: null, //! прибираємо можливу попередню помилку
        status: 'pending' //! статус: pending - пішов запит
      });

      //! Робимо HTTP-запит:
      setTimeout(() => { //! імітуємо час завантаження даних
        pokemonAPI
          .fetchPokemon(nextName)
          .then(pokemon =>
            this.setState({
              pokemon,
              error: null, //! прибираємо можливу попередню помилку
              status: 'resolved' //! статус: resolved - УСПІШНА відповідь на запит
            }))
          .catch(error =>
            this.setState({
              pokemon: null, //! прибираємо попереднього покемона якщо відповідь з ПОМИЛКОЮ
              error,
              status: 'rejected' //! статус: rejected - відповідь на запит з ПОМИЛКОЮ
            }));
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
        <PokemonInfoViewСontainer title="Pokemon Info">
          <h2><i>Введіть ім'я покемона</i></h2>
        </PokemonInfoViewСontainer>
      );
    };

    //? pending - пішов запит
    if (status === 'pending') {
      return (
        <PokemonInfoViewСontainer title="Pokemon Info">
          {/* <PokemonInfoViewPending pokemonName={pokemonName} /> */}
          {/* //! + Бібліотеки з Loaders (спінерами) */}
          <PokemonInfoViewPendingLoaders pokemonName={pokemonName} />
        </PokemonInfoViewСontainer>
      );
    };

    //? rejected - відповідь на запит з помилкою
    if (status === 'rejected') {
      return (
        <PokemonInfoViewСontainer title="Pokemon Info">
          <PokemonInfoViewError errorMessage={error.message} />
        </PokemonInfoViewСontainer>
      );
    };

    //? resolved - успішна відповідь на запит
    if (status === 'resolved') {
      return (
        <PokemonInfoViewСontainer title="Pokemon Info">
          <PokemonInfoViewData pokemon={pokemon} />
        </PokemonInfoViewСontainer>
      );
    };
  };
};
