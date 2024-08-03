import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Circles } from 'react-loader-spinner';
import CustomSpinner from "@/components/CustomSpinner";
import classNames from 'classnames';
import { FaStar } from "react-icons/fa6";

const DetailsPokemon = ({ pokeData, changeViewPokedex, takeColorType, Pokemon }) => {
    console.log('Data Pokemon', Pokemon);
    const [ability, setAbility] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shinyPoke, setShinyPoke] = useState(false);
    console.log(Pokemon.abilities[0].ability.name);
    useEffect(() => {
        // console.log(Pokemon.abilities[0].ability.url);
        fetch(Pokemon.abilities[0].ability.url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAbility(data);
                setTimeout(() => {
                    setLoading(false);
                }, [300])

            })
            .catch((e) => {
                console.log('Error to get API', e);
                setLoading(false);

            });
    }, [pokeData, Pokemon]);


    const handleChangeToShiny = () => {
        setShinyPoke(!shinyPoke);
        console.log(shinyPoke);

    }
    return (
        <div className={[styles.screenPokedex]}>
            {loading ?
                <CustomSpinner />
                : null}
            {/* <h2>Details Pokemon</h2> */}
            <div className={styles.containerInfoDetail}>
                <div className={styles.containerBasicInfo}>
                    <h2>{Pokemon.species.name.charAt(0).toUpperCase() + Pokemon.name.slice(1)}</h2>
                    <p className={styles.numberPokemon}>N. ° 00{Pokemon.id}</p>
                    <button className={styles.buttonStarShiny} onClick={() => handleChangeToShiny()}>
                        <FaStar size={30} style={{ color: shinyPoke ? '#E0D23E' : '#BFB8A3' }} />
                    </button>
                    <div class={styles.containerImage}>
                        <div className={styles.backgroundImage}>
                            <img
                                src={shinyPoke ? Pokemon.sprites.front_shiny : Pokemon.sprites.front_default}
                                alt={Pokemon.name}
                                width={200}
                                className={styles.image}
                            />
                        </div>
                    </div>
                    <div className={styles.containerTypesDetail} >
                        <div
                            style={{
                                background: takeColorType(Pokemon.types[0].type.name),
                                width: "80px",
                                marginRight: "10px",
                                borderRadius: "4px",

                            }}
                        >
                            <h4 className={styles.typesElementsCard}>
                                {Pokemon.types[0].type.name.charAt(0).toUpperCase() +
                                    Pokemon.types[0].type.name.slice(1)}
                            </h4>
                        </div>

                        {Pokemon.types.length === 2 ? (
                            <div
                                style={{
                                    background: takeColorType(Pokemon.types[1].type.name),
                                    width: "80px",
                                    borderRadius: "4px",
                                }}
                            >
                                <h4 className={styles.typesElementsCard}>
                                    {Pokemon.types[1].type.name.charAt(0).toUpperCase() +
                                        Pokemon.types[1].type.name.slice(1)}
                                </h4>
                            </div>
                        ) : null}
                    </div>
                </div>
                {/* <div className={styles.bottomInterface}>
                    <div className={styles.containerAbility}>
                        <h4>{Pokemon && Pokemon.abilities.length > 0 ? Pokemon.abilities[0].ability.name : 'null'}</h4>
                        <p>{ability && ability.effect_entries ? ability.effect_entries[0].short_effect : 'null'}</p>
                    </div>
                </div> */}

                <div class={styles.buttonContainer}>
                    <button className={classNames(styles.diagonalButton, styles.firstButton)}>Evolutions</button>
                    <button className={classNames(styles.diagonalButton, styles.midButton)}>Forms</button>
                    <button className={classNames(styles.diagonalButton, styles.midButton)}>Moves</button>
                    <button className={classNames(styles.diagonalButton, styles.lastButton)}>Stats</button>
                </div>
            </div>

        </div >
    )
}

export default DetailsPokemon;