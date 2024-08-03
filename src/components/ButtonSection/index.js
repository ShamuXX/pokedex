import React from "react";
import Image from "next/image";
import styles from "../ButtonSection/styles.module.css"
const ButtonSection = ({ title, image, onClick, sizeImage }) => {
    return (
        <div className={styles.container}>
            <button className={styles.containerButton} onClick={onClick}>
                <div className={styles.containerImg}>
                    <Image src={image} alt="star" width={sizeImage} className={styles.image} />
                </div>
            </button>
            <h4 className={styles.titleButton}>{title}</h4>
        </div>
    )
}


export default ButtonSection;