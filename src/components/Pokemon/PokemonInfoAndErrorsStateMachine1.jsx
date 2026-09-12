import { Component } from 'react';

import css from "./PokemonInfo.module.css";

//? Застосуємо такі статуси:
//?     - idle - запиту ще немає, нічого не відбувається
//?     - pending - пішов запит
//?     - rejected - відповідь на запит з помилкою
//?     - resolved - успішна відповідь на запит

//* Плюси використання паттерна State Machine:
//*     - Зникають проблеми скидання полів «щоб працювало».
//*     - Не слід стежити за значеннями N полів. 
//*     - Зрозуміліші умови рендеру розмітки.


export class PokemonInfoAndErrorsStateMachine1 extends Component {
  state = {
    pokemon: null, //! об'єкт з даними про покемона
    // loading: false, //! індикатор завантаження (лоадер) - вже не потрібен
    error: null, //todo: Обробка помилок
    // status: Status.IDLE,
    status: 'idle', //! статус
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName; //! ім'я покемона (оновлене)

    if (prevName !== nextName) {
      console.log("❗️Змінилося ім'я ПОКЕМОНА");
      console.log("⏮️prevName (prevProps.pokemonName): ", prevProps.pokemonName);
      console.log("⏭️nextName (this.props.pokemonName): ", this.props.pokemonName);

      //todo: old
      // this.setState({
      //   pokemon: null, //! прибираємо попереднього покемона при завантаженні наступного
      //   // loading: true, //! індикатор завантаження (лоадер)
      //   error: null, //todo: Обробка помилок - прибираємо можливу попередню помилку
      // });
      //*: New
      this.setState({ status: 'pending' }); //! статус

      //! Робимо HTTP-запит:
      setTimeout(() => { //! імітуємо час завантаження даних
        fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
          // .then(res => res.json())
          // todo: Обробка помилок
          .then(response => {
            if (response.ok) {
              return response.json()
            };
            return Promise.reject(new Error(`Покемена з ім'ям «${nextName}» не існує`))
          })
          // .then(pokemon => console.log("pokemon:", pokemon))
          .then(pokemon =>
            this.setState({
              pokemon,
              // error: null, // todo: Обробка помилок - вже не потрібно
              status: 'resolved', //! статус 
            }))
          //todo: Обробка помилок
          .catch(error =>
            this.setState({
              // pokemon: null, // todo: вже не потрібно
              error,
              status: 'rejected', //! статус 
            }))
          .finally(() => this.setState({
            // loading: false, //! індикатор завантаження (лоадер) - вже не потрібно
          }));
      }, 3000);
    };
  };


  render() {
    const {
      pokemonName, //! ім'я покемона
    } = this.props;

    const {
      pokemon, //! об'єкт з даними про покемона
      // loading, //! індикатор завантаження (лоадер)
      error, //todo: Обробка помилок
      status, //! статус
    } = this.state;

    console.log("----------------------------------------------");
    console.log("ℹ️props-> 🐷 Покемон-ім'я:", pokemonName);
    console.log("ℹ️{🐷} Покемон-об'єкт:", pokemon);
    // console.log("ℹ️⏳ Індикатор завантаження (лоадер):", loading);
    console.log("ℹ️❌ Помилка:", error);
    console.log("ℹ️❓ Статус:", status);
    console.log("----------------------------------------------");

    //todo: old
    // return (
    //   <div className={css.pokemonInfo}>
    //     <h1>PokemonInfo</h1>

    //     {/* //todo: Обробка помилок */}
    //     {error && <h2 className={css.pokemonInfoTitleError}>{error.message}</h2>}

    //     {/* //todo: Обробка помилок */}
    //     {!pokemon && !loading && !error && <h2><i>Введіть ім'я покемона</i></h2>}

    //     {loading && <h2><u><i>Ви ввели ім'я покемона</i></u>: <b>{pokemonName}</b></h2>}

    //     {loading && <h2 className={css.pokemonInfoLoading}>Завантажуємо покемон...</h2>}

    //     {pokemon && (
    // <div className={css.pokemonContainer}>
    //   <p className={css.pokemonName}><u><i>Покемон</i></u>: <b>{pokemon.name}</b></p>
    //   <img
    //     src={pokemon.sprites.other['official-artwork'].front_default} //todo: var.3
    //     width="300"
    //     alt={pokemon.name}
    //   />
    // </div>
    //     )}
    //   </div>
    // );

    //*: New
    //? Застосуємо такі статуси:
    //?     - idle - запиту ще немає, нічого не відбувається
    //?     - pending - пішов запит
    //?     - rejected - відповідь на запит з помилкою
    //?     - resolved - успішна відповідь на запит

    //? idle - запиту ще немає, нічого не відбувається
    if (status === 'idle') {
      // return <div>Введите имя покемона.</div>;
      return (
        <div className={css.pokemonInfo}>
          <h1>PokemonInfo</h1>
          <h2><i>Введіть ім'я покемона</i></h2>
        </div>
      );
    };

    //? pending - пішов запит
    if (status === 'pending') {
      // return <PokemonPendingView pokemonName={pokemonName} />;
      return (
        <div className={css.pokemonInfo}>
          <h1>PokemonInfo</h1>
          <h2><u><i>Ви ввели ім'я покемона</i></u>: <b>{pokemonName}</b></h2>
          <h2 className={css.pokemonInfoLoading}>Завантажуємо покемон...</h2>
        </div>
      );
    };

    //? rejected - відповідь на запит з помилкою
    if (status === 'rejected') {
      // return <PokemonErrorView message={error.message} />;
      return (
        <div className={css.pokemonInfo}>
          <h1>PokemonInfo</h1>
          <h2 className={css.pokemonInfoTitleError}>{error.message}</h2>
        </div>
      );
    };

    //? resolved - успішна відповідь на запит
    if (status === 'resolved') {
      // return <PokemonDataView pokemon={pokemon} />;
      return (
        <div className={css.pokemonInfo}>
          <h1>PokemonInfo</h1>
          <div className={css.pokemonContainer}>
            <p className={css.pokemonName}><u><i>Покемон</i></u>: <b>{pokemon.name}</b></p>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default} //todo: var.3
              width="300"
              alt={pokemon.name}
            />
          </div>
        </div>
      );
    };
  };
};
