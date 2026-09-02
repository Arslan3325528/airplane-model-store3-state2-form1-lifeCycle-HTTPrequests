import { Component } from 'react';
// import PokemonDataView from './PokemonDataView';
// import PokemonErrorView from './PokemonErrorView';
// import PokemonPendingView from './PokemonPendingView';
// import pokemonAPI from '../services/pokemon-api';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    // status: Status.IDLE,
  };

  // componentDidUpdate(prevProps, prevState) {
  //   const prevName = prevProps.pokemonName;
  //   const nextName = this.props.pokemonName;

  //   if (prevName !== nextName) {
  //     // console.log("Изменилось имя ПОКЕМОНА");
  //     // console.log("prevProps.pokemonName: ", prevProps.pokemonName);
  //     // console.log("this.props.pokemonName: ", this.props.pokemonName);

  //     // fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonName}`)

  //     this.setState({ status: Status.PENDING });


  //     setTimeout(() => {
  //       pokemonAPI
  //         .fetchPokemon(nextName)
  //         .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
  //         .catch(error => this.setState({ error, status: Status.REJECTED }));
  //     }, 3000);
  //   }
  // }

  render() {

    return (
      <div>
        <h1>PokemonInfo</h1>
        <p>{this.props.pokemonName}</p>
      </div>
    );
  }
}
