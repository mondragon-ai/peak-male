import { useState, useEffect, useContext } from "react";
import Footer from "../components/Footer";
import { sendPageViewEvent } from "../components/lib/analytics"; 
import Router from "next/router";
import Head from "next/head";
import { Context } from "@/context/context";
import styles from "../styles/Home.module.css";
import * as crypto from "crypto";
import Image from "next/image";
import UpsellAccordion from "@/components/global/UpsellAccordion";
import { imPoweredRequest } from "@/components/lib/request";
import { LineItem } from "@stripe/stripe-js";
import * as gtag from "../components/lib/analytics"
import Header from "@/components/Header";

const CheckOut = () => {
  const [globalState, setGlobalState] = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({
    line_items: [] as LineItem[],
    customer: {
      email: "",
      first_name: "",
      cus_uuid: ""
    },
    external_type: "SHOPIFY",
  });
  const [clientOrigin, setClientOrigin] = useState("https://hodgetwins.holdtheline.com");
  const [windowWidth, setWindowWidth] = useState(0);


  useEffect(() => {
    let query = new URLSearchParams(window.location.search);
    setWindowWidth(window? window.innerWidth : 0);
    sendPageViewEvent("UPSELL"); // send page view event to google analytics

    // extract vars
    const products: LineItem[] = query.get("line_items") ? JSON.parse(query.get("line_items") ?? "") : [];
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
  
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    let price = 0;

    products.length > 0 ? products.forEach(li => {
      price = price + li.amount
    }) : [];


    // push 3rd party analytics
    gtag.twitterEvent(email, price);
    // gtag.event('conversion', {
    //   'send_to': 'AW-10793712364/Knd8CNuBkpIYEOz165oo',
    //   'value': price,
    //   'currency': 'USD',
    //   'transaction_id': "txt_" + crypto.randomBytes(10).toString("hex").substring(0,10)
    // });
  }, []);

  const sub_product = {
    high_risk: false,
    title: "Hold The Line Club - Free HTL Coin",
    sku: "VIP-CLUB",
    price: 997,
    compare_at_price: 0,
    handle: "",
    options1: "",
    options2: "",
    options3: "",
    weight: 1,
    variant_id: 42555420573868,
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


  const description = `Own a piece of American pride with the Hold The Line Coin. Handcrafted from steel, this symbol of patriotism embodies strength, resilience, and the spirit of our great nation. Perfect for gifting and displaying, order your Hold The Line Coin today!!`;
  const ogImgUrl =  "https://images.clickfunnels.com/05/3daf9073c744e19ac910592c7eab5e/hold-the-line-coins-both_clipped_rev_1-cropped.png";
  const canonicalUrl = "https://hodgetwins.holdtheline.com/";
  const t = "Hold The Line - Fight For Freedom Challenge Coin" 

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
      <main className={styles.row}>
        <div className={styles.col} style={{color: "black"}}>
          <header className={`${styles.header} ${styles.col}`} >
            logo
          </header>
          <div className={`${styles.checkoutForm} ${styles.col}`}>
            checkout
          </div>
        </div>
        <div className={styles.col} style={{color: "black"}}>
          <div className={`${styles.orderSummary} ${styles.col}`}>
            order summary
          </div>
          <div className={`${styles.customerReviews} ${styles.col}`}>
            Reviews
          </div>
          <div className={`${styles.whyChooseUs} ${styles.col}`}>
            Why CHoose Us
          </div>
          <div className={`${styles.checkoutFooter} ${styles.col}`}>
            Footer
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default CheckOut;

export async function getServerSideProps({  }) {
  sendPageViewEvent("CHECKOUT");
  return { props: {} };
}
