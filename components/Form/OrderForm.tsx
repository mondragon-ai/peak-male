import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { imPoweredRequest } from "../lib/request";
import styles from "../../styles/Home.module.css";
import { useRouter } from 'next/router';
import AddressInput from "./CustomerInputs";
import Head from "next/head";
import CustomImage from "../global/Image";
import Image from "next/image";
import ProductRow from "../Product/Product";
import { CardElement, PaymentElement } from "@stripe/react-stripe-js";
import { InitialValuesType } from "./FormSection";

export type LineItem = {
    piece: string
    high_risk: boolean,
    title: string,
    sku: string,
    price: number,
    compare_at_price: number,
    handle: string,
    options1: string,
    options2: string,
    options3: string,
    weight: number,
    variant_id: number,
    quantity: number,
    status: false,
    id: string,
    url: string,
    tags: string[]
}

export type OrderProps = {
    [key: string]: any,
    handleSubmit: any
    status: any
    isLoading: any
    message: any,
    state: InitialValuesType,
    setState: Dispatch<SetStateAction<any>>,
}

const cardOptions = {
  hidePostalCode: true,
  style: {
    base: {
      color: "#32325d",
      fontSmoothing: "antialiased",
      fontSize: "25px",
      "::placeholder": {
        color: "#aab7c4",
      },
      border: "1px solid #000",
    },
    border: "1px solid #000",
    invalid: {
      color: "#fa755a",
    },
  },
};

