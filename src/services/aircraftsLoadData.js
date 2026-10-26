import {delay} from "@/utils"


//! Метод-обгортка для отримання даних за допомогою колбек функції fetchData
// loadData = async (fetchData) => {
export async function loadData(fetchData) {
  try {
    return fetchData()
  } catch (error) {
    console.log("❌Помилка loadData()", error);
  };
};


//? ❗️ Для componentDidMount:
//* todo: NEW (з розділенням логіки)
//! Завантаження початкових даних з json-server
//! Метод виконує HTTP-запити, затримку та повертає результат.
//! State тут НЕ змінюємо.
// loadInitialData = async (getAircrafts, getUsers, delayDuration) => {
export async function loadInitialData(getAircrafts, getUsers, delayDuration) {
    try {
      //! 1. Виконуємо два HTTP-запити паралельно
      const [aircrafts, users] = await Promise.all([
        getAircrafts(),
        getUsers(),
      ]);

      //! 2. Штучно затримуємо отримання результату на delayDuration секунди
      await delay(delayDuration);

      //! ✅ 3. Повертаємо успішний результат
      return {
        aircrafts,
        users,
        error: null,
      };
    } catch (error) {
      console.error("❌ Помилка завантаження початкових даних:", error);
      //! ❌ 4. Повертаємо інформацію про помилку
      return {
        aircrafts: [],
        users: [],
        error,
      };
    }
};



