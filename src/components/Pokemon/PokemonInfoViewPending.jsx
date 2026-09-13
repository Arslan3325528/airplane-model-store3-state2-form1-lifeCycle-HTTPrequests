import { ImSpinner } from 'react-icons/im';
import { PokemonInfoViewData } from './PokemonInfoViewData.jsx';
import pendingImage from './pending.png';

import css from "./PokemonInfoViewPending.module.css";


export function PokemonInfoViewPending({ pokemonName }) {
  //! Для React-skeleton
  const pokemonSkeleton = {
    name: pokemonName,
    sprites: {
      other: {
        'official-artwork': {
          front_default: pendingImage,
        },
      },
    },
    stats: [],
  };

  return (
    <div role="alert">
      <h2><u><i>Ви ввели ім'я покемона</i></u>: <b>{pokemonName}</b></h2>
      <div className={css.spinnerBox}>
        <ImSpinner size="36" className={css.iconSpin} />
        <h2 className={css.pokemonInfoLoading}>Завантажуємо покемон...</h2>
      </div>
      {/* //! React-skeleton (шаблон) */}
      <PokemonInfoViewData pokemon={pokemonSkeleton} />
    </div>
  );
};
