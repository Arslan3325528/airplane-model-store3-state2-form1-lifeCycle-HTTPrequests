// console.log(
//   "%c 6.2.Архітектура компонентів та станів з HTTP-запитами ",
//   "color: white; background-color: #D33F49",
// );

// https://pokeapi.co/
// https://pokeapi.co/api/v2/pokemon

import React, { Component } from "react";
import { PokemonForm } from '@/components/Pokemon/PokemonForm.jsx';

import css from "./AppHTTPRequestAdvanced.module.css";


export class AppHTTPRequestAdvanced extends Component {
  state = {
    pokemonName: "", //! ім'я покемона
  };

  submitForm = (pokemonName) => {
    console.log("✅Дані з форми PokemonForm:", pokemonName);
    this.setState({
      pokemonName
    });
  };


  render() {
      const {
        pokemonName,
      } = this.state;
  
      console.log("----------------------------------------------");
    console.log("✅🐷 Ім'я покемона:", pokemonName);
      // console.log("✅⏳ Індикатор завантаження (лоадер):", loading);
      console.log("----------------------------------------------");
    
      return (
        <div className={css.mainContainer} >
          <PokemonForm onSubmit={this.submitForm} />
        </div>
      );
    };
};
