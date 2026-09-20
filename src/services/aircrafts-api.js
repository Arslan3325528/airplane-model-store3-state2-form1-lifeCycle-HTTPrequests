import axios from "axios";

import { aircraftsSort } from '@/utils'; //! початкове сортування на ім'я (за полем name.brief) + сортування з перенесенням відсутніх моделей у кінець списку

const BASE_URL = "http://localhost:3000/";
const ENDPOINT_AIRCRAFTS_DB = "aircraftsDB";
const ENDPOINT_AIRCRAFTS = "aircrafts";
const ENDPOINT_USERS_AIRCRAFTS = "usersAircrafts";
const ENDPOINT_USERS_AIRCRAFTS_TEST = "usersAircraftsTest";


export async function fetchAircrafts() {
  const url = `${BASE_URL}${ENDPOINT_AIRCRAFTS}`
  try {
    const response = await axios.get(url);
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


// const api = {
//   fetchAircrafts,
// };

// export default api;
