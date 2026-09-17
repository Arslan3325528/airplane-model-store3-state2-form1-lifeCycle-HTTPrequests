//! Початкове сортування на ім'я (за полем name.brief)

export function aircraftsSort(array) {
    array.sort((a, b) => a.name.brief.localeCompare(b.name.brief));
    //! Приклад початкового сортування за роком створення (за полем info.year)
    // array.sort((a, b) => a.info.year - b.info.year);

    //! Сортування з перенесенням відсутніх моделей у кінець списку
    const yesArr = array.filter(item => item.model.actualImages);
    const noArr = array.filter(item => !item.model.actualImages);
    array.length = 0;
    array.push(...yesArr, ...noArr);
    return array;
};


// //! Приклад початкового сортування на ім'я (за полем name.brief)
// aircrafts.sort((a, b) => a.name.brief.localeCompare(b.name.brief));
// //! Приклад початкового сортування за роком створення (за полем info.year)
// // aircrafts.sort((a, b) => a.info.year - b.info.year);

// //! Сортування з перенесенням відсутніх моделей у кінець списку
// // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
// const yesArr = aircrafts.filter(item => item.model.actualImages);
// const noArr = aircrafts.filter(item => !item.model.actualImages);
// // console.log("✅Є наявності", yesArr);
// // console.log("❌Немає в наявності", noArr);

// // aircrafts.splice(0, aircrafts.length);
// //? або
// aircrafts.length = 0;
// // console.log("0️⃣aircrafts__Після очищення:", aircrafts);

// aircrafts.push(...yesArr, ...noArr);
// // console.log("🆗aircrafts__Після кінцевого сортування:", aircrafts);
// // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");