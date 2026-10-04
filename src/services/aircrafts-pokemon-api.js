import axios from "axios";

import { generatesRandomNumber } from '@/utils'; //! приймає два числа a і b та повертає випадкове число в диапазоні від a до b включно

//? Константи для створення url:
const BASE_URL = "https://pokeapi.co/api/v2/";

const ENDPOINT_POKEMONS = "pokemon";
// const ENDPOINT_POKEMONS = "pokemon1"; //! ❌ викликає помилку 400

const min = 1;
const max = 1025;

//? Запит на "https://pokeapi.co/api/v2/pokemon/${generatesRandomNumber(1, 1025)}"
export async function fetchPokemonForAircrafts() {
  const pokemonId = generatesRandomNumber(min, max);
  const url = `${BASE_URL}${ENDPOINT_POKEMONS}/${pokemonId}`;

  try {
    const response = await axios.get(url);
    console.log("🅰️xios==>✅response:", response);
    return response.data;
  } catch (error) {
    //! Помилка: 404
    if (error.response?.status === 404) {
      console.log("🅰️xios==>❌error-404", error);
      throw new Error(`Покемена з ім'ям «${pokemonId}» не існує`);
    };
    //! Помилка: 400
    if (error.response?.status === 400) {
      console.log("🅰️xios==>❌error-400:", error);
      throw new Error(`Сталася синтаксична помилка при введенні імені «${pokemonId}»`);
    };
    //! Інша помилка
    console.log("🅰️xios==>❌error-(інша помилка):", error);
    throw error;
  };
};
