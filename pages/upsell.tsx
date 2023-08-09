import { useState, useEffect, useContext } from "react";
import { sendPageViewEvent } from "../components/lib/analytics"; 
import Router from "next/router";
import Head from "next/head";
import { Context } from "@/context/context";
import styles from "../styles/Home.module.css";
import upsell_styles from "../styles/Upsell.module.css";
import { formatTime } from "@/components/lib/formatter";
import { imPoweredRequest } from "@/components/lib/request";
import { LineItem } from "@stripe/stripe-js";
// import * as gtag from "../components/lib/analytics"

// Meta Data
const description = `Rivigerate your manhood with Peak Male`;
const ogImgUrl =  "https://cdn.shopify.com/s/files/1/0727/2805/2008/files/card.png?v=1690477687";
const canonicalUrl = "";
const title = "Peak Male | Optimal Human" 

// Upsell Product
const upsell_product = {
  high_risk: true,
  title: "Xtreme Fat Burner",
  sku: "XFB-1-bottle",
  price: 2400,
  compare_at_price: 0,
  handle: "xtreme-fat-brner",
  options1: "1 Bottle",
  options2: "",
  options3: "",
  weight: 0.15,
  variant_id: 45756357181736,
  quantity: 1,
  product_id: "",
  is_recurring: false,
  funnel_step: "UPSELL"
};