function OrderForm({
  elements,
  handleSubmit,
  status,
  isLoading,
  message,
  setState, 
  state
}: OrderProps) {

  const [bump, setBump] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const router = useRouter(); 
  return (
    <div className={`${styles.formCard}`}>
      <div className={`${styles.col} ${styles.formContainer}`}>

        <div className={`${styles.row}`} style={{width: "100%"}}>
          <p style={{
            fontSize: "18px",
            lineHeight: "27px",
            color: "#252525",
            textAlign: "left",
            fontWeight: "500",
            letterSpacing: "0.5px"}}>
              <span style={{
                background: "url('https://hitsdesignclients.com/Peak-Male-new/images/s1rgttxt1bg.png') left center no-repeat",
                width: "134px",
                color: "#fff",
                display: "inline-block",
                padding: "0 0 0 5px",
                fontSize: "19px",
                letterSpacing: 0}}>#1 Best Seller</span>
                 - Male Performance 
          </p>
        </div>


        <div className={`${styles.row}`} style={{width: "100%", margin: "20px auto"}}>
          <p style={{
            fontSize: "17px",
            lineHeight: "25px",
            marginTop: "13px",
            color: "#252525",
            textAlign: "left"}}>
              <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/stars.png"} alt={""} width={100} height={50} style={{
                display: "inline-block",
                verticalAlign: "middle",
                margin: "-4px 6px 0 0",
                height: "auto"
              }}  />
              Rated 4.9 by 2000+ Verified Customers 
          </p>
        </div>

        <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between"}}>
          <p style={{
            fontSize: "17px",
            fontWeight: "500",
            lineHeight: "25px",
            textAlign: "left",
            marginTop: "20px",
            color: "#252525",
            borderBottom: "1px solid #cccccc",
            padding: "0 0 11px 0"}}>
              <span style={{
                fontSize: "57px",
                color: "#17378a",
                fontWeight: "bold"}}>Peak Male</span>
              <br />
              Xtreme Test Booster 
            </p>
            <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/capsule.png"} alt={""} width={100} height={50} style={{height: "auto"}}  />
        </div>

        <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between"}}>
          <p style={{
            fontSize: "18px",
            lineHeight: "23px",
            color: "#252525",
            marginTop: "14px",
            textAlign: "left"}}>
            Awaken your inner Alpha with our powerful blend of 6 key ingredients clinically proven to 
            boost testosterone levels, increase energy, and support overall male vitality.
          </p>
        </div>


        <p style={{
          width: "100%", 
          fontSize: "20px",
          lineHeight: "26px",
          color: "#252525",
          fontWeight: "bold",
          marginTop: "25px",
          textAlign: "left"}}>
          Helps With:
        </p>

        <div className={`${styles.row}`} style={{width: "100%", justifyContent: "flex-start", marginTop: "15px"}}>
          <ul className={`${styles.helpsWith}`}>
            <li>
              <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/help-icon1.png"} alt={""} width={50} height={50} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Libido
            </li>
            <li>
              <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/help-icon2.png"} alt={""} width={50} height={50} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Libido
            </li>
            <li>
              <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/help-icon3.png"} alt={""} width={50} height={50} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Libido
            </li>
            <li>
              <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/help-icon4.png"} alt={""} width={50} height={50} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Libido
            </li>
          </ul>
        </div>

        <div className={`${styles.row} ${styles.benefitbox}`}>
          <div className={`${styles.col}`} style={{alignItems: "flex-start"}}>
            <p><Image src={"https://hitsdesignclients.com/Peak-Male-new/images/benefit-icon.png"} alt={""} width={50} height={50} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Key Benefits:</p>
            <ul>
              <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet1.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
                Boosts free testosterone levels 
              </li>
              <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet1.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
                Ramps up stamina & energy levels 
              </li>
              <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet1.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
                Increases libido & sex drive 
              </li>
              <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet1.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
                Supercharges male performance 
              </li>
              <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet1.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
                Supports lean muscle gain & strength  
              </li>
            </ul>
          </div>
          <div className={`${styles.col} ${styles.keyIngredients}`}>
            <p><Image src={"https://hitsdesignclients.com/Peak-Male-new/images/ingredient-icon.png"} alt={""} width={50} height={50} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Key Ingredients:</p>
            <ul>
              <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet2.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
              Fenugreek
              </li>
              <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet2.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
              Maca Powder
              </li>
              <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet2.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
              Tribulus Terrestris
              </li>
              <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet2.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
              Tongkat Ali
              </li>
              <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet2.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
              Panax Ginseng
              </li>
              <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet2.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
              Horny Goat Weed
              </li>
            </ul>
          </div>
        </div>

        <p className={`${styles.chooosePackage}`} id="order">Choose Your Package</p>

        <div className={`${styles.row}`} style={{width: "100%", justifyContent: "center"}}>
          <div className={`${styles.subBtn}`}>
            One Time Purchase
          </div>
          <div className={`${styles.subBtn}`} style={{margin: 0}}>
            Subscribe & <span>Save 20%</span>
          </div>
        </div>

        <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between", alignItems: "center", margin: '2rem 0'}}>
          <div className={`${styles.col} ${styles.productItem}`} >
            <h5 className={styles.pkghding}>1 Bottle</h5>
            <h6 className={styles.supplyText}>30 Day Supply</h6>
            <div  className={`${styles.row}`} style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
              <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/pkg3.png"} alt={""} width={100} height={50} style={{height: "auto", width: "100%"}}  />
            </div>
            <div className={`${styles.col}`}  style={{width: "100%"}}>
              <p className={styles.pkgprc2}>
                <span className={styles.BigPrice}>$59</span>
                <span className={styles.PriceUnit}>/per bottle</span>
              </p>
              <p className={styles.pkgtxt1}>You Save $30</p>
              <p className={styles.pkgprc1}><span className={styles.strikeout}>$89</span> <strong>$59</strong></p>
            </div>
          </div>

          <div className={`${styles.col} ${styles.productItem}`} >
            <p className={styles.pkgTophd}>BEST VALUE</p>
            <h5 className={styles.pkghding}>1 Bottle</h5>
            <h6 className={styles.supplyText}>30 Day Supply</h6>
            <div  className={`${styles.row}`} style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
              <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/pkg3.png"} alt={""} width={100} height={50} style={{height: "auto", width: "100%"}}  />
            </div>
            <p className={styles.freeship}><span>
              <Image src="https://hitsdesignclients.com/Peak-Male-new/images/chk.png" alt="" height={50} width={50} style={{height: "auto", width: "20px"}}/> Free Usa Shipping</span>
            </p>
            <div className={`${styles.col}`}  style={{width: "100%"}}>
              <p className={styles.pkgprc2}>
                <span className={styles.BigPrice}>$59</span>
                <span className={styles.PriceUnit}>/per bottle</span>
              </p>
              <p className={styles.pkgtxt1}>You Save $30</p>
              <p className={styles.pkgprc1}><span className={styles.strikeout}>$89</span> <strong>$59</strong></p>
            </div>
          </div>


          <div className={`${styles.col} ${styles.productItem}`} >
            <p className={styles.pkgTophd}>BEST VALUE</p>
            <h5 className={styles.pkghding}>1 Bottle</h5>
            <h6 className={styles.supplyText}>30 Day Supply</h6>
            <div  className={`${styles.row}`} style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
              <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/pkg3.png"} alt={""} width={100} height={50} style={{height: "auto", width: "100%"}}  />
            </div>
            <p className={styles.freeship}><span>
              <Image src="https://hitsdesignclients.com/Peak-Male-new/images/chk.png" alt="" height={50} width={50} style={{height: "auto", width: "20px"}}/> Free Usa Shipping</span>
            </p>
            <div className={`${styles.col}`}  style={{width: "100%"}}>
              <p className={styles.pkgprc2}>
                <span className={styles.BigPrice}>$59</span>
                <span className={styles.PriceUnit}>/per bottle</span>
              </p>
              <p className={styles.pkgtxt1}>You Save $30</p>
              <p className={styles.pkgprc1}><span className={styles.strikeout}>$89</span> <strong>$59</strong></p>
            </div>
          </div>
        </div>

        <p className={styles.riskFreeTxt}>Try Risk-Free 30 Day Money Back Guarantee</p>

        <div className={styles.s1btn}>
          Add to Cart & Save 45%
        </div>

        <div className={`${styles.row} ${styles.btnTxt}`}>
          <p className={styles.btnTxt1}>Ships: Within 24 Hours</p> 
          |
          <p className={styles.btnTxt}>
            <Image src="https://hitsdesignclients.com/Peak-Male-new/images/shape.png" height={50}  width={50} alt="" className={styles.hourglass} style={{width: "10px", height: "auto"}} /> 
            Stock: 58 Bottles Remaining
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
