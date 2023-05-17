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
import { imPoweredRequest } from "@/components/lib/request";
import { LineItem } from "@stripe/stripe-js";

const Upsell = () => {
  const [globalState, setGlobalState] = useContext(Context);
  // const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    line_items: [],
    customer: {
      email: "",
      first_name: "",
      cus_uuid: ""
    },
    external_type: "SHOPIFY",
  });
  const [clientOrigin, setClientOrigin] = useState("https://htl-funnel-main.vercel.app");
  const [windowWidth, setWindowWidth] = useState(0);


  useEffect(() => {
    let query = new URLSearchParams(window.location.search);
    setWindowWidth(window? window.innerWidth : 0);
    sendPageViewEvent("UPSELL"); // send page view event to google analytics

    // extract vars
    const products = query.get("line_items") ? JSON.parse(query.get("line_items") ?? "") : [];
    const email = query.get("email") ? query.get("email") ?? "" : "";
    const first_name = query.get("first_name") ? query.get("first_name") ?? "": "";
    const cus_uuid = query.get("cus_uuid") ? query.get("cus_uuid") ?? "" : "";
    const external_type = query.get("external_type") ? query.get("external_type") ?? "" : "";

    setState({
      line_items: products,
      customer: {
        email: email,
        first_name: first_name,
        cus_uuid
      },
      external_type: external_type,
    });

    setGlobalState({
      ...globalState,
      external_type: external_type,
      customer: {
        email: email,
        first_name: first_name,
        cus_uuid
      },
      line_items: products,
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

  const sub_product = {
    high_risk: false,
    title: "VIP Membership",
    sku: "VIP-CLUB",
    price: 900,
    compare_at_price: 0,
    handle: "",
    options1: "",
    options2: "",
    options3: "",
    weight: 1,
    variant_id: 42235971567788,
    quantity: 1,
    product_id: "",
    is_recurring: true
  }


  const signUpForFreeDecals = async () => {
    try {
      setIsLoading(true);
      const payload = createPayloadFromOrder();

      const response = await imPoweredRequest(
        "https://us-central1-impowered-production.cloudfunctions.net/funnels/payments/charge/subscription",
        "POST",
        payload
      );

      if (response.status < 300) {

        const prev_li = globalState.line_items ? globalState.line_items as LineItem[] : []
      
        setGlobalState({
          ...globalState,
          line_items: [...prev_li, sub_product],
        });

        Router.push(`${clientOrigin}/confirmation`);
        setIsLoading(false);
        return;
      }

      throw new Error(`We're sorry, you couldn't sign up. Please try refreshing the page and try again.`);
    } catch (e) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const declineFreeDecals = async () => {
    setIsLoading(true);
    Router.push(`${clientOrigin}/confirmation`);
    setIsLoading(false);
  };

  const createPayloadFromOrder = () => {
    try {
      const {customer} = state;

      return {
        cus_uuid: customer.cus_uuid ?? "",
        product: sub_product,
        high_risk: false,
        fun_uid: process.env.NEXT_PUBLIC_IMPOWERED_FUNNEL,
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
    <div>
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
      <main className={styles.col}>

        {/* Progress */}
        <div className={`${styles.col} ${styles.pSection}`} style={{paddingBottom: "2rem"}}>
          <div className={styles.col}>
            <h2  style={{margin: "1rem 0.5rem", textAlign: "center"}} >Your Order Qualifies For A FREE Gift!</h2>
          </div>
          <div className={styles.col}>
            <Image src={"/images/progress2.png"} alt={""} width={300} height={100} style={{height: "35px", margin: "1rem 0"}} />
          </div>
          <div className={styles.col}>
            <div className={` ${styles.progress} ${styles.progressbar_nocorners} ${styles.mediumProgressBar}`}>
              <div className={` ${styles.progressBar} ${styles.progressbar_w_75} ${styles.progressBarStripedActive}`}>
                <span className="">
                  Almost Complete...
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK INFO */}
        <div className={`${styles.col} ${styles.quickInfo}`}>
          <div className={styles.col} style={{border: "1px dashed white", padding: "0.5rem 4rem", fontSize: "40px"}}>  
            <h2>ONE TIME <strong style={{color: "red"}}>ONLY OFFER</strong> </h2>
          </div>
          <div className={styles.col}>
            <h3>Join the  <strong style={{color: "red"}}>Hold The Line Club </strong>and claim your FREE Hold The Line Coin below </h3>
          </div>
        </div>

        {/* Accordion */}
        <div className={`${styles.col} ${styles.upsellAc}`}  style={{margin: "1rem 0", width: "100%"}} >
          <UpsellAccordion title={"What is the Hold The Line Club?"} detail={""} />
        </div>

        {/* BOX FOR PURCHASE */}
        <div className={`${styles.row} ${styles.purchaseBox}  ${styles.mobileCol}`}>
          <div className={`${styles.col}`}>
            <Image src={"/images/hlt.png"} alt={""} width={500} height={500} style={{width: "200px", height: "auto", padding: "0.5rem"}} />
          </div>
          
          <div className={`${styles.col}`}>
            <div className={styles.col}>
              <h2>Hold The Line Coin</h2>
              <h4>Coin Cost: $19.90 FREE</h4>
              <h4>Hold The Line Club Cost Today: $9.97</h4>
              <p>Club members receive exclusive coupons/discounts, access to members only products, and access to exclusive sales/promos first. Memberships will re-bill monthly at $9.97 per month until cancelled by contacting our support team</p>
            </div>

            <div className={styles.col}>
              <button
                onClick={() => signUpForFreeDecals()}
                className={`${styles.payBtn} ${styles.wobbleButton}`}
                id="submit"
                disabled={isLoading}
                type="submit"
                style={{
                  width: "100%"
                }}
              >
                {isLoading ? "Loading . . ." : "YES! Claim my FREE Coin!"}
              </button>
            </div>

            <div className={styles.col}>
              <h5>***HOLD THE LINE PROUDLY DONATES A PORTION OF EACH CLUB MEMBERSHIP TO PROGRAMS & ORGANIZATIONS THAT BENEFIT VETERANS & FIRST RESPONDERS.</h5>
            </div>
          </div>
        </div>

        {/* DECLINE PURCHASE */}
        <div className={styles.col} style={{background: "white", width: "100%", minHeight: "150px"}}>
          <div className={styles.col} onClick={() => declineFreeDecals()}>
            <p className={styles.decline}>No, I don't want a free gift</p>
          </div>          
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Upsell;

export async function getServerSideProps({  }) {
  sendPageViewEvent("UPSELL");
  return { props: {} };
}
