import Image from "next/image";
import styles from "./Brand.module.css";

const Brand = ({ text, src }: { text: string; src: string }) => {
  return (
    <div className={styles.container}>
      <Image src={src} height={231} width={321} alt="" />
      <div className={styles.content}>{text}</div>
    </div>
  );
};

export default Brand;
