import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Circles } from 'react-loader-spinner';

const CustomSpinner = () => {
    return (
        <div className={styles.spinnerContainer}>
            <Circles
                height="80"
                width="80"
                color="rgb(195, 81, 81)"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default CustomSpinner;