const Upsell = () => {
  const [countdown, setCountdown] = useState(600);
  const [selectedImg, selectImage] = useState("https://hitsdesignclients.com/Peak-Male-new/images/up-slide1.png")
  const [globalState, setGlobalState] = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtn] = useState(true);
  const [state, setState] = useState({
    line_items: [] as LineItem[],
    customer: {
      email: "",
      first_name: "",
      cus_uuid: ""
    },
    external_type: "SHOPIFY",
  });

  // const [clientOrigin, setClientOrigin] = useState("https://hodgetwins.holdtheline.com");
  const [windowWidth, setWindowWidth] = useState(0);

  // Render Timer JSX
  const renderCountdown = () => {
    return (
      <span style={{ color: "red" }} id={`second-${countdown}`}>
        {formatTime(countdown)}
      </span>
    );
  };

  // Countdown Timer 
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    setWindowWidth(window.innerWidth);

    return () => clearInterval(timer);
  }, []);

  // Set/Extract State
  useEffect(() => {
    setWindowWidth(window? window.innerWidth : 0);
    // sendPageViewEvent("UPSELL"); // send page view event to google analytics

    // extract vars
    const products: LineItem[] = [];
    const email = "";
    const first_name = "";
    const cus_uuid =  "";
    const external_type =  "";

    // Set Local State
    setState({
      line_items: products,
      customer: {
        email: email,
        first_name: first_name,
        cus_uuid
      },
      external_type: external_type,
    });

    // Set Global State
    setGlobalState({
      ...globalState,
      external_type: external_type,
      customer: {
        email: email,
        first_name: first_name,
        cus_uuid
      },
      line_items: products,
      bump: false,
      high_risk: false,
    });
  
    // Set Loading
    setTimeout(() => {
      setBtn(false);
    }, 20000);

    // let price = 0;

    // products.length > 0 ? products.forEach(li => {
    //   price = price + li.amount
    // }) : [];

    // push 3rd party analytics
    // gtag.twitterEvent(email, price);
    // gtag.event('conversion', {
    //   'send_to': 'AW-10793712364/Knd8CNuBkpIYEOz165oo',
    //   'value': price,
    //   'currency': 'USD',
    //   'transaction_id': "txt_" + crypto.randomBytes(10).toString("hex").substring(0,10)
    // });
  }, []);

  // Purchase Upsell
  const purchaseUpsell = async () => {
    try {
      setIsLoading(true);
      const payload = createPayloadFromOrder();
      console.log(payload);
      const URL = true ? "https://us-central1-impowered-production.cloudfunctions.net/funnels" : "http://127.0.0.1:5001/impowered-production/us-central1/funnels";

      if (!isLoading) {
        const response = await imPoweredRequest(
          URL+"/payments/charge/subscription",
          "POST",
          payload
        );
  
        if (response.status < 300) {
          localStorage.setItem("upsell", "true");
  
          const prev_li = globalState.line_items ? globalState.line_items as LineItem[] : []
        
          setGlobalState({
            ...globalState,
            line_items: [...prev_li, upsell_product],
          });
  
          Router.push(`/confirmation`);
          return;
        }
        setIsLoading(false);
      };

      // throw new Error(`We're sorry, you couldn't sign up. Please try refreshing the page and try again.`);
    } catch (e) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Decline Offer
  const declineOffer = async () => {
    localStorage.setItem("upsell", "false");
    setIsLoading(true);
    Router.push(`/confirmation`);
    setIsLoading(false);
  };

  // Create Payload to Order
  const createPayloadFromOrder = () => {
    try {
      const {customer} = state;

      return {
        cus_uuid: customer.cus_uuid ?? "",
        product: upsell_product,
        high_risk: true,
        fun_uid: process.env.NEXT_PUBLIC_IMPOWERED_FUNNEL,
        security_key: "2hNZ5C543yfQH59e9zcEd33QDZw5JcvV",  
      };
    } catch (error) {
      console.log(error);
    }
  };

  // Use Effect for 
  useEffect(() => {
    // Fetch data from local storage and update formData accordingly
    const cus_uuid = localStorage.getItem("cus_uuid");
    setState((prevState) => ({
      ...prevState,
      customer: {
        ...prevState.customer,
        cus_uuid: cus_uuid as string
      }
    }));
  }, []);

  setTimeout(() => {
    
  }, 20000);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content={"artcle"} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImgUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        
      </Head>
      <main className={styles.col} style={{width: "100%", background: "rgb(252, 249, 245)"}}>
        <div className={upsell_styles.upHeader}>
          <div className={upsell_styles.container}>
              <img src="https://hitsdesignclients.com/Peak-Male-new/images/logo.png" className={upsell_styles.logo} />
                <div className={upsell_styles.upHeaderRight}>
                  <img src="https://hitsdesignclients.com/Peak-Male-new/images/up-hdr-step.png" className={upsell_styles.upHdrStep} />
                    <ul>
                      <li>Checkout</li>
                      <li>Special Deal</li>
                      <li>Summary</li>
                    </ul>
                </div>
                
            </div>
        </div>

        <div className={upsell_styles.upsellSec}>
          <div className={upsell_styles.container}>
            <div className={upsell_styles.upsellBox}>
              <div className={upsell_styles.upsellTopStrip}>
                <p className={upsell_styles.upText1}>Hold Up! Exclusive Offer To Compliment Your Order!</p>
                <p className={upsell_styles.upText2}>Add Thermogenic Weight Loss Support at 50% Off</p>
                <p className={upsell_styles.upText3}>Lorem quis bibendum auctor, <br className={upsell_styles.forMob} />nisi elit consequat ipsum!</p>
              </div>

              <div className={upsell_styles.upsellContent}>
                <div className={upsell_styles.upsellLeft}>
                  <div className={upsell_styles.petBrushCol}>
                    <div className={upsell_styles.petBrushColHdr}>
                      <p>CLAIM ANOTHER DEAL</p>
                      <h3>Xtreme Fat Burner</h3>
                      <span>50% <br /> Off</span>
                    </div>
                    <div className={`${upsell_styles.upSlideDiv} ${upsell_styles.slickSlider}`}>
                      <div className={upsell_styles.slickList}>
                        <div className={upsell_styles.slickTrack}>
                          <div className={`${upsell_styles.slickSlide} ${upsell_styles.slickActive}`} data-slick-index="0" style={{width: windowWidth < 720 ? "" : "381px"}}>
                            <img src={selectedImg} className={`${upsell_styles.upSlideImg}`} alt="img" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${upsell_styles.upSliderNav} ${upsell_styles.slickSlider}`}>
                      
                    <div className={upsell_styles.slickList} >
                      <div className={upsell_styles.slickTrack} style={{opacity: 1, width: windowWidth < 720 ? "" : "441px", transform: "translate3d(0px, 0px, 0px)"}}>
                        <div onClick={() => selectImage("https://hitsdesignclients.com/Peak-Male-new/images/up-slide1.png")} className={`${upsell_styles.slickSlide}`} data-slick-index="0" style={{width: "139px"}}>
                          <img src="https://hitsdesignclients.com/Peak-Male-new/images/up-slide1.png" className="up-nav" alt="img"/>
                        </div>
                        <div onClick={() => selectImage("https://hitsdesignclients.com/Peak-Male-new/images/up-slide2.png")}  className={`${upsell_styles.slickSlide}`} data-slick-index="1" style={{width: "139px"}}>
                          <img src="https://hitsdesignclients.com/Peak-Male-new/images/up-slide2.png" className="up-nav" alt="img" />
                        </div>
                        <div onClick={() => selectImage("https://hitsdesignclients.com/Peak-Male-new/images/up-slide3.png")}  className={`${upsell_styles.slickSlide}`} data-slick-index="2" style={{width: "139px"}}>
                          <img src="https://hitsdesignclients.com/Peak-Male-new/images/up-slide3.png" className="up-nav" alt="img" />
                        </div>
                      </div>
                    </div>                    
                  </div>
                </div>
                
                <div className={upsell_styles.upsellRight}>
                  <p className={upsell_styles.custmrRvw}>
                    <img src="https://hitsdesignclients.com/Peak-Male-new/images/star.png" />2000+ Verified Reviews
                  </p>
                  <div className={upsell_styles.otOfrStrip}>
                      <img src="https://hitsdesignclients.com/Peak-Male-new/images/hourglass.png" className={upsell_styles.hourglass} />
                      <p>One-time Offer - Only available with this current order. <span>You will never see this again.</span></p>
                  </div>
                  <p className={upsell_styles.upRghtText1}>Lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Nam nec tellus a odio tincidunt auctor a ornare odio.</p>
                  <ul className={upsell_styles.upRgtList}>
                    <li>Lorem quis bibendum auctor nisi</li>
                    <li>Nisi elit consequat ipsum nec</li>
                    <li>Nec sagittis sem nibh id elit ipsum</li>
                    <li>Duis sed odio sit amet nibh nec</li>
                  </ul>
                  <div className={upsell_styles.upPrcRow}>
                    <p className={upsell_styles.upPrc}><span>$34.50</span> <small>(SAVE 50%)</small></p>
                    <p className={upsell_styles.dealReserve}>Deal reserved for: <strong><span style={{color: "red"}}>{renderCountdown()}</span> min</strong></p>
                  </div>
                  {!btnLoading ? <a onClick={() => purchaseUpsell()} className={upsell_styles.upBtn}>{isLoading ? "loading..." : "Yes, Upgrade my Order with 1-Click-Buy!"} </a> : <a className={upsell_styles.upBtn}>Checking Availability... </a>}
                  <p className={upsell_styles.moneyBkText}>
                    <img src="https://hitsdesignclients.com/Peak-Male-new/images/money-bk-seal.png" /> 30 Day Money Back Guarantee&nbsp;</p>
                  <div className={upsell_styles.deviderCp}></div>
                  <a onClick={declineOffer} className={upsell_styles.noThnx}>No thanks! I don't want to save with this one time offer.</a>
                </div>
                
              </div>
            </div>

            
          </div>
        </div>

        <div className={upsell_styles.footer}>
          <div className={upsell_styles.container}>
              <p className={`${upsell_styles.ftrTxt1} ${upsell_styles.fl}`}>Copyright  © <script type="text/javascript">var year = new Date();document.write(year.getFullYear());</script>2023  Optimal Human. All Rights Reserved.</p>
                <p className={`${upsell_styles.ftrTxt1} ${upsell_styles.fr}`}>
                    <a href="#">Terms &amp; Conditions </a>  | 
                    <a href="#">Privacy Policy </a> | 
                    <a href="#">Contact Us</a>
                </p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Upsell;

export async function getServerSideProps({  }) {
  sendPageViewEvent("UPSELL");
  return { props: {} };
}
