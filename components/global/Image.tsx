import Image from "next/image";
import styles from "../Brand/Brand.module.css";

const CustomImage = ({ w, h, src }: { w: number;  h: number; src: string }) => {
  return (
    <div className={styles.imgContainer}>
      <Image src={src} height={h} width={w} alt="" style={{borderRadius: "6px", height: "auto"}} />
    </div>
  );
};

export default CustomImage;
