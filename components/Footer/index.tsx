import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    if (!window) {};
    setWindowWidth(window.innerWidth);
  }, []);
  return (
    <div className={`${styles.container} ${styles.mobileCol}`} style={{width: "100%", background: "white"}}>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", width: windowWidth < 720 ? "100%" : "20%" }}>
        <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/logo.png"} alt={""} width={500} height={500} style={{width: "150px", height: "auto"}}  />
      </div>

      <div className={`${styles.textCol}`}  style={{width: windowWidth < 720 ? "90%" : "60%" }}>
        {/* <p>All Coints Designed & Shipped in the USA</p> */}
        <p>Copyright © 2023 Optimal Human. All Rights Reserved</p>
        <p>*These statements have not been evaluated by the Food and Drug Administration. <br />
This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
        <div className={`${styles.legalRow}`}>
          <a>Privacy Policy</a>
          <a>Terms of Services</a>
          <a>Contact Us</a>
        </div>
      </div>

      <div className={`${styles.textCol}`}  style={{width: windowWidth < 720 ? "90%" : "20%" }}>
        <Image src={"/images/png-google-trust.png"} alt={""} width={200} height={150} style={{width: "60%", height: "auto"}}  />
      </div>
    </div>
  );
};

export default Footer;
