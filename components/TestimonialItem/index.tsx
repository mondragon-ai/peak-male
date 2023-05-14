import Image from "next/image";
import styles from "./TestimonialItem.module.css";
// import { Rate } from "antd";
import React from "react";

type DATA = {
  id: number;
  src: string;
  author: string;
  rating: number;
  title: string;
  description: string;
};

interface Iprops {
  data: DATA;
}

const TestimonialItem: React.FC<Iprops> = ({ data }) => {
  const { src, author, rating, title, description } = data;
  return (
    <div className={styles.testimonial}>
      <div className={styles.media}>
        <Image src={src} width={190} height={190} alt="" />
        <p>CBD Kush Berry Gummies - LIMITED EDITION</p>
      </div>
      <div className={styles.content}>
        <h3 className={styles.author}>{author}</h3>
        {/* <Rate
          allowHalf
          disabled
          defaultValue={Number(rating) / 2}
          style={{ color: "#FFA41C" }}
        /> */}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default TestimonialItem;
