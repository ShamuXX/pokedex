import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

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
      <h1>Hola</h1>
      <div className="pokedex">
        {load ? (
          <p>Loading...</p>
        ) : (
          poke.map((data, index) => (
            <div key={data.id}>
              <img src={data.sprites.front_default} />
              <h2>{data.name}</h2>
              <p>{data.types[0].type.name}</p>
              {console.log(data.types.length)}
              {data.types.length === 2 ? (
                <p>{data.types[1].type.name}</p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
