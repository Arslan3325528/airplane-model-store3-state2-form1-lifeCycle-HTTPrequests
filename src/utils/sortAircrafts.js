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
