import Button from "../Button";
import styles from "./HeroBanner.module.css";
// import Image from "next/image";

const HeroBanner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bgImage}>
        <div className={styles.btnContainer}>
          <Button text="CLAIM YOUR FREE SAMPLE" />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
