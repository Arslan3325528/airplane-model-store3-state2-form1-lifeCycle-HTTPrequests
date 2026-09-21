// console.log(
//   "%c 6.2.Архітектура компонентів та станів з HTTP-запитами ",
//   "color: white; background-color: #D33F49",
// );

// https://pokeapi.co/
// https://pokeapi.co/api/v2/pokemon

import React, { Component } from "react";

import { PokemonForm } from '@/components/Pokemon/PokemonForm.jsx'; //! форма для отримання ім'я покемона
import { PokemonInfo } from '@/components/Pokemon/PokemonInfo.jsx'; //! компонент, який приймає ім'я покемона, робить запит та будує розмітку 
import { PokemonInfoAndErrors } from '@/components/Pokemon/PokemonInfoAndErrors.jsx'; //! /! компонент, який приймає ім'я покемона, робить запит, будує розмітку та обробляє помилки 
import { PokemonInfoAndErrorsStateMachine1 } from '@/components/Pokemon/PokemonInfoAndErrorsStateMachine1.jsx'; //! /! компонент, який приймає ім'я покемона, робить запит, будує розмітку та обробляє помилки + State Machine
import { PokemonInfoAndErrorsStateMachine21 } from '@/components/Pokemon/PokemonInfoAndErrorsStateMachine21.jsx'; //! /! компонент, який приймає ім'я покемона, робить запит, будує розмітку та обробляє помилки + State Machine (чистий код)
import { PokemonInfoAndErrorsStateMachine22 } from '@/components/Pokemon/PokemonInfoAndErrorsStateMachine22.jsx'; //! /! компонент, який приймає ім'я покемона, робить запит, будує розмітку та обробляє помилки + State Machine + Рефакторинг + React-skeleton
import { PokemonInfoAndErrorsStateMachine23 } from '@/components/Pokemon/PokemonInfoAndErrorsStateMachine23.jsx'; //! /! компонент, який приймає ім'я покемона, робить запит, будує розмітку та обробляє помилки + State Machine + Рефакторинг + React-skeleton (чистий код) 

import { ToastContainer } from 'react-toastify'; //! 01.Підлючення бібліотеки react-toastify
// https://www.npmjs.com/package/react-toasti
// https://fkhadra.github.io/react-toastify/introduction/

import css from "./AppHTTPRequestAdvanced.module.css";


export class AppHTTPRequestAdvanced extends Component {
  state = {
    pokemonName: "", //! ім'я покемона
  };

  submitForm = (pokemonName) => {
    // console.log("✅Дані з форми PokemonForm:", pokemonName);
    this.setState({
      pokemonName
    });
  };


  render() {
      const {
        pokemonName, //! 🐷 Ім'я покемона
      } = this.state;
  
      console.log("----------------------------------------------");
      console.log("✅🐷 Ім'я покемона:", pokemonName);
      console.log("----------------------------------------------");
    
      return (
        <div className={css.mainContainer} >
          {/* //! Форма для отримання ім'я покемона */}
          <PokemonForm onSubmit={this.submitForm} />

          {/* //! HTTP-запит + Розмітка */}
          {/* <PokemonInfo pokemonName={pokemonName} /> */}

          {/* //! HTTP-запит + Розмітка + Обробка помилок */}
          {/* <PokemonInfoAndErrors pokemonName={pokemonName} /> */}

          {/* //! HTTP-запит + Розмітка + Обробка помилок + State Machine */}
          {/* <PokemonInfoAndErrorsStateMachine1 pokemonName={pokemonName} /> */}

          {/* //! HTTP-запит + Розмітка + Обробка помилок + State Machine (чистий код) */}
          {/* <PokemonInfoAndErrorsStateMachine21 pokemonName={pokemonName} /> */}

          {/* //! HTTP-запит + Розмітка + Обробка помилок + State Machine + Рефакторинг + React-skeleton */}
          {/* <PokemonInfoAndErrorsStateMachine22 pokemonName={pokemonName} /> */}

          {/* //! HTTP-запит + Розмітка + Обробка помилок + State Machine + Рефакторинг + React-skeleton (чистий код) */}
          <PokemonInfoAndErrorsStateMachine23 pokemonName={pokemonName} />
          
          {/* //! 01.Підлючення бібліотеки react-toastify */}
          <ToastContainer autoClose={2000} /> 
        </div>
      );
    };
};
