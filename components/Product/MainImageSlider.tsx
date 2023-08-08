import React from 'react';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

interface ImageSliderProps {
    mainImage: string;
    windowWidth: number;
    selectImage: (imageSrc: string) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ mainImage, windowWidth, selectImage }) => {
    return (
        <>
            <div className={styles.col} style={{ width: '100%' }}>
                <Image
                    src={mainImage !== "" ? mainImage : "https://hitsdesignclients.com/Peak-Male-new/images/sldr1.png"}
                    alt=""
                    width={5000}
                    height={5000}
                    style={{ width: windowWidth < 720 ? "250px" : "450px", height: "auto", transition: "opacity 0.5s ease-in-out" }}
                />
            </div>
            <div className={`${styles.row} ${styles.imgSliders}`}>
                <div onClick={() => selectImage("https://hitsdesignclients.com/Peak-Male-new/images/sldr1.png")}>
                    <Image
                    src="https://hitsdesignclients.com/Peak-Male-new/images/sldr1.png"
                    alt=""
                    width={500}
                    height={500}
                    style={{ width: windowWidth < 720 ? "40px" : "60px", height: "auto" }}
                    />
                </div>
                <div onClick={() => selectImage("https://hitsdesignclients.com/Peak-Male-new/images/sldr2.png")}>
                    <Image
                    src="https://hitsdesignclients.com/Peak-Male-new/images/sldr2.png"
                    alt=""
                    width={500}
                    height={500}
                    style={{ width: windowWidth < 720 ? "40px" : "60px", height: "auto" }}
                    />
                </div>
                <div onClick={() => selectImage("https://hitsdesignclients.com/Peak-Male-new/images/sldr3.png")}>
                    <Image
                    src="https://hitsdesignclients.com/Peak-Male-new/images/sldr3.png"
                    alt=""
                    width={500}
                    height={500}
                    style={{ width: windowWidth < 720 ? "40px" : "60px", height: "auto" }}
                    />
                </div>
                <div onClick={() => selectImage("https://hitsdesignclients.com/Peak-Male-new/images/sldr4.png")}>
                    <Image
                    src="https://hitsdesignclients.com/Peak-Male-new/images/sldr4.png"
                    alt=""
                    width={500}
                    height={500}
                    style={{ width: windowWidth < 720 ? "40px" : "60px", height: "auto" }}
                    />
                </div>
            </div>
        </>
    );
};

export default ImageSlider;
