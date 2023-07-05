import React, { ReactNode, useEffect } from 'react';
import styles from "../../styles/Home.module.css";

interface ParallaxProps {
    children: ReactNode;
    customId: string;
    yOffset: number;
    bckImage?: string;
  }

const Parallax: React.FC<ParallaxProps> = ({children, bckImage, customId, yOffset}) => {
  console.log(bckImage);
  useEffect(() => {
    const parallaxContainer = document.getElementById('parallax-container');
    const parallaxImage = document.getElementById(customId)//'parallax-image');
    if (parallaxImage) {parallaxImage.style.backgroundImage = `url('${bckImage}')`};

    const handleParallax = () => {
      const scrollPosition = (window.scrollY-yOffset);
      if (parallaxImage) {
        parallaxImage.style.transform = `translateY(${scrollPosition * 0.15}px)`;
      }
    };

    window.addEventListener('scroll', handleParallax);

    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return (
    <div className={styles.parallaxContainer} id="parallax-container">
      <div className={styles.parallaxImage} id={customId} />
      {children}
    </div>
  );
};

export default Parallax;
