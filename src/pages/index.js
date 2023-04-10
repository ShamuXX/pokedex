import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
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

export default function Home() {
  const [poke, setPoke] = useState([]);
  const [result, setResult] = useState([]);
  const [load, setLoad] = useState(true);
  const arr = [];

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=50")
      .then((response) => response.json())
      .then((data) =>
        setResult(
          data.results.map((item) => {
            fetch(item.url)
              .then((response) => response.json())
              .then((allpokemon) => arr.push(allpokemon));
            setPoke(arr);
          })
        )
      );
  }, []);

  setTimeout(() => {
    setLoad(false);
  }, 1000);

  return (
    <div className={styles.container}>
      <h1>Pokedex</h1>
      <div className={styles.pokedex}>
        {load ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.screenPokedex}>
            <Carousel
              showThumbs={true}
              autoPlay
              showIndicators={false}
              width="100%"
            >
              {poke.map((data, index) => (
                <div key={data.id} className={styles.containerImgPoke}>
                  <h2 className={styles.name}>
                    {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                  </h2>
                  <img
                    src={data.sprites.front_default}
                    alt={data.name}
                    width={100}
                  />

                  <div className={styles.cointainerTypes}>
                    <div
                      style={{
                        background: takeColorType(data.types[0].type.name),
                        width: "80px",
                        marginRight: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      <h4 className={styles.type}>
                        {data.types[0].type.name.charAt(0).toUpperCase() +
                          data.types[0].type.name.slice(1)}
                      </h4>
                    </div>

                    {data.types.length === 2 ? (
                      <div
                        style={{
                          background: takeColorType(data.types[1].type.name),
                          width: "80px",
                          borderRadius: "10px",
                        }}
                      >
                        <h4 className={styles.type}>
                          {data.types[1].type.name.charAt(0).toUpperCase() +
                            data.types[1].type.name.slice(1)}
                        </h4>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}
