import axios from "axios";

import { aircraftsSort } from '@/utils'; //! початкове сортування на ім'я (за полем name.brief) + сортування з перенесенням відсутніх моделей у кінець списку

//? Константи для створення url:
const BASE_URL = "http://localhost:3000/";

const ENDPOINT_AIRCRAFTS_DB = "aircraftsDB"; //* незмінна DB (тільки для читання), для оновлення карток в початковий стан

const ENDPOINT_AIRCRAFTS = "aircrafts";
// const ENDPOINT_AIRCRAFTS = "aircrafts1"; //! ❌ викликає помилку 404

const ENDPOINT_USERS_AIRCRAFTS = "usersAircrafts";
// const ENDPOINT_USERS_AIRCRAFTS = "usersAircrafts1"; //! ❌ викликає помилку 404

const ENDPOINT_USERS_AIRCRAFTS_TEST = "usersAircraftsTest"; //todo: тестова DB для налаштування логіки запитів
// const ENDPOINT_USERS_AIRCRAFTS_TEST = "usersAircraftsTest1"; //! ❌ викликає помилку 404


//? Запит на "http://localhost:3000/aircrafts"
export async function fetchAircrafts() {
  const url = `${BASE_URL}${ENDPOINT_AIRCRAFTS}`;

  try {
    const response = await axios.get(url);
    console.log("🅰️xios==>✅response-aircrafts:", response);
    // return response.data;
    return aircraftsSort(response.data);
  } catch (error) {
    //! Помилка: Відсутня відповідь сервера
    if (!error.response) {
      console.log("🅰️xios==>❌error-aircrafts(Відсутня відповідь сервера):", error.response);
      throw new Error(`Відсутній зв'язок з сервером aircrafts-DB`);
    };
    //! Помилка: 404
    if (error.response?.status === 404) {
      console.log("🅰️xios==>❌error-aircrafts(404)", error);
      throw new Error(` Сервер не може знайти дані згідно з запитом: «${url}» ❓🙅‍♂️`);
    };
    //! Помилка: Інша помилка
    console.log("🅰️xios==>❌error-aircrafts(Інша помилка):", error);
    // console.log("🅰️🅰️xios==>❌error-aircrafts(Інша помилка)❌error.response:", error.response);
    // console.log("🅰️🅰️🅰️xios==>❌error-aircrafts(Інша помилка)❌error.response?.status:", error.response?.status);
    // console.log("🅰️🅰️🅰️xios==>❌error-aircrafts(Інша помилка)❌error.response?.data:", error.response?.data);
    throw error;
  };
};


//? Запит на "http://localhost:3000/usersAircrafts"
export async function fetchUsersAircrafts() {
  // const url = `${BASE_URL}${ENDPOINT_USERS_AIRCRAFTS}`;
  const url = `${BASE_URL}${ENDPOINT_USERS_AIRCRAFTS_TEST}`; //todo: тестова DB для налаштування логіки запитів

  try {
    const response = await axios.get(url);
    console.log("🅰️xios==>✅response-usersAircrafts:", response);
    return response.data;
  } catch (error) {
    //! Помилка: Відсутня відповідь сервера
    if (!error.response) {
      console.log("🅰️xios==>❌error-usersAircrafts(Відсутня відповідь сервера):", error.response);
      throw new Error(`Відсутній зв'язок з сервером users-DB`);
    };
    //! Помилка: 404
    if (error.response?.status === 404) {
      console.log("🅰️xios==>❌error-usersAircrafts(404)", error);
      throw new Error(` Сервер не може знайти дані згідно з запитом: «${url}» ❓🤷‍♀️`);
    };
    //! Помилка: Інша помилка
    console.log("🅰️xios==>❌error-usersAircrafts(Інша помилка):", error);
    // console.log("🅰️🅰️xios==>❌error-usersAircrafts(Інша помилка)❌error.response:", error.response);
    // console.log("🅰️🅰️🅰️xios==>❌error-usersAircrafts(Інша помилка)❌error.response?.status:", error.response?.status);
    // console.log("🅰️🅰️🅰️xios==>❌error-usersAircrafts(Інша помилка)❌error.response?.data:", error.response?.data);
    throw error;
  };
};
