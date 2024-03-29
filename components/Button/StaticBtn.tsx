import React, { useEffect, useState } from 'react';
import styles from "../../styles/Home.module.css";

const StaticButton = ({ scrollToElement }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window?.scrollY < 4500 || window?.scrollY == 0) {
        console.log(window?.scrollY);
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window?.addEventListener("scroll", handleScroll);

    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (isScrolled) {
    return (null);
  }

  const handleButtonClick = () => {
    const targetElement = document.getElementById(scrollToElement);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
   <div className={styles.staticButtonContainer} onClick={handleButtonClick} >
      <button className={`${styles.payBtn} ${styles.staticButton}`}>Order Now & Save 30%</button>
    </div> 
  );
};

export default StaticButton;