import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from 'next/router';
import ListPokemon from "./listPokemon";
import CarouselPokemon from "./carouselPokemon";
import DetailsPokemon from "./detailsPokemon";
import HomePokedex from "./homePokedex";
import { MdGames, MdOutlineCamera } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const [pokeData, setPokeData] = useState([]);
  const [load, setLoad] = useState(true);
  const [view, setView] = useState('Home');
  const [Pokemon, setPokemon] = useState(null);

  const router = useRouter();
  // const handleButtonClick = () => {
  //   router.push('/listPokemon');
  // };
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=500")
      .then((response) => response.json())
      .then((data) => {
        const results = data.results;
        const promises = results.map((item) => {
          return fetch(item.url)
            .then((response) => response.json())
            .then((allpokemon) => allpokemon);
        });

        Promise.all(promises)
          .then((pokemons) => {
            setPokeData(pokemons);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  setTimeout(() => {
    setLoad(false);
  }, 1000);

  const changeViewPokedex = (view) => {
    setView(view);
  };

  const changeViewPokedexWithPokeInfo = (view, index, pokemon) => {
    setView(view);
    if (pokemon) {
      console.log('Setting Pokemon', pokemon);
      setPokemon(pokemon);
    } else {
      setPokemon('');
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'Home':
        return <HomePokedex pokeData={pokeData} load={load} changeViewPokedex={changeViewPokedex} takeColorType={takeColorType} />;
      case 'ListPokemon':
        return <ListPokemon pokeData={pokeData} changeViewPokedex={changeViewPokedexWithPokeInfo} takeColorType={takeColorType} />;
      case 'DetailsPokemon':
        return <DetailsPokemon pokeData={pokeData} changeViewPokedex={changeViewPokedexWithPokeInfo} takeColorType={takeColorType} Pokemon={Pokemon} />;
      case 'CarouselPokemon':
        return <CarouselPokemon pokeData={pokeData} load={load} changeViewPokedex={changeViewPokedex} takeColorType={takeColorType} />;
      default:
        return <div>Default Content</div>;
    }
  };



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pokedex</h1>
      <div className={styles.pokedex}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', height: 60, }}>
          <div style={{ width: 20, height: 20, marginLeft: 30, backgroundColor: '#E02828', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', marginBottom: 10, borderColor: '#961313', borderWidth: 3, borderStyle: 'solid' }} />
          <div style={{ width: 20, height: 20, marginLeft: 10, backgroundColor: '#DDD73A', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', marginBottom: 10, borderColor: '#A09B1A', borderWidth: 3, borderStyle: 'solid' }} />
          <div style={{ width: 20, height: 20, marginLeft: 10, backgroundColor: '#60DD3A', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', marginBottom: 10, borderColor: '#388E1D', borderWidth: 3, borderStyle: 'solid' }} />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#343232', width: 35, height: 35, borderRadius: '50%', borderColor: '#4E4D4D', borderWidth: 3, borderStyle: 'solid' }}>
            <MdOutlineCamera size={40} style={{ color: '#7E2222' }} />
          </div>
        </div>

        <div className={[styles.screenPokedex]}>
          {renderContent()}
          {/* <button className={styles.buttonPokedex} onClick={() => changeViewPokedex('ListPokemon')}>
          View All Pokedex
        </button> */}
        </div>
        <button className={styles.buttonHome} onClick={() => changeViewPokedex('Home')}>
          <MdGames size={50} style={{ marginTop: 10, color: '#7E2222' }} />
        </button>
      </div>
    </div>
  );
}

function takeColorType(type) {
  var objectColorType = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  if (objectColorType.hasOwnProperty(type)) {
    return objectColorType[type];
  } else {
    return "white";
  }
}
