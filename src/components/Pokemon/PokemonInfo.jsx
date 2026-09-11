import { Component } from 'react';
import css from "./PokemonInfo.module.css";


export class PokemonInfo extends Component {
  state = {
    pokemon: null, //! об'єкт з даними про покемона
    loading: false, //! індикатор завантаження (лоадер)
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName; //! ім'я покемона (оновлене)

    if (prevName !== nextName) {
      console.log("❗️Змінилося ім'я ПОКЕМОНА");
      console.log("⏮️prevName (prevProps.pokemonName): ", prevProps.pokemonName);
      console.log("⏭️nextName (this.props.pokemonName): ", this.props.pokemonName);

      // fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonName}`);
      // fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)

      this.setState({
        pokemon: null, //? var.2 прибираємо попереднього покемона при завантаженні наступного
        loading: true, //! індикатор завантаження (лоадер)
      }); 

      //! Робимо HTTP-запит:
      setTimeout(() => { //! імітуємо час завантаження даних
        fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
          .then(res => res.json())
          // .then(pokemon => console.log("pokemon:", pokemon))
          .then(pokemon => this.setState({ pokemon }))
          .finally(() => this.setState({
            loading: false, //! індикатор завантаження (лоадер)
          }));
      }, 3000);
    }
  }

  render() {
    const {
      pokemonName, //! ім'я покемона
    } = this.props;

    const {
      pokemon, //! об'єкт з даними про покемона
      loading, //! індикатор завантаження (лоадер)
    } = this.state;

    console.log("----------------------------------------------");
    console.log("ℹ️props-> 🐷 Покемон-ім'я:", pokemonName);
    console.log("ℹ️{🐷} Покемон-об'єкт:", pokemon);
    console.log("ℹ️⏳ Індикатор завантаження (лоадер):", loading);
    console.log("----------------------------------------------");

    return (
      <div className={css.pokemonInfo}>
        <h1>PokemonInfo</h1>

        {/* {!pokemon && <h2><i>Введіть ім'я покемона</i></h2>} */}
        {!pokemon && !loading && <h2><i>Введіть ім'я покемона</i></h2>}

        {/* <h2><u><i>Ви ввели ім'я покемона</i></u>: <b>{this.props.pokemonName}</b></h2> */}
        {loading && <h2><u><i>Ви ввели ім'я покемона</i></u>: <b>{pokemonName}</b></h2>}

        {loading && <h2 className={css.pokemonInfoLoading}>Завантажуємо покемон...</h2>}

        {/* //? var.1 прибираємо попереднього покемона при завантаженні наступного */}
        {/* {pokemon && !loading &&(  */}
        {pokemon && (
          <div className={css.pokemonContainer}>
            {/* Тут з'явитися покемон після фетчу і коли він запишеться в state: */}
            <p className={css.pokemonName}><u><i>Покемон</i></u>: <b>{pokemon.name}</b></p>
            <img
              // src={pokemon.sprites.front_default} //todo: var.1
              // src={pokemon.sprites.other.home.front_default} //todo: var.2
              src={pokemon.sprites.other['official-artwork'].front_default} //todo: var.3
              width="300"
              alt={pokemon.name}
            />
          </div>
        )}
      </div>
    );
  };
};
