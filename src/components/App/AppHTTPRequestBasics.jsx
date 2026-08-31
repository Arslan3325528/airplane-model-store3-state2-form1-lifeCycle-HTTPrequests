// console.log(
//   "%c 6.1.Основи HTTP-запитів у React",
//   "color: white; background-color: #D33F49",
// );

import React, { Component } from "react";
import css from "./AppHTTPRequestBasics.module.css";


export class AppHTTPRequestBasics extends Component {
  state = {
    pokemon: null,
    loading: false //! індикатор завантаження (лоадер)
  };

  componentDidMount() {
    this.setState({ loading: true });

    setTimeout(() => {
      fetch("https://pokeapi.co/api/v2/pokemon/ditto")
        .then(res => res.json())
        // .then(pokemon => console.log("pokemon:", pokemon))
        .then(pokemon => this.setState({ pokemon }))
        .finally(() => this.setState({ loading: false }));
    }, 2000);
  };

  render() {
    const {
      pokemon,
      loading
    } = this.state;

    console.log("----------------------------------------------");
    console.log("🐷 Покемон:", pokemon);
    console.log("⏳ Індикатор завантаження (лоадер):", loading);
    console.log("----------------------------------------------");
    return (
      <div className={css.mainContainer} >
        {loading && <h1>Завантажуємо покемон...</h1>}
        {pokemon && (
          <div className={css.pokemonContainer}>
            Тут буде покемон після фетчу і коли він запишеться в state:
            <p><u><i>Покемон</i></u>: <b>{this.state.pokemon.name}</b></p>
          </div>
        )}
      </div>
    );
  };
};
