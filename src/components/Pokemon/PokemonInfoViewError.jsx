import errorImage from "./error-cat.jpg";
import css from "./PokemonInfoViewError.module.css";


export function PokemonInfoViewError({ errorMessage }) {
  return (
    <div role="alert">
      <img
        className={css.pokemonInfoErrorImage}
        src={errorImage}
        alt="sadcat"
      />
      <h2 className={css.pokemonInfoTitleError}>{errorMessage}</h2>
    </div>
  );
}
