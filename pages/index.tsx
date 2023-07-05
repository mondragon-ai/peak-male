import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "@/components/Header";
import { useContext, useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
// import Testimonials from "@/components/Testimonials";
import OrderFormContainer, { InitialValuesType }  from "@/components/Form/FormSection";
import { Context } from "../context/context";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Brand from "@/components/Brand";
import CustomImage from "@/components/global/Image";
import Accordion from "@/components/global/Accordian";
import { sendPageViewEvent } from "@/components/lib/analytics";
import { saveItem } from "@/context/storage";
import { imPoweredRequest } from "@/components/lib/request";
import { LineItem } from "@/components/Form/OrderForm";
import Head from "next/head";
import StaticButton from "@/components/Button/StaticBtn";
import IFrame from "@/components/global/iFrame";
import Parallax from "@/components/global/Parallax";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

export default function Home() {
  const [viewItem, setViewItem] = useState(0);
  const [clientSecret, setSecret] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);

  const scrollToElement = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const options = {
    clientSecret,
    appearance: { theme: "stripe" },
    style: {
      base: {
        color: "#32325d",
        fontSmoothing: "antialiased",
        fontSize: windowWidth > 720 ? "35px" : "18px",
        lineHeight: windowWidth > 720 ? "85px" : "25px",
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        "::placeholder": {
          color: "#ff5858",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true
  };

  // fetch product data and cache it
  const fetchData = async () => {
    try {
      const response = await imPoweredRequest(
        "https://us-central1-impowered-production.cloudfunctions.net/funnels/payments/secret",
        "POST",
        {}
      );

      if (response.data) {
        setState({...state, stripe_uuid: response.data.data.stripe_uuuid})
        setSecret(response.data.data.secret);
        saveItem("secret", response.data.data.secret);
        saveItem("stripe_uuid", response.data.data.stripe_uuid );
      };
    } catch (error) {
      console.error(error);
    };
  };
  const product: any = {
      title: "20 Hold The Line Coins (SAVE 30%)",
      price: 14000,
      piece: "$6.97/coin",
      options1: "",
      options2: "",
      options3: "",
      product_id: 7623778205868,
      high_risk: false,
      sku: "",
      compare_at_price: 0,
      handle: "",
      weight: 0,
      variant_id: 42555420704940,
      quantity: 1,
      status: false,
      id: "456",
      url: "",
      tags: [],
  } as LineItem;

  const initialValues = {
      line_items: [product],
      shipping: {
          line1: "",
          state: "",
          city: "",
          zip: "",
          type: "",
          country: "",
          name: "",
          title: ""
      },
      bump: true,
      external_type: "",
      customer: {
          email: "",
          first_name: ""
      },
      stripe_uuid: "",
      fun_uuid: process.env.NEXT_PUBLIC_IMPOWERED_FUNNEL ?? "",
      high_risk: false,
  } as InitialValuesType;

  const [state, setState] = useState(initialValues);
  // Page Effect
  useEffect(() => {
    if (!window) {};
    setWindowWidth(window.innerWidth);
    // fetchData();
    //Send Analytics to imPowered
    sendPageViewEvent("OPT_IN");
  }, []);

  const description = `Enter for a chance to win a Ford Raptor and $10,000 cash giveaway, hosted by the influential Cam Hanes, renowned bow hunter, and ultra-marathon runner. This exciting opportunity allows you to own a piece of American pride with the Hold The Line Coin. Crafted from robust steel, this coin represents patriotism, embodying the strength, resilience, and spirit of our great nation. Don't miss out on this incredible chance to win and showcase the Hold The Line Coin. Order yours today and join us in celebrating our shared values of bravery and determination!`;
  const ogImgUrl =  "https://cdn.shopify.com/s/files/1/0697/5150/5204/files/cam3.jpg?v=1686328003";
  const canonicalUrl = "";
  const t = "Cam Hanes - Win a Ford Raptor + $10k Cash" 

  return (
    <>
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

      <main className={styles.main}>
        <Header />
        
        {/* TOP SECTION */}
        <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: windowWidth < 720 ? "0% 0 0rem 0" : "0% 0 0% 0" , background: "#dddddd"}}>

          <div className={`${styles.col} ${styles.mobileFull}`} style={{
              width: "50%",
              alignItems: "flex-end",
              paddingRight: "3rem",
              padding: "2rem 3rem 2rem 0"
            }}>
            <div className={`${styles.col}`}>
              <div className={`${styles.col}`}>
                <Brand text={""} src={"https://cdn.shopify.com/s/files/1/0697/5150/5204/files/Cam_Hanes_Logo_Retina_copy.png?v=1673552515"} />
              </div>
              <div className={`${styles.row}`} style={{width: "100%", padding: "1rem", justifyContent: "center"}} ><hr style={{width: "80%"}} /></div>
              <div className={`${styles.col}`} style={{padding: "1rem 0", maxWidth: "500px", textAlign: "center"}}>
               <h2 style={{color: "#212121"}}>Keep Hammering 🔨🔨.</h2>
              </div>
              <div className={`${styles.col}`} style={{width: "450px", height: "350px", padding: "1rem 0 2rem 0"}}>
                <IFrame videoId={"TRPYDZmFkss"} className={""} title={""} />
              </div>
              <div className={`${styles.col}`}>
                <Brand text={""} src={"https://cdn.shopify.com/s/files/1/0697/5150/5204/files/presented-by-hodge-bigly.png?v=1688574222"} />
              </div>
            </div>
          </div>

          <div className={`${styles.col} ${styles.mobileFull}`} style={{
              width: "50%",
              alignItems: "flex-start", 
              padding: "2rem 0 2rem 3rem",
              background: "#212121"
            }} ref={targetRef}> 
            {clientSecret == "" ? (
              <Elements stripe={stripePromise}>
                <OrderFormContainer state={state} setState={setState} />
              </Elements>
            ) : (
              null
            )}
          </div>

        </div>

        {/* FIRST TEXT SECTION */}
        <Parallax yOffset={3000} customId="truck-images" bckImage="https://cdn.shopify.com/s/files/1/0697/5150/5204/files/CALEB_MARMOLEJO_CAM_HANES_-00073-BW.jpg?v=1688575919">
          <div className={`${styles.col}`} style={{paddingTop: "2%"}}>
            <div className={`${styles.col}`} style={{justifyContent: "center"}}>
                <h1>ABOUT THE GIVEAWAY</h1>
                <div className={`${styles.row}`} style={{width: "100%", padding: "1rem", justifyContent: "center"}} ><hr style={{width: "80%"}} /></div>
            </div>
            <div className={`${styles.col} `} style={{paddingTop: "2%"}}>
              <div className={`${styles.row} ${styles.mobileCol}`} style={{alignItems: "center"}}>
                <Image src={"https://cdn.shopify.com/s/files/1/0697/5150/5204/files/cam3.jpg?v=1686328003"} alt={""} height={750} width={500} style={{width: "100%", height: "auto", borderRadius: "6px", margin: "1rem"}} />
              </div>
              <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "100%", alignItems: "center"}}>
                <div style={{background: "black", width: "100%", borderRadius: "10px", padding: "1rem", textAlign: "center"}}>
                  <h1>
                    <span style={{color: "#FF5100"}}>2023 FORD RAPTOR</span> 4X4
                    <br/>
                    <br/>
                    <span style={{color: "#FF5100"}}>3.5L TWIN TURBO ECOBOOST</span>  High Output
                    <br/>
                    <br/>
                    <span style={{color: "#FF5100"}}>PANORAMIC</span> Sun Roof
                    <br/>
                    <br/>
                    <span style={{color: "#FF5100"}}>RIGID</span> Fog Lights and Retractable Tonneau Cover
                    <br/>
                    <br/>
                    <span style={{color: "#FF5100"}}>20" METHOD PERFORMANCE WHEELS</span> Wrapped in 35" Nitto Ridge Grappler Tires 
                  </h1>
                </div>
              </div>
              <div className={`${styles.row} ${styles.mobileCol}`} style={{alignItems: "center"}}>
                <Image src={"https://cdn.shopify.com/s/files/1/0697/5150/5204/files/cam3.jpg?v=1686328003"} alt={""} height={750} width={500} style={{height: "auto", borderRadius: "6px", margin: "1rem"}} />
                <Image src={"https://cdn.shopify.com/s/files/1/0697/5150/5204/files/cam3.jpg?v=1686328003"} alt={""} height={750} width={500} style={{height: "auto", borderRadius: "6px", margin: "1rem"}} />
              </div>
              <div className={`${styles.row} ${styles.mobileCol}`} style={{alignItems: "center"}}>
                <Image src={"https://cdn.shopify.com/s/files/1/0697/5150/5204/files/cam3.jpg?v=1686328003"} alt={""} height={750} width={500} style={{height: "auto", borderRadius: "6px", margin: "1rem"}} />
                <Image src={"https://cdn.shopify.com/s/files/1/0697/5150/5204/files/cam3.jpg?v=1686328003"} alt={""} height={750} width={500} style={{height: "auto", borderRadius: "6px", margin: "1rem"}} />
              </div>
              <div className={`${styles.col}`} style={{width: "100%", padding: "2rem 0 4rem 0 "}}>
                <button onClick={scrollToElement}
                  className={`${styles.payBtn} ${styles.wobbleButton}`}
                  style={{
                    width: "30%"
                  }}
                >
                  {false ? "Loading . . ." : "ORDER NOW & SAVE 30%"}
                </button>
                {true && <StaticButton scroll={scrollToElement} />}
              </div>
            </div>
          </div>
        </Parallax>

        {/* SECOND TEXT SECTION */}
        <div className={`${styles.col}`} style={{paddingTop: "2%"}}>
          <div className={`${styles.col}`} style={{paddingTop: "2%"}}>
            <div className={`${styles.col}`} style={{justifyContent: "center"}}>
                <h1>JOIN THE COLLECTIVE</h1>
                <div className={`${styles.row}`} style={{width: "100%", padding: "1rem", justifyContent: "center"}} ><hr style={{width: "80%"}} /></div>
            </div>
            <div className={`${styles.row} ${styles.mobileCol}  ${styles.textContainer}`} style={{paddingTop: "2%"}}>
              <div className={`${styles.col} ${styles.mobileFull}`} style={{width: "50%"}}>
                <Image src={"https://cdn.shopify.com/s/files/1/0697/5150/5204/files/cam-email2_copy.jpg?v=1675032195"} alt={""} height={750} width={500} style={{height: "auto", borderRadius: "6px"}} />
              </div>
              <div className={`${styles.col} ${styles.mobileFull}`} style={{width: "50%"}}>
                <div className={`${styles.col} ${styles.textSection}`}>
                  <p style={{paddingBottom: "2rem"}}>People ask me, <em>"Why am I giving away cash, free gas, and trucks!?"</em> Well, let me tell you why... I got tired of relying on big tech for expensive advertising and marketing, so I decided to take matters into my own hands and give back to you, my amazing fans.</p>
                  <p style={{paddingBottom: "2rem"}}>I've been incredibly fortunate to have the opportunity to give away over $850k+ worth of vehicles and prizes to my fans this year alone. And now, for my very first giveaway, every purchase you make will enter you for a chance to WIN a 2023 FORD RAPTOR, a custom truck that embodies power and performance, along with $10,000 CASH! 🔥</p>
                  <p style={{paddingBottom: "2rem"}}>I want to express my sincere gratitude for all the support you've shown me throughout my journey.</p>
                  <p style={{paddingBottom: "2rem"}}></p>
                  <p style={{paddingBottom: "2rem", width: "100%"}}>Thank You,</p>
                  <p style={{paddingBottom: "2rem", width: "100%"}}>Cameron Hanes & Team Bigly <strong>JOIN US.</strong></p>
                </div>
                <button onClick={scrollToElement}
                  className={`${styles.payBtn} ${styles.wobbleButton}`}
                  style={{
                    width: "30%"
                  }}
                >
                  {false ? "Loading . . ." : "ORDER NOW & SAVE 30%"}
                </button>
                {true && <StaticButton scroll={scrollToElement} />}
              </div>
            </div>
          </div>
        </div>

        {/* VETERAN SECTION */}
        {/* <div className={`${styles.col}`} style={{paddingTop: "2%", }}>
          <div className={`${styles.col}  ${styles.mobileFull} `} style={{width: "50%", alignItems: "center"}}>
          <button onClick={scrollToElement}
              className={`${styles.payBtn} ${styles.wobbleButton}`}
              style={{
                width: "30%"
              }}
            >
              {false ? "Loading . . ." : "ORDER NOW & SAVE 30%"}
            </button>
          </div>
          <div className={`${styles.col}`} style={{width: "50%", alignItems: "center", padding: "3rem 0"}}>
            <Image src={"/images/flag.jpg"} alt={""} width={350} height={500}  style={{width: "50%", height: "auto"}}/>
          </div>
          <div className={`${styles.col}`} style={{width: windowWidth > 720 ? "50%" : "80%", alignItems: "center", textAlign: "center"}}>
            <h2 >At Hold The Line, we are proud to make a difference by donating a portion of every sale to support our American heroes—Veterans and First Responders—providing them with the assistance they deserve.</h2>
          </div>
          <div className={`${styles.row}`} style={{width: "100%", padding: "1rem", justifyContent: "center"}} ><hr style={{width: "50%"}} /></div>
        </div> */}

        {/* FAQ SECTION */}
        <Parallax yOffset={4000} customId="faw-section" bckImage="https://cdn.shopify.com/s/files/1/0697/5150/5204/files/CALEB_MARMOLEJO_CAM_HANES_-09626.jpg?v=1688579100">
          <div className={`${styles.col}`} style={{paddingTop: "2%", height: "700px"}}>
            <div className={`${styles.col}`} style={{justifyContent: "center", padding: "2rem 0rem 2rem 0", textAlign: "center"}}>
                <h1>HAVE ANY QUESTIONS?</h1>
            </div>
            <Accordion title={"How long will it take to receive my order?"} detail={"Our shipping typically takes between 4 to 9 days depending on your location. We ship our coins from Fayetteville, AR via USPS Shipping with Tracking. Rest assured that we strive to deliver your order promptly and securely."} />
            <Accordion title={"Is there a warranty for these coins?"} detail={"Yes, all coins come with a lifetime warranty with 100% money back guarantee. We stand behind the quality and craftsmanship of our products."} />
            <Accordion title={"Do you offer bulk discounts for large orders?"} detail={"Our coins come in 5, 10, and 20 packs. We are able to offer 30% Off on our 20-pack coins. If you're interested in larger quantities, please reach out to our sales team directly for inquiries regarding bulk orders and potential discounts. We will be more than happy to assist you with your request."} />
            <Accordion title={"What is your return and refund policy?"} detail={"We want you to be completely satisfied with your purchase. If, for any reason, you are not happy with your order, please contact our customer service team at info@holdtheline.com. We aim to provide a hassle-free return process and resolve any issues promptly."} />
            <Accordion title={"How can I contact customer support?"} detail={"Our dedicated customer support team is here to assist you. You can reach us by email at info@holdtheline.com or by phone at 877-462-4459 during our business hours, which are Monday-Friday from 9am-4pm CST. We value your feedback and strive to provide excellent customer service."} />
          </div>
        </Parallax>

        {/* CLUB DETAIL SECTION */}
        <div className={`${styles.col}`}  style={{ padding: "2rem 0rem 2rem 0"}}>
          <div className={`${styles.row}`} style={{width: "100%", padding: "1rem", justifyContent: "center"}} ><hr style={{width: "50%"}} /></div>
          <div className={`${styles.col}`} style={{width: "90%", alignItems: "center", textAlign: "center", padding: "2rem 0rem 2rem 0"}}>
            <h1>HOLD THE LINE CLUB</h1>
            <h4>VIP Club Members receive...</h4>
          </div>
          <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "90%", padding: "2rem 0rem 4rem 0"}}>
            <div className={`${styles.col} ${styles.mobileFull} ${styles.mobileIcon}`} style={{width: "90%", padding: "0 3rem"}}>
              <Image src={"/images/gift-box-icon.png"} alt={""} width={150} height={150} style={{height: "auto", borderRadius: "6px"}}/>
              <p style={{minWidth: "200px", textAlign: "center", fontSize: "20px", width: "70%"}}>Automatic entries into all giveaways, including exclusive member's only monthly giveaways!</p>
            </div>
            <div className={`${styles.col} ${styles.mobileFull} ${styles.mobileIcon}`} style={{padding: "0 3rem"}}>
              <Image src={"/images/money-icon.png"} alt={""} width={150} height={150}  style={{height: "auto", borderRadius: "6px"}}/>
              <p style={{minWidth: "200px", textAlign: "center", fontSize: "20px", width: "70%"}}>Automatic entries into all giveaways, including exclusive member's only monthly giveaways!</p>
            </div>
            <div className={`${styles.col} ${styles.mobileFull} ${styles.mobileIcon}`} style={{padding: "0 3rem"}}>
              <Image src={"/images/phone-icon.png"} alt={""} width={150} height={150}  style={{height: "auto", borderRadius: "6px"}}/>
              <p style={{minWidth: "200px", textAlign: "center", fontSize: "20px", width: "70%"}}>Automatic entries into all giveaways, including exclusive member's only monthly giveaways!</p>
            </div>
            <div className={`${styles.col} ${styles.mobileFull} ${styles.mobileIcon}`} style={{padding: "0 3rem"}}>
              <Image src={"/images/computer-icon.png"} alt={""} width={150} height={150}  style={{height: "auto", borderRadius: "6px"}}/>
              <p style={{minWidth: "200px", textAlign: "center", fontSize: "20px", width: "70%"}}>Automatic entries into all giveaways, including exclusive member's only monthly giveaways!</p>
            </div>
          </div>
          <button onClick={scrollToElement}
            className={`${styles.payBtn} ${styles.wobbleButton}`}
            style={{
              width: "30%"
            }}
          >
            {false ? "Loading . . ." : "ORDER NOW & SAVE 30%"}
          </button>
        </div>

      </main>

      <Footer />
    </>
  );
}
