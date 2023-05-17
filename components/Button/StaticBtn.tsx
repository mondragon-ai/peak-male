import React from 'react';
import styles from "../../styles/Home.module.css";

const StaticButton = ({scroll}: any) => {
  return (
    <div className={styles.staticButtonContainer} onClick={() => scroll()} >
      <button className={`${styles.payBtn} ${styles.staticButton}`}>Order Now & Save 30%</button>
    </div>
  );
};

export default StaticButton;