import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';
import CardPokemon from "@/components/CardPokemon";
import InputSearch from "@/components/InputSearch";



const ListPokemon = ({ pokeData, changeViewPokedex, takeColorType }) => {
    const router = useRouter();
    const [filteredData, setFilteredData] = useState(pokeData);
    console.log(pokeData);
    const handleButtonClick = () => {
        changeViewPokedex('view2')
    }

    useEffect(() => {
        setFilteredData(pokeData);
    }, [pokeData]);

    return (
        <div className={[styles.screenPokedex]}>
            {/* <h1>Welcome to the ListPokemon</h1> */}
            <br></br>
            <InputSearch pokeData={pokeData} setFilteredData={setFilteredData} />
            <div className={styles.ContainerCardPokemon}>
                {filteredData && filteredData.length > 0 ? (
                    filteredData.map((pokemon, index) => (
                        <CardPokemon
                            key={index}
                            pokemon={pokemon}
                            index={index}
                            takeColorType={takeColorType}
                            changeViewPokedex={changeViewPokedex}
                        />
                    ))
                ) : (
                    <p>No Pokémon found</p>
                )
                }

            </div>
            {/* <button className={styles.buttonPokedex} onClick={() => changeViewPokedex('Home')}>Back</button> */}
        </div>
    );
}

export default ListPokemon;