
import React from "react";
import styles from "@/styles/Home.module.css";
import ButtonSection from "@/components/ButtonSection";
import starPokeball from "../Images/star.png";
import map from "../Images/map.png";
import player from "../Images/player.png";
import backpack from "../Images/backpack.png";


const HomePokedex = ({ pokeData, changeViewPokedex, takeColorType, Pokemon }) => {
    return (
        <div className={styles.containerHome}>
            <h1 className={styles.titleScreen}>
                Funciones
            </h1>
            <div className={styles.containerButtonsSections}>
                <ButtonSection onClick={() => changeViewPokedex('ListPokemon')} title={'Pokemon'} image={starPokeball} sizeImage={100} />
                <ButtonSection onClick={() => changeViewPokedex('CarouselPokemon')} title={'Lista Carrusel'} image={map} sizeImage={100} />
                <ButtonSection onClick={() => changeViewPokedex('CarouselPokemon')} title={'Entrenador'} image={player} sizeImage={100} />
                <ButtonSection onClick={() => changeViewPokedex('CarouselPokemon')} title={'Inventario'} image={backpack} sizeImage={65} />
            </div>
            {/* <button className={styles.buttonPokedex} onClick={() => changeViewPokedex('ListPokemon')}>
                View All Pokedex
            </button>
            <button className={styles.buttonPokedex} onClick={() => changeViewPokedex('CarouselPokemon')}>
                Carousel
            </button> */}
            {/* <button className={styles.buttonPokedex} onClick={() => changeViewPokedex('ListPokemon')}>
                View All Pokedex
            </button> */}

        </div>
    )
}


export default HomePokedex;