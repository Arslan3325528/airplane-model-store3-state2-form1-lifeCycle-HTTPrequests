import { Component } from 'react';
// import PokemonDataView from './PokemonDataView';
// import PokemonErrorView from './PokemonErrorView';
// import PokemonPendingView from './PokemonPendingView';
// import pokemonAPI from '../services/pokemon-api';

import css from "./PokemonInfo.module.css";

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };


export class PokemonInfoAndErrorsStateMachine extends Component {
  state = {
    pokemon: null, //! об'єкт з даними про покемона
    loading: false, //! індикатор завантаження (лоадер)
    error: null, //todo: Обробка помилок
    // status: Status.IDLE,
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
        loading: true, //! індикатор завантаження (лоадер)
        error: null, //todo: Обробка помилок - прибираємо можливу попередню помилку
      }); 

      //! Робимо HTTP-запит:
      setTimeout(() => { //! імітуємо час завантаження даних
        fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
          // .then(res => res.json())
          // todo: Обробка помилок
          .then(response => {
            if (response.ok) {
              return response.json()
            };
            return Promise.reject(new Error(`Покемена з ім'ям ${nextName} не існує`))
          })
          // .then(pokemon => console.log("pokemon:", pokemon))
          .then(pokemon => this.setState({
            pokemon,
            error: null, // todo: Обробка помилок
          }))
          .catch(error => this.setState({
            pokemon: null,
            error
          })) //todo: Обробка помилок
          .finally(() => this.setState({
            loading: false, //! індикатор завантаження (лоадер)
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
      loading, //! індикатор завантаження (лоадер)
      error, //todo: Обробка помилок
    } = this.state;

    console.log("----------------------------------------------");
    console.log("ℹ️props-> 🐷 Покемон-ім'я:", pokemonName);
    console.log("ℹ️{🐷} Покемон-об'єкт:", pokemon);
    console.log("ℹ️⏳ Індикатор завантаження (лоадер):", loading);
    console.log("ℹ️❌ Помилка:", error);
    console.log("----------------------------------------------");

    return (
      <div className={css.pokemonInfo}>
        <h1>PokemonInfo</h1>

        {/* //todo: Обробка помилок */}
        {error && <h2>{error.message}</h2>}

        {/* //todo: Обробка помилок */}
        {!pokemon && !loading && !error && <h2><i>Введіть ім'я покемона</i></h2>}

        {loading && <h2><u><i>Ви ввели ім'я покемона</i></u>: <b>{pokemonName}</b></h2>}

        {loading && <h2 className={css.pokemonInfoLoading}>Завантажуємо покемон...</h2>}

        {pokemon && (
          <div className={css.pokemonContainer}>
            <p className={css.pokemonName}><u><i>Покемон</i></u>: <b>{pokemon.name}</b></p>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default} //todo: var.3
              width="300"
              alt={pokemon.name}
            />
          </div>
        )}
      </div>
    );
  };
};
