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
    pokemon: null,
    loading: false //! індикатор завантаження (лоадер)
    // error: null,
    // status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;

    if (prevName !== nextName) {
      console.log("❗️Змінилося ім'я ПОКЕМОНА");
      console.log("⏮️prevName (prevProps.pokemonName): ", prevProps.pokemonName);
      console.log("⏭️nextName (this.props.pokemonName): ", this.props.pokemonName);

      // fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonName}`);
      // fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)

      this.setState({ loading: true }); //! індикатор завантаження (лоадер)

      setTimeout(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
          .then(res => res.json())
          // .then(pokemon => console.log("pokemon:", pokemon))
          .then(pokemon => this.setState({ pokemon }))
          .finally(() => this.setState({ loading: false }));
      }, 2000);

      
      // this.setState({ status: Status.PENDING });

      // setTimeout(() => {
      //   pokemonAPI
      //     .fetchPokemon(nextName)
      //     .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
      //     .catch(error => this.setState({ error, status: Status.REJECTED }));
      // }, 3000);
    }
  }

  render() {
    const {
      pokemon,
      loading
    } = this.state;

    console.log("----------------------------------------------");
    console.log("ℹ️🐷 Покемон:", pokemon);
    console.log("⏳ Індикатор завантаження (лоадер):", loading);
    console.log("----------------------------------------------");

    return (
      <div>
        <h1>PokemonInfo</h1>
        {!pokemon && <h2>Введіть ім'я покемона</h2>}
        <p><u><i>Ім'я покемона</i></u>: <b>{this.props.pokemonName}</b></p>
        {loading && <h1>Завантажуємо покемон...</h1>}
        {pokemon && (
          <div className={css.pokemonContainer}>
            Тут буде покемон після фетчу і коли він запишеться в state:
            <p><u><i>Покемон</i></u>: <b>{pokemon.name}</b></p>
            {/* <img
              src={pokemon.url}
              width="300"
              alt={pokemon.name}
            /> */}
          </div>
        )}
      </div>
    );
  }
}
