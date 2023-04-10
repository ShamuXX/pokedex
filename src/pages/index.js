import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

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
                    <div>
                      <h4 className={styles.type}>
                        {data.types[0].type.name.charAt(0).toUpperCase() +
                          data.types[0].type.name.slice(1)}
                      </h4>
                    </div>

                    {data.types.length === 2 ? (
                      <div>
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
