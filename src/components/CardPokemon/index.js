import React, { useState } from "react";
import styles from "@/styles/Home.module.css";

const CardPokemon = ({ pokemon, index, takeColorType, changeViewPokedex }) => {
    const [Pokemon, setPokemon] = useState(pokemon);
    return (
        <button className={styles.CardElement} onClick={() => changeViewPokedex('DetailsPokemon', index, pokemon)}>
            {/* <h4>pokemon {index}</h4> */}

            <h4 className={styles.titlePokemon}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h4>

            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={100}
            />
            <div className={styles.cointainerCardTypes}>
                <div
                    style={{
                        background: takeColorType(pokemon.types[0].type.name),
                        width: "80px",
                        marginRight: "10px",
                        borderRadius: "10px",
                    }}
                >
                    <h4 className={styles.typesElementsCard}>
                        {pokemon.types[0].type.name.charAt(0).toUpperCase() +
                            pokemon.types[0].type.name.slice(1)}
                    </h4>
                </div>
                {pokemon.types.length === 2 ? (
                    <div
                        style={{
                            background: takeColorType(pokemon.types[1].type.name),
                            width: "80px",
                            borderRadius: "10px",
                        }}
                    >
                        <h4 className={styles.typesElementsCard}>
                            {pokemon.types[1].type.name.charAt(0).toUpperCase() +
                                pokemon.types[1].type.name.slice(1)}
                        </h4>
                    </div>
                ) : null}
            </div>
        </button>
    )
}

export default CardPokemon;