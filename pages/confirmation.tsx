import { useState, useEffect, useContext } from "react";
import Footer from "../components/Footer";
import { sendPageViewEvent } from "../components/lib/analytics"; 
import Router from "next/router";
import Head from "next/head";
import { Context } from "@/context/context";
import styles from "../styles/Home.module.css";
import * as crypto from "crypto";
import Image from "next/image";
import Accordion from "@/components/global/Accordian";
import UpsellAccordion from "@/components/global/UpsellAccordion";
import { LineItem } from "@/components/Form/OrderForm";

const Confirmation = () => {
  const [globalState, setGlobalState] = useContext(Context);
  const [windowWidth, setWindowWidth] = useState(0);


  useEffect(() => {
    setWindowWidth(window? window.innerWidth : 0);
    sendPageViewEvent("CONFIRMATION"); // send page view event to google analytics

    // push 3rd party analytics
    // gtags.twitterEvent(email, price);
    // gtags.event('conversion', {
    //   'send_to': 'AW-10793712364/Knd8CNuBkpIYEOz165oo',
    //   'value': price,
    //   'currency': 'USD',
    //   'transaction_id': "txt_" + crypto.randomBytes(10).toString("hex").substring(0,10)
    // });    
  }, []);

  const line_items: [] = globalState.line_items ? globalState.line_items : []
  const bump: boolean = globalState.bump ? globalState.bump : false


  const description = `Own a piece of American pride with the Hold The Line Coin. Handcrafted from steel, this symbol of patriotism embodies strength, resilience, and the spirit of our great nation. Perfect for gifting and displaying, order your Hold The Line Coin today!!`;
  const ogImgUrl =  "https://images.clickfunnels.com/05/3daf9073c744e19ac910592c7eab5e/hold-the-line-coins-both_clipped_rev_1-cropped.png";
  const canonicalUrl = "https://hodgetwins.holdtheline.com/";
  const t = "Hold The Line - Fight For Freedom Challenge Coin" 

  return (
    <div style={{background: "grey", minHeight: "100vh"}}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>{t}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content={"artcle"} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImgUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={t} />
        
      </Head>
      <main className={`${styles.col} ${styles.confirmation}`}>

        <div className={`${styles.col}`}>
          <Image src={"/images/htl_black.png"} alt={""} width={300} height={300} style={{width: "350px", height: "auto"}} />
          {/* <h3 style={{color: "black"}}>Your Order Is Currently Being Processed</h3> */}
        </div>

        <div className={`${styles.col} ${styles.confHeader}`} style={{textAlign: "center"}}>
          <h3>Your Order Is Currently Being Processed</h3>
        </div>

        <div className={`${styles.col}`} style={{justifyContent: "space-between", width: "90%", margin: "1rem 0"}}>
          <div className={`${styles.row}`} style={{justifyContent: "space-between", width: "90%"}}>
            <h5 style={{color: "black"}}>Product</h5>
            <h5 style={{color: "black"}}>Price</h5>
          </div>
          <div className={`${styles.row}`} style={{width: "100%", padding: "1rem", justifyContent: "center"}} ><hr style={{width: "100%"}} /></div>
          {line_items && line_items.map((li: LineItem) => {
            return (
              <div key={li.variant_id} className={`${styles.row}`} style={{justifyContent: "space-between", width: "90%", padding: "0.5rem 0"}}>
                <h5 style={{color: "black"}}>{li.title}</h5>
                <h5 style={{color: "black"}}>{li.piece ? li.piece : "$" + (Number(li.price)/100).toFixed(2)}</h5>
              </div>
            )
          })}
          {
            bump && <div className={`${styles.row}`} style={{justifyContent: "space-between", width: "90%", padding: "0.5rem 0"}}>
              <h5 style={{color: "black"}}>Rush & Insure</h5>
              <h5 style={{color: "black"}}>$3.99</h5>
            </div>
          }
        </div>

        <div className={`${styles.col} ${styles.confHeader}`} style={{alignItems: "center"}}>
          <h3>🇺🇸 THANK YOU FOR SUPPORTING A U.S. VETERAN OWNED & OPERATED BUSINESS!</h3>
        </div>

        <div className={`${styles.col} ${styles.confHeader}`}>
          <h3>🔒 Your Satisfaction is Guaranteed</h3>
        </div>

        <div className={`${styles.row}`} style={{width: "90%", margin: "1rem 0"}}>
          <Image src={"/images/seal1.webp"} alt={""} width={100} height={100} style={{height: "auto"}}/>
          <div className={`${styles.col}`} style={{alignItems: "flex-start", padding: "0 2rem"}}>
            <h3 style={{color: "black"}}>No Questions Asked Guarantee</h3>
            <p style={{color: "black"}}>Questions or concerns about your order? Reach out to our team at info@holdtheline.com and we'll make sure you're taken care of</p>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Confirmation;

export async function getServerSideProps({  }) {
  sendPageViewEvent("CONFIRMATION");
  return { props: {} };
}
