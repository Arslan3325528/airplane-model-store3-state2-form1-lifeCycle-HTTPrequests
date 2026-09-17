import axios from "axios";


//*: NEW-3 (axios + обробка помилок (формуємо власні помилки) + async/await)
async function fetchAircrafts(name) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    console.log("🅰️xios==>✅response:", response);
    return response.data;
  } catch (error) {
    //! Помилка: 404
    if (error.response?.status === 404) {
      console.log("🅰️xios==>❌error-404", error);
      throw new Error(`Покемена з ім'ям «${name}» не існує`);
    };
    //! Помилка: 400
    if (error.response?.status === 400) {
      console.log("🅰️xios==>❌error-400:", error);
      throw new Error(`Сталася синтаксична помилка при введенні імені «${name}»`);
    };
    //! Інша помилка
    console.log("🅰️xios==>❌error-(інша помилка):", error);
    throw error;
  };
};


const api = {
  fetchAircrafts,
};

export default api;
