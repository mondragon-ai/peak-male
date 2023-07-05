import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={`${styles.container} ${styles.mobileCol}`} style={{width: "100%"}}>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", }}>
        <Image src={"https://cdn.shopify.com/s/files/1/0697/5150/5204/files/Cam_Hanes_Logo_Retina_copy.png?v=1673552515"} alt={""} width={200} height={150} style={{width: "60%", height: "auto"}}  />
      </div>

      <div className={`${styles.textCol}`}>
        <p>All Coints Designed & Shipped in the USA</p>
        <p>Bigly Inc © 2023 - ALL RIGHTS RESERVED</p>
        <div className={`${styles.legalRow}`}>
          <a>Privacy Policy</a>
          <a>Terms of Services</a>
          <a>Contact Us</a>
        </div>
      </div>

      <div className={`${styles.textCol}`}>
        <Image src={"/images/png-google-trust.png"} alt={""} width={200} height={150} style={{width: "60%", height: "auto"}}  />
      </div>
    </div>
  );
};

export default Footer;
