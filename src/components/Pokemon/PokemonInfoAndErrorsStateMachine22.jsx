import { Component } from 'react';
// import PokemonDataView from './PokemonDataView';
// import PokemonErrorView from './PokemonErrorView';
// import PokemonPendingView from './PokemonPendingView';
// import pokemonAPI from '../services/pokemon-api';

import css from "./PokemonInfo.module.css";

//? Застосуємо такі статуси:
//?     - idle - запиту ще немає, нічого не відбувається
//?     - pending - пішов запит
//?     - rejected - відповідь на запит з помилкою
//?     - resolved - успішна відповідь на запит

//* Плюси використання паттерна State Machine:
//*     - Зникають проблеми скидання полів «щоб працювало».
//*     - Не слід стежити за значеннями N полів. 
//*     - Зрозуміліші умови рендеру розмітки.

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   REJECTED: 'rejected',
//   RESOLVED: 'resolved',
// };


export class PokemonInfoAndErrorsStateMachine22 extends Component {
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
        fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
          .then(response => {
            if (response.ok) {
              return response.json()
            };
            return Promise.reject(new Error(`Покемена з ім'ям «${nextName}» не існує`))
          })
          .then(pokemon =>
            this.setState({
              pokemon,
              status: 'resolved', //! статус 
            }))
          //todo: Обробка помилок
          .catch(error =>
            this.setState({
              error,
              status: 'rejected', //! статус 
            }));
      }, 3000);


      // this.setState({ status: Status.PENDING });

      // setTimeout(() => { //! імітуємо час завантаження даних
      //   pokemonAPI
      //     .fetchPokemon(nextName)
      //     .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
      //     .catch(error => this.setState({ error, status: Status.REJECTED }));
      // }, 3000);
    }
  }


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

    //? Застосуємо такі статуси:
    //?     - idle - запиту ще немає, нічого не відбувається
    //?     - pending - пішов запит
    //?     - rejected - відповідь на запит з помилкою
    //?     - resolved - успішна відповідь на запит

    //? idle - запиту ще немає, нічого не відбувається
    if (status === 'idle') {
      // return <div>Введите имя покемона.</div>;
      return (
        <div className={css.pokemonInfo}>
          <h1>PokemonInfo</h1>
          <h2><i>Введіть ім'я покемона</i></h2>
        </div>
      );
    };

    //? pending - пішов запит
    if (status === 'pending') {
      // return <PokemonPendingView pokemonName={pokemonName} />;
      return (
        <div className={css.pokemonInfo}>
          <h1>PokemonInfo</h1>
          <h2><u><i>Ви ввели ім'я покемона</i></u>: <b>{pokemonName}</b></h2>
          <h2 className={css.pokemonInfoLoading}>Завантажуємо покемон...</h2>
        </div>
      );
    };

    //? rejected - відповідь на запит з помилкою
    if (status === 'rejected') {
      // return <PokemonErrorView message={error.message} />;
      return (
        <div className={css.pokemonInfo}>
          <h1>PokemonInfo</h1>
          <h2 className={css.pokemonInfoTitleError}>{error.message}</h2>
        </div>
      );
    };

    //? resolved - успішна відповідь на запит
    if (status === 'resolved') {
      // return <PokemonDataView pokemon={pokemon} />;
      return (
        <div className={css.pokemonInfo}>
          <h1>PokemonInfo</h1>
          <div className={css.pokemonContainer}>
            <p className={css.pokemonName}><u><i>Покемон</i></u>: <b>{pokemon.name}</b></p>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default} //todo: var.3
              width="300"
              alt={pokemon.name}
            />
          </div>
        </div>
      );
    };
  };
};
