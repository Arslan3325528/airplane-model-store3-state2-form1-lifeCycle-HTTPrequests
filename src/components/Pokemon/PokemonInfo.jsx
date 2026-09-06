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

export class PokemonInfo extends Component {
  state = {
    pokemon: null, //! об'єкт з даними про Покемона
    loading: false, //! індикатор завантаження (лоадер)
    pokemonNameChange: false, //! тригер/індикатор зміни імені покемона
    // error: null,
    // status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName; //! ім'я покемона (оновлене)

    if (prevName !== nextName) {
      console.log("❗️Змінилося ім'я ПОКЕМОНА");
      console.log("⏮️prevName (prevProps.pokemonName): ", prevProps.pokemonName);
      console.log("⏭️nextName (this.props.pokemonName): ", this.props.pokemonName);

      // fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonName}`);
      // fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)

      this.setState({
        loading: true, //! індикатор завантаження (лоадер)
        pokemonNameChange: true //! тригер/індикатор зміни імені покемона
      }); 


      setTimeout(() => { //! імітуємо час завантаження даних
        fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
          .then(res => res.json())
          // .then(pokemon => console.log("pokemon:", pokemon))
          .then(pokemon => this.setState({ pokemon }))
          .finally(() => this.setState({
            loading: false, //! індикатор завантаження (лоадер)
            pokemonNameChange: false //! тригер/індикатор зміни імені покемона
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
      pokemon, //! об'єкт з даними про Покемона
      loading, //! індикатор завантаження (лоадер)
      pokemonNameChange, //! тригер/індикатор зміни імені покемона
    } = this.state;

    console.log("----------------------------------------------");
    console.log("ℹ️🐷 Покемон:", pokemon);
    console.log("⏳ Індикатор завантаження (лоадер):", loading);
    console.log("⏳ Тригер/індикатор зміни імені покемона:", pokemonNameChange);
    console.log("----------------------------------------------");

    return (
      <div className={css.pokemonInfo}>
        <h1>PokemonInfo</h1>

        {/* {!pokemon && <h2><i>Введіть ім'я покемона</i></h2>} */}
        {!pokemon && !loading && <h2><i>Введіть ім'я покемона</i></h2>}

        {/* <h2><u><i>Ви ввели ім'я покемона</i></u>: <b>{this.props.pokemonName}</b></h2> */}
        {/* {pokemonNameChange && <h2><u><i>Ви ввели ім'я покемона</i></u>: <b>{this.props.pokemonName}</b></h2>} */}
        {loading && <h2><u><i>Ви ввели ім'я покемона</i></u>: <b>{pokemonName}</b></h2>}

        {loading && <h2 className={css.pokemonInfoLoading}>Завантажуємо покемон...</h2>}

        {/* {pokemon && ( */}
        {pokemon && !loading &&(
          <div className={css.pokemonContainer}>
            Тут з'явитися покемон після фетчу і коли він запишеться в state:
            <p><u><i>Покемон</i></u>: <b>{pokemon.name}</b></p>
            <img
              // src={pokemon.sprites.front_default} //todo: var.1
              // src={pokemon.sprites.other.home.front_default} //todo: var.2
              src={pokemon.sprites.other['official-artwork'].front_default} //todo: var.3
              width="300"
              alt={pokemon.name}
            />
          </div>
        )}
      </div>
    );
  };
}
