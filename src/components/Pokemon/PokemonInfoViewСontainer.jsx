import css from "./PokemonInfoViewСontainer.module.css";

//! Звичайний компонент
export function PokemonInfoViewСontainer({
    title,
    children
})
{
    return (
        <div className={css.pokemonInfo}>
            {title && <h1>{title}</h1>}
            {children}
        </div>
    )
};
