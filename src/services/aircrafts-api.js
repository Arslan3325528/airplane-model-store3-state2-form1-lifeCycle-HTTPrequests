import axios from "axios";

import { aircraftsSort } from '@/utils'; //! початкове сортування на ім'я (за полем name.brief) + сортування з перенесенням відсутніх моделей у кінець списку

const BASE_URL = "http://localhost:3000/";
const ENDPOINT_AIRCRAFTS_DB = "aircraftsDB";
const ENDPOINT_AIRCRAFTS = "aircrafts";
const ENDPOINT_USERS_AIRCRAFTS = "usersAircrafts";
const ENDPOINT_USERS_AIRCRAFTS_TEST = "usersAircraftsTest";

//? запит на "http://localhost:3000/aircrafts"
export async function fetchAircrafts() {
  const url = `${BASE_URL}${ENDPOINT_AIRCRAFTS}`;

  try {
    const response = await axios.get(url);
    console.log("🅰️xios==>✅response-aircrafts:", response);
    // return response.data;
    return aircraftsSort(response.data);
  } catch (error) {
    //! Помилка: 404
    // if (error.response?.status === 404) {
    //   console.log("🅰️xios==>❌error-404", error);
    //   throw new Error(`Покемена з ім'ям «${name}» не існує`);
    // };
    //! Помилка: Відсутня відповідь сервера
    if (!error.response) {
      console.log("🅰️xios==>❌error-«Відсутня відповідь сервера»:", error.responserror);
      throw new Error(`Відсутній зв'язок з сервером DB`);
    };
    //! Інша помилка
    console.log("🅰️xios==>❌error-aircrafts(інша помилка):", error);
    // console.log("🅰️🅰️xios-інша помилка==>❌error.response:", error.response);
    // console.log("🅰️🅰️xios-інша помилка==>❌error.response?.status:", error.response?.status);
    // console.log("🅰️🅰️xios-інша помилка==>❌error.response?.data:", error.response?.data);
    throw error;
  };
};


//? запит на ""http://localhost:3000/usersAircrafts"
export async function fetchUsersAircrafts() {
  // const url = `${BASE_URL}${ENDPOINT_USERS_AIRCRAFTS}`;
  const url = `${BASE_URL}${ENDPOINT_USERS_AIRCRAFTS_TEST}`; //todo: тичасово для тесту

  try {
    const response = await axios.get(url);
    console.log("🅰️xios==>✅response-usersAircrafts:", response);
    return response.data;
  } catch (error) {
    //! Інша помилка
    console.log("🅰️xios==>❌error-usersAircrafts(інша помилка):", error);
    throw error;
  };
};

// const api = {
//   fetchAircrafts,
// };

// export default api;
