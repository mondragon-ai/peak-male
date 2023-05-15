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

const Confirmation = () => {
  const [globalState, setGlobalState] = useContext(Context);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVIP, setShowVIP] = useState("");
  const [state, setState] = useState({
    line_items: [],
    customer: {
      email: "",
      first_name: "",
      cus_uuid: ""
    },
    external_type: "SHOPIFY",
  });
  const [clientOrigin, setClientOrigin] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);


  useEffect(() => {
    let query = new URLSearchParams(window.location.search);
    setWindowWidth(window? window.innerWidth : 0);
    sendPageViewEvent("UPSELL"); // send page view event to google analytics

    // extract vars
    const products = query.get("line_items") ? JSON.parse(query.get("line_items") ?? "") : [];
    const customer = query.get("customer") ? JSON.parse(query.get("customer") ?? "") : "";
    const external_type = query.get("external_type") ? JSON.parse(query.get("external_type") ?? "") : "";
  
    // calc vars for ads
    // const price =  p_list[0].price  ? Number(p_list[0].price ) : 0;

    setState({
      line_items: products,
      customer: customer,
      external_type: external_type,
    });

    setGlobalState({
      ...globalState,
      customer: customer,
      products: products,
      bump: query.get("bump") || false,
      high_risk: false,
    });
  
    // push 3rd party analytics
    // gtags.twitterEvent(email, price);
    // gtags.event('conversion', {
    //   'send_to': 'AW-10793712364/Knd8CNuBkpIYEOz165oo',
    //   'value': price,
    //   'currency': 'USD',
    //   'transaction_id': "txt_" + crypto.randomBytes(10).toString("hex").substring(0,10)
    // });    
  }, []);


  const signUpForFreeDecals = async () => {
    try {
      setIsLoading(true);
      const payload = createPayloadFromOrder();

      // const response = await imPoweredRequest(
      //   "POST",
      //   "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/payments/quick-sub",
      //   payload
      // );

      // if (response) {
      //   updateGlobalState(); // update global state
      //   Router.push(`${clientOrigin}/congratulations`);
      //   return;
      // }

      throw new Error(`We're sorry, you couldn't sign up. Please try refreshing the page and try again.`);
    } catch (e) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const declineFreeDecals = async () => {
    setIsLoading(true);
    Router.push(`${clientOrigin}/congratulations`);
    setIsLoading(false);
  };

  const createPayloadFromOrder = () => {
    try {
      const { customer, external_type } = state;
      const query = new URLSearchParams(window.location.search);

      return {
        cus_uuid: query.get("cus_uuid"),
        product: {
          high_risk: false,
          title: "VIP Membership",
          sku: "VIP-CLUB",
          price: 900,
          compare_at_price: 0,
          handle: "",
          options1: "",
          options2: "",
          options3: "",
          weight: 0,
          variant_id: 42235971567788,
          quantity: 1,
          product_id: "",
          is_recurring: true
        },
        funnel_uuid: process.env.NEXT_PUBLIC_IMPOWERED_FUNNEL,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const description = `Enter for a chance to win a new Chevy 2500HD Duramax Diesel & $10,000.00 cash. PIck your size and get discounted items and more importantly, FAST ENTRIES to enter to win!`;
  const ogImgUrl =  "https://www.hodgetwinssweepstakes.com/images/High-Country-Funnel-Banner.png";
  const canonicalUrl = "https://www.hodgetwinssweepstakes.com";
  const t = "Hodge Twins Sweepsstake" 

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
          <h3 style={{color: "black"}}>Your Order Is Currently Being Processed</h3>
        </div>

        <div className={`${styles.col} ${styles.confHeader}`}>
          <h3>Your Order Is Currently Being Processed</h3>
        </div>

        <div className={`${styles.col}`} style={{justifyContent: "space-between", width: "90%", margin: "1rem 0"}}>
          <div className={`${styles.row}`} style={{justifyContent: "space-between", width: "90%"}}>
            <h5 style={{color: "black"}}>Product</h5>
            <h5 style={{color: "black"}}>Price</h5>
          </div>
          <div className={`${styles.row}`} style={{width: "100%", padding: "1rem", justifyContent: "center"}} ><hr style={{width: "100%"}} /></div>
          <div className={`${styles.row}`} style={{justifyContent: "space-between", width: "90%"}}>
            <h5 style={{color: "black"}}>khwebiuwberg</h5>
            <h5 style={{color: "black"}}>$9.00 / each</h5>
          </div>
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
  // sendPageViewEvent("UPSELL");
  return { props: {} };
}
