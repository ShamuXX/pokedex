import React, { useEffect, useState } from "react";
import styles from "@/components/InputSearch/inputSearch.module.css"
const InputSearch = ({ pokeData, setFilteredData }) => {
    const [valueInput, setValueInput] = useState('');
    const [foundPokemon, setFoundPokemon] = useState(null);

    const handleInputChange = (e) => {
        const value = e.target.value.toLowerCase();
        setValueInput(value);

        const filtered = pokeData.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
    };


    return (
        <div className={styles.containerInput}>
            <h4 className={styles.title}>Buscar Pokemon [Escribe Nombre]</h4>

            <input
                className={styles.input}
                name="searchPokemon"
                placeholder="Please enter a pokemon"
                onChange={(e) => handleInputChange(e)}
                value={valueInput}
            />
        </div>
    )
}

export default InputSearch;