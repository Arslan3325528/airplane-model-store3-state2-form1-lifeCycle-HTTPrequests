import axios from "axios";

import { aircraftsSort } from '@/utils'; //! початкове сортування на ім'я (за полем name.brief) + сортування з перенесенням відсутніх моделей у кінець списку

const BASE_URL = "http://localhost:3000/aircrafts"

//*: NEW-3 (axios + обробка помилок (формуємо власні помилки) + async/await)
async function fetchAircrafts(name) {
  try {
    const response = await axios.get(BASE_URL);
    console.log("🅰️xios==>✅response:", response);
    // return response.data;
    return aircraftsSort(response.data);
  } catch (error) {
    //! Помилка: 404
    // if (error.response?.status === 404) {
    //   console.log("🅰️xios==>❌error-404", error);
    //   throw new Error(`Покемена з ім'ям «${name}» не існує`);
    // };
    //! Помилка: 400
    // if (error.response?.status === 400) {
    //   console.log("🅰️xios==>❌error-400:", error);
    //   throw new Error(`Сталася синтаксична помилка при введенні імені «${name}»`);
    // };
    //! Інша помилка
    console.log("🅰️xios==>❌error-(інша помилка):", error);
    throw error;
  };
};


const api = {
  fetchAircrafts,
};

export default api;
