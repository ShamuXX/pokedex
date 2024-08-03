
import { Carousel } from "react-responsive-carousel";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";



const CarouselPokemon = ({ pokeData, load, takeColorType }) => {
    return (
        <>
            {load ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.screenPokedex}>
                    <Carousel
                        showThumbs={true}
                        autoPlay
                        showIndicators={false}
                        className={styles.carouselContainer}
                    >
                        {pokeData.map((data, index) => (
                            <div key={data.id} className={styles.containerDataPoke}>
                                <h2 className={styles.name}>
                                    {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                                </h2>
                                <p className={styles.numberPokemon}>N. ° 00{data.id}</p>
                                <img
                                    src={data.sprites.front_default}
                                    alt={data.name}
                                    className={styles.imageCarousel}
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
        </>

    )
}

export default CarouselPokemon;