import css from "./PokemonInfoViewData.module.css";


export function PokemonInfoViewData({ pokemon: { name, sprites, stats } }) {
  return (
    <div className={css.pokemonContainer}>
      <p className={css.pokemonName}><u><i>Покемон</i></u>: <b>{name}</b></p>
      <img
        src={sprites.other['official-artwork'].front_default} //todo: var.3
        width="300"
        alt={name}
      />
      <ul className={css.pokemonStats}>
        {stats.map((item, index) => (
          <li key={item.stat.name}>
            <i>{index + 1}.{item.stat.name}</i>: <b>{item.base_stat}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
