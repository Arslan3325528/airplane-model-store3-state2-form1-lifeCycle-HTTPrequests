import axios from "axios";


//todo: old (fetch)
// function fetchPokemon(name) {
//   return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       };
//       return Promise.reject(new Error(`Покемена з ім'ям «${name}» не існує`))
//     });
// };

//*: NEW-3 (axios + async/await + обробка помилок)
async function fetchPokemon(name) {
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
  fetchPokemon,
};

export default api;
