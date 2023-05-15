import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={`${styles.container} ${styles.mobileCol}`} style={{width: "100%"}}>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", }}>
        <Image src={"/images/htl-logo-3-crop.png"} alt={""} width={200} height={150} style={{width: "60%", height: "auto"}}  />
      </div>

      <div className={`${styles.textCol}`}>
        <p>All Coints Designed & Shipped in the USA</p>
        <p>HOLD THE LINE © 2023 - ALL RIGHTS RESERVED</p>
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
