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
import MarqueeText from "@/components/Marquee/Marquee";
import Marquee from "react-fast-marquee";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
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


  const description = `Own a piece of American pride with the Hold The Line Coin. Handcrafted from steel, this symbol of patriotism embodies strength, resilience, and the spirit of our great nation. Perfect for gifting and displaying, order your Hold The Line Coin today!!`;
  const ogImgUrl =  "https://images.clickfunnels.com/05/3daf9073c744e19ac910592c7eab5e/hold-the-line-coins-both_clipped_rev_1-cropped.png";
  const canonicalUrl = "https://hodgetwins.holdtheline.com/";
  const t = "Hold The Line - Fight For Freedom Challenge Coin" 

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
        <div className={`${styles.row} ${styles.mobileCol}  ${styles.topContainer} `}>

          <div className={`${styles.col} ${styles.mobileFull} ${styles.topContainerLeft}`}>
            <div>
              <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/sldr1.png"} 
                alt={""}
                width={100}
                height={400}
                style={{width: "450px", height: "auto"}} />
            </div>

            <div className={`${styles.row} ${styles.imgSliders}`}>
              <div>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/sldr1.png"} 
                  alt={""}
                  width={60}
                  height={60}
                  style={{width: "60px", height: "auto"}} />
              </div>
              <div>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/sldr2.png"} 
                  alt={""}
                  width={60}
                  height={60}
                  style={{width: "60px", height: "auto"}} />
              </div>
              <div>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/sldr3.png"} 
                  alt={""}
                  width={60}
                  height={60}
                  style={{width: "60px", height: "auto"}} />
              </div>
              <div>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/sldr4.png"} 
                  alt={""}
                  width={60}
                  height={60}
                  style={{width: "60px", height: "auto"}} />
              </div>
            </div>

            <div className={`${styles.row} ${styles.badges}`}>
              <div>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal3.png"} 
                  alt={""}
                  width={60}
                  height={60}
                  style={{width: "100%", height: "auto"}} />
              </div>
              <div>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal2.png"} 
                  alt={""}
                  width={60}
                  height={60}
                  style={{width: "100%", height: "auto"}} />
              </div>
              <div>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal1.png"} 
                  alt={""}
                  width={60}
                  height={60}
                  style={{width: "100%", height: "auto"}} />
              </div>
              <div>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal4.png"} 
                  alt={""}
                  width={60}
                  height={60}
                  style={{width: "100%", height: "auto"}} />
              </div>
            </div>

            <div className={`${styles.row} ${styles.productTestimonial}`}>
              <div>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1rvface.png"} 
                  alt={""}
                  width={60}
                  height={60}
                  style={{width: "50px", height: "auto", borderRadius: "100%"}} />
              </div>

              <div className={`${styles.col}`} style={{padding: "0 0 0 1rem"}}>
                <p>I ordered the 3 month supply and I just finished my 1st month (1 bottle), so I’m not sure if that’s long enough to truly notice any differences, but it seems like I'm starting to "feel" results!! I feel less tired most of the time, and I've been feeling better during/after my workouts. Plus, my sex drive seems to be improving too!</p>
                <div className={`${styles.row}`} style={{width: "100%", marginTop: "12px", fontWeight: "bold", alignItems: "center"}}>
                  <p>Alexander L.</p>

                  <span className={`${styles.row}`} style={{alignItems: "center"}} >  
                      <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/rvtick.png"} 
                        alt={""}
                        width={60}
                        height={60}
                        style={{width: "10px", height: "auto", margin: "0 0.5rem 0 1rem"}} />Verified Customer
                    </span>
                </div>
              </div>
            </div>

          </div>

          <div className={`${styles.col} ${styles.mobileFull}`} style={{width: "40%"}}> 
            {clientSecret == "" ? (
              <Elements stripe={stripePromise}>
                <OrderFormContainer state={state} setState={setState} />
              </Elements>
            ) : (
              null
            )}
          </div>

        </div>

        {/* MARQUEE TEXT */}
        <div className={`${styles.row}`} style={{width: "100%", background: "#0d3391"}}>
          <Marquee speed={20} autoFill={true}>
            <p style={{ 
              float: "left",
              padding:" 0 30px 0 30px",
              fontSize: "17px",
              lineHeight: "38px",
              color: "#fff",
              textAlign: "center",
              position: "relative",
              letterSpacing: "0.5px"}}>Safe & Secure Checkout</p> 
            <p style={{ 
              float: "left",
              padding:" 0 30px 0 30px",
              fontSize: "17px",
              lineHeight: "38px",
              color: "#fff",
              textAlign: "center",
              position: "relative",
              letterSpacing: "0.5px"}}>|</p>
            <p style={{ 
              float: "left",
              padding:" 0 30px 0 30px",
              fontSize: "17px",
              lineHeight: "38px",
              color: "#fff",
              textAlign: "center",
              position: "relative",
              letterSpacing: "0.5px"}}>30 Day Money Back Guarantee</p> 
            <p style={{ 
              float: "left",
              padding:" 0 30px 0 30px",
              fontSize: "17px",
              lineHeight: "38px",
              color: "#fff",
              textAlign: "center",
              position: "relative",
              letterSpacing: "0.5px"}}>|</p>
            <p style={{ 
              float: "left",
              padding:" 0 30px 0 30px",
              fontSize: "17px",
              lineHeight: "38px",
              color: "#fff",
              textAlign: "center",
              position: "relative",
              letterSpacing: "0.5px"}}>Fast Shipping Across U.S.A.</p>
            <p style={{ 
              float: "left",
              padding:" 0 30px 0 30px",
              fontSize: "17px",
              lineHeight: "38px",
              color: "#fff",
              textAlign: "center",
              position: "relative",
              letterSpacing: "0.5px"}}>|</p>
          </Marquee>
        </div>

        {/* DECLINE SECTION */}
        <div className={`${styles.col}`} style={{width: "100%", padding: "4rem 0 4rem 0", background: "url('https://hitsdesignclients.com/Peak-Male-new/images/sec2.jpg') center bottom no-repeat"}}>
          <div className={styles.delcinedTestWrapper}>
            <h1 style={{color: "red", fontWeight: "900", textAlign: "center", fontSize: "50px", lineHeight: "56px"}}> Decline In T-Levels In Men <br /> Is The Harsh Reality</h1>
            <p style={{color: "black", marginTop: "19px", textAlign: "center", fontSize: "18px", lineHeight: "26px"}}>
              Studies show that male testosterone levels have been steadily declining since the 1980's, <br />
              impacting an entire generation of men around the world.
            </p>
            <h5 className={styles.s2subhding}>Some of the most common symptoms include</h5>
            <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2line.png"} alt={""} height={5000} width={5000} className={styles.s2line} />
            <ul className={styles.s2list}>
              <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img1.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>Low Libido</h4>
                <p className={styles.s2ltxt}>Low libido, or a diminished sex drive, can impact your overall quality of life, confidence, and intimate relationships. It's a common issue often associated with low testosterone levels, stress, and various lifestyle factors.</p>
              </li>
              <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img2.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>All Day Fatigue</h4>
                <p className={styles.s2ltxt}>Constant fatigue can leave you feeling drained, unproductive, and disengaged from the activities you once enjoyed. It can stem from various factors, including low testosterone levels, stress, and poor lifestyle choices.</p>
              </li>
              <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img3.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>Weight Gain</h4>
                <p className={styles.s2ltxt}>Unwanted weight gain can affect your self-esteem, physical appearance, and overall health, often resulting from hormonal imbalances, low testosterone levels, and lifestyle habits.</p>
              </li>
              <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img4.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>Muscle Loss</h4>
                <p className={styles.s2ltxt}>Low libido, or a diminished sex drive, can impact your overall quality of life, confidence, and intimate relationships. It's a common issue often associated with low testosterone levels, stress, and various lifestyle factors.</p>
              </li>
            </ul>

            <div className={`${styles.s2bx2} ${styles.row}`}>
              <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2prd.png"} alt={""} height={5000} width={5000} className={styles.s2prd} />
            </div>
            <p className={`${styles.s2lhding2} ${styles.row}`}>
              This is why our team at Optimal Human created Peak Male – the most comprehensive male 
              vitality supplement on the market, dedicated to addressing key human health challenges by carefully formulating 
              targeted solutions with scientifically-backed ingredients.
            </p>
          </div>
        </div>

        {/* INTRODUCTION SECTION */}
        <div className={`${styles.col} ${styles.sec3}`} style={{width: "100%", padding: "4rem 0 4rem 0"}}>
          <div className={styles.delcinedTestWrapper}>
            <h3 className={styles.bdhding}>
              Introducing Peak Male <br />
              <span style={{color: "blue"}}>Xtreme Test Booster</span>
            </h3>
            <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "60%"}}>
              <div className={`${styles.col}`}>
                <p className={styles.bdfont}>
                Our specially crafted blend of six powerful herbs has been formulated to help you achieve peak physical and mental performance. Tackling the root cause of hormone imbalances that many males face today.
                </p>
                <p className={styles.bdfont} style={{color: "#17378a"}}>
                Backed by science, our unique blend includes Fenugreek, Tribulus Terrestris, Maca, Tongkat Ali Root, Horny Goat Weed, and Panax Ginseng, all of which work together to support healthy testosterone levels in men.
                </p>
                <p className={styles.bdfont}>
                By targeting healthy testosterone production, our all-natural blend of six powerful herbs helps to improve the overall health and vitality of men, rather than simply masking symptoms.
                </p>
                <p className={styles.bdfont}>
                Don't settle for superficial fixes that only provide temporary relief. With Peak Male, men can achieve a long-term solution that addresses the root cause of the issues that many men face, unlocking their full potential for health and vitality.
                </p>
                <p className={styles.bdfont} style={{width: "100%", borderBottom: "none"}}>
                Ready to take control and unleash your full potential?
                </p>
                <div className={styles.s3btn}>
                Order Now
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
              <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "40%", position: "relative"}}>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s3img.png"} height={5000}  width={5000} alt="" style={{
                  position: "absolute",
                  bottom: 0,
                  top: 0,
                  left: "100px",
                  width: "400px",
                  height: "auto"
                }}  />
              </div>
            </div>
          </div>
        </div>

        {/* BENEFITS SECTION */}
        <div className={`${styles.col} ${styles.sec4}`} style={{width: "100%", padding: "4rem 0 4rem 0"}}>
          <div className={styles.delcinedTestWrapper}>
            <h3 className={styles.bdhding} style={{color: "white", textAlign: "center"}}>
              Introducing Peak Male <br />
              <span>Xtreme Test Booster</span>
            </h3>
            <p className={styles.bdfont} style={{color: "white", textAlign: "center",border: "none"}}>
              OurAwaken your inner Alpha with our supercharged blend of 6 powerful herbs
            </p>
            <div className={`${styles.col}`} style={{position: "relative"}}>
              <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "100%", justifyContent: "space-between", padding: "2rem 0"}}>
                <div className={`${styles.row} ${styles.benefitItem}`} >
                  <div>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon1.png" height={500}  width={500} alt=""  style={{width: "60px", height: "auto"}} /> 
                  </div>
                  <div className={`${styles.col}`} style={{padding: "0 0 0 2rem"}}>
                    <h6>Boosts Testosterone Levels</h6>
                    <p>Testosterone is essential for building muscle, burning fat, and maximizing your potential in and out of the gym</p>
                  </div>
                </div>
                <div className={`${styles.row} ${styles.benefitItem}`} style={{flexDirection: "row-reverse"}}>
                  <div>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon1.png" height={500}  width={500} alt=""  style={{width: "60px", height: "auto"}} /> 
                  </div>
                  <div className={`${styles.col}`} style={{padding: "0 2rem 0 0rem"}}>
                    <h6 style={{textAlign: "right"}}>Boosts Testosterone Levels</h6>
                    <p style={{textAlign: "right"}}>Testosterone is essential for building muscle, burning fat, and maximizing your potential in and out of the gym</p>
                  </div>
                </div>
              </div>

              <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "100%", justifyContent: "space-between", padding: "2rem 0", borderTop: "1px solid #303d60", borderBottom: "1px solid #303d60"}}>
                <div className={`${styles.row} ${styles.benefitItem}`} >
                  <div>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon1.png" height={500}  width={500} alt=""  style={{width: "60px", height: "auto"}} /> 
                  </div>
                  <div className={`${styles.col}`} style={{padding: "0 0 0 2rem"}}>
                    <h6>Boosts Testosterone Levels</h6>
                    <p>Testosterone is essential for building muscle, burning fat, and maximizing your potential in and out of the gym</p>
                  </div>
                </div>
                <div className={`${styles.row} ${styles.benefitItem}`} style={{flexDirection: "row-reverse"}}>
                  <div>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon1.png" height={500}  width={500} alt=""  style={{width: "60px", height: "auto"}} /> 
                  </div>
                  <div className={`${styles.col}`} style={{padding: "0 2rem 0 0rem"}}>
                    <h6 style={{textAlign: "right"}}>Boosts Testosterone Levels</h6>
                    <p style={{textAlign: "right"}}>Testosterone is essential for building muscle, burning fat, and maximizing your potential in and out of the gym</p>
                  </div>
                </div>
              </div>

              <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "100%", justifyContent: "space-between", padding: "2rem 0"}}>
                <div className={`${styles.row} ${styles.benefitItem}`} >
                  <div>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon1.png" height={500}  width={500} alt=""  style={{width: "60px", height: "auto"}} /> 
                  </div>
                  <div className={`${styles.col}`} style={{padding: "0 0 0 2rem"}}>
                    <h6>Boosts Testosterone Levels</h6>
                    <p>Testosterone is essential for building muscle, burning fat, and maximizing your potential in and out of the gym</p>
                  </div>
                </div>
                <div className={`${styles.row} ${styles.benefitItem}`} style={{flexDirection: "row-reverse"}}>
                  <div>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon1.png" height={500}  width={500} alt=""  style={{width: "60px", height: "auto"}} /> 
                  </div>
                  <div className={`${styles.col}`} style={{padding: "0 2rem 0 0rem"}}>
                    <h6 style={{textAlign: "right"}}>Boosts Testosterone Levels</h6>
                    <p style={{textAlign: "right"}}>Testosterone is essential for building muscle, burning fat, and maximizing your potential in and out of the gym</p>
                  </div>
                </div>
              </div>

              <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s4img.png"} height={5000}  width={5000} alt="" style={{
                  position: "absolute",
                  bottom: 0,
                  top: 0,
                  width: "400px",
                  height: "auto"
                }}  />
              <div className={styles.s3btn} style={{width: "50%"}}>
              Order Now
              </div>
              <div className={`${styles.row} ${styles.btnTxt}`} style={{width: "50%", color: "white"}}>
                <p className={styles.btnTxt1} style={{color: "white"}}>Ships: Within 24 Hours</p> 
                |
                <p className={styles.btnTxt} style={{color: "white"}}>
                  <Image src="https://hitsdesignclients.com/Peak-Male-new/images/shape.png" height={50}  width={50} alt="" className={styles.hourglass} style={{width: "10px", height: "auto"}} /> 
                  Stock: 58 Bottles Remaining
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* INGREDIENTS SECTION */}
        <div className={`${styles.col} ${styles.sec3}`} style={{width: "100%", padding: "4rem 0 4rem 0"}}>
          <div className={styles.delcinedTestWrapper}>
            <h1 style={{color: "black", fontWeight: "900", textAlign: "center", fontSize: "50px", lineHeight: "56px"}}>
              The Science behind Peak Male <br />
              <span style={{color: "#17378a"}}>Xtreme Test Booster</span>
            </h1>
            <p style={{color: "black", marginTop: "19px", textAlign: "center", fontSize: "18px", lineHeight: "26px"}}>
              Our unique blend of 6 powerful herbs work together to support healthy testosterone levels, improve muscle mass <br /> 
              and athletic performance, and promote overall male health and vitality
            </p>

            <div className={`${styles.col}`}>
              <div className={`${styles.row}`} style={{padding: "2rem 0"}}>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img1.png"} height={5000}  width={5000} alt="" style={{
                    position: "relative",
                    bottom: 0,
                    top: 0,
                    width: "400px",
                    height: "auto"
                  }}  />
                <div className={`${styles.col}`}>
                  <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: "left",
                    width: "100%"
                  }}>Fenugreek</h5>
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`}>
                    <li>Regulates the conversion of testosterone to DHT, providing a natural solution for excessive 
                      DHT levels in men, resulting in an increase in testosterone levels.</li>
                      
                      <li>Contains a compounds called fenusides, which have been found to stimulate the production of 
                      luteinizing hormone (LH), which is responsible for signaling the testes to produce testosterone.</li>
                      
                      <li>Supports overall hormonal balance, prostate health, hair loss, and skin health in&nbsp;men.</li>
                      
                      <li>Also contains compounds called saponins, which have been shown to inhibit the activity of 
                      the enzyme aromatase. Aromatase is responsible for converting testosterone into estrogen, so by 
                      inhibiting its activity, Fenugreek can help reduce the conversion of testosterone to estrogen and 
                      increase the amount of free testosterone in the&nbsp;body.</li>
                  </ul>
                </div>
              </div>

              <div className={`${styles.row}`} style={{padding: "2rem 0", flexDirection: "row-reverse"}}>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img2.png"} height={5000}  width={5000} alt="" style={{
                    position: "relative",
                    bottom: 0,
                    top: 0,
                    width: "400px",
                    height: "auto"
                  }}  />
                <div className={`${styles.col}`}>
                  <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: "left",
                    width: "100%"
                  }}>Maca Powder</h5>
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`}>
                    <li>Maca has been shown to reduce cortisol levels in men who are experiencing chronic stress, resulting in improved testosterone levels and overall well being.</li>
                      
                      <li>Promotes the production of luteinizing hormone (LH), which is responsible for stimulating the testes to produce testosterone in males.</li>
                      
                      <li>Supports overall hormonal balance, prostate health, hair loss, and skin health in&nbsp;men.</li>
                      
                      <li>Maca powder contains compounds that can help reduce the activity of the enzyme aromatase, which is responsible for converting testosterone into estrogen. One study found that Maca supplementation led to a significant reduction in aromatase activity in men.</li>
                  </ul>
                </div>
              </div>

              <div className={`${styles.row}`} style={{padding: "2rem 0"}}>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img3.png"} height={5000}  width={5000} alt="" style={{
                    position: "relative",
                    bottom: 0,
                    top: 0,
                    width: "400px",
                    height: "auto"
                  }}  />
                <div className={`${styles.col}`}>
                  <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: "left",
                    width: "100%"
                  }}>Tongkot Ali</h5>
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`}>
                    <li>Tongkat Ali has been shown to reduce the production of cortisol, which is a stress hormone that can negatively impact testosterone production.</li>
                    
                    <li>Contains a compound called eurycomanone, that helps to stimulate the production of luteinizing hormone (LH), which is responsible for signaling the testes to produce testosterone in males.</li>
                    
                    <li>Tongkat Ali has also been shown to reduce levels of sex hormone binding globulin (SHBG), which is a protein that binds to testosterone and prevents it from being used by the body. By reducing SHBG levels, Tongkat Ali can increase the amount of free testosterone in the body, leading to improved muscle mass, athletic performance, and sexual function.</li>
                    
                  </ul>
                </div>
              </div>

              <div className={`${styles.row}`} style={{padding: "2rem 0",flexDirection: "row-reverse"}}>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img4.png"} height={5000}  width={5000} alt="" style={{
                    position: "relative",
                    bottom: 0,
                    top: 0,
                    width: "400px",
                    height: "auto"
                  }}  />
                <div className={`${styles.col}`}>
                  <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: "left",
                    width: "100%"
                  }}>Panax Ginseng:</h5>
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`}>
                    <li>Contains a compound called ginsenoside, which has been found to stimulate the production of luteinizing hormone (LH), which is responsible for signaling the testes to produce testosterone.</li>
                      
                    <li>Panax Ginseng has been shown to have adaptogenic properties, meaning it can help the body adapt to and cope with stress.</li>
                      
                    <li>Has been shown to have anti-inflammatory and antioxidant properties, which can help protect the body against oxidative stress and reduce inflammation throughout the body.</li>
                      
                  </ul>
                </div>
              </div>

              <div className={`${styles.row}`} style={{padding: "2rem 0"}}>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img5.png"} height={5000}  width={5000} alt="" style={{
                    position: "relative",
                    bottom: 0,
                    top: 0,
                    width: "400px",
                    height: "auto"
                  }}  />
                <div className={`${styles.col}`}>
                  <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: "left",
                    width: "100%"
                  }}>Horny Goat Weed:</h5>
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`}>
                    <li>Contains a compound called icariin, has been found to inhibit the activity of the enzyme that converts testosterone into estrogen, leading to higher levels of free testosterone in the body.</li>
                    
                    <li>Horny Goat Weed has been shown to have vasodilatory effects, meaning it can help improve blood flow throughout the body. This can have a positive impact on athletic performance and sexual function, as it can increase the amount of oxygen and nutrients that reach the muscles and sexual organs.</li>
                  
                  </ul>
                </div>
              </div>

              <div className={`${styles.row}`} style={{padding: "2rem 0",flexDirection: "row-reverse"}}>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img6.png"} height={5000}  width={5000} alt="" style={{
                    position: "relative",
                    bottom: 0,
                    top: 0,
                    width: "400px",
                    height: "auto"
                  }}  />
                <div className={`${styles.col}`}>
                  <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: "left",
                    width: "100%"
                  }}>Tribulus Terrestris:</h5>
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`}>
                    <li>Contains a compound called protodioscin, that helps to stimulate the production of luteinizing hormone (LH), which is responsible for signaling the testes to produce testosterone in males.</li>
                      
                    <li>Has been shown to reduce SHBG levels, Tribulus Terrestris can increase the amount of free testosterone in the body, leading to improved muscle mass, athletic performance, and sexual function.</li>
                      
                  </ul>
                </div>
              </div>

              <p className={styles.s5subhding}>Peak Male Promise</p>
              
              <ul className={styles.s5list}>
                <li>
                    <Image  height={5000}  width={5000} alt="" src="https://hitsdesignclients.com/Peak-Male-new/images/s5icon1.png" style={{width: "100px", height: "auto"}} />
                      <p>Non-GMO</p>
                  </li>
                  <li>
                    <Image  height={5000}  width={5000} alt="" src="https://hitsdesignclients.com/Peak-Male-new/images/s5icon2.png" style={{width: "100px", height: "auto"}}  />
                      <p>All Natural<br />Ingredients</p>
                  </li>
                  <li>
                    <Image  height={5000}  width={5000} alt="" src="https://hitsdesignclients.com/Peak-Male-new/images/s5icon3.png" style={{width: "100px", height: "auto"}}  />
                      <p>Fast<br />Shipping</p>
                  </li>
                  <li>
                    <Image  height={5000}  width={5000} alt="" src="https://hitsdesignclients.com/Peak-Male-new/images/s5icon4.png" style={{width: "100px", height: "auto"}}  />
                      <p>Secure<br />Shopping</p>
                  </li>
                  <li>
                    <Image  height={5000}  width={5000} alt="" src="https://hitsdesignclients.com/Peak-Male-new/images/s5icon5.png" style={{width: "100px", height: "auto"}}  />
                      <p>Satisfaction<br />Guaranteed</p>
                  </li>
              </ul>

              <div className={styles.s3btn} style={{width: "50%", margin: "2rem 0 0 0"}}>
              Order Now
              </div>
              <div className={`${styles.row} ${styles.btnTxt}`} style={{width: "50%"}}>
                <p className={styles.btnTxt1}>Ships: Within 24 Hours</p> 
                |
                <p className={styles.btnTxt}>
                  <Image src="https://hitsdesignclients.com/Peak-Male-new/images/shape.png" height={50}  width={50} alt="" className={styles.hourglass} style={{width: "10px", height: "auto"}} /> 
                  Stock: 58 Bottles Remaining
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TESTIMONIAL SECTION */}
        <div className={`${styles.col} ${styles.sec3} ${styles.sec6}`} style={{width: "100%",}}>
          <div className={styles.delcinedTestWrapper}>
            <h1 style={{color: "black", fontWeight: "900", textAlign: "center", fontSize: "50px", lineHeight: "56px"}}>
              Customer Testimonials <br />
              <span style={{color: "#17378a"}}>Real People. Real Results</span>
            </h1>
            <div className={`${styles.row} ${styles.testimonial}`}>
              <div className={`${styles.col}`} style={{width: "30%",}}>
                <Image src="https://hitsdesignclients.com/Peak-Male-new/images/t2.png" height={5000}  width={5000} alt="" style={{width: "300px", height: "auto"}} /> 
              </div>
              <div className={`${styles.col}`}  style={{width: "70%", padding: "1rem", alignItems: "flex-start"}}>
                <Image src="https://hitsdesignclients.com/Peak-Male-new/images/sldrstars.png" height={500}  width={500} alt="" style={{width: "150px", height: "auto"}} /> 
                <h2 className={styles.sldrTxt1}>The Kickstart I Needed</h2>
                <p className={styles.sldrTxt2}>
                  I'm at that stage in life where testosterone seems to take a back seat, and I knew it was time to intervene. I wasn't ready for the big leap into injections, so I sought out a natural route. Peak Male popped up on my Instagram, and I figured, why not give it a try?
                  <br/><br/>
                  I've been through an entire bottle, taking two caps a day for the past four weeks. The first week went by without much change. But come week two, I started noticing a shift. I know what testosterone feels like, and this was it - not as intense, but a similar vibe.
                </p>
                <div className={`${styles.col}`} style={{width: "100%", justifyContent: "flex-start", alignItems: "flex-start", position: "relative"}}>
                  <div  className={`${styles.row}`} style={{width: "100%"}}>
                  <Image src="https://hitsdesignclients.com/Peak-Male-new/images/sldrqt.png" height={500}  width={500} alt="" style={{width: "70px", height: "auto"}} /> 
                  <Image src="https://hitsdesignclients.com/Peak-Male-new/images/sldrbtl.png" height={500}  width={500} alt="" style={{width: "70px", height: "auto", position: "absolute", right: "40px", bottom: "20px"}} />
                  </div>
                  <p className={styles.sldrnm}>Terrance B.</p>
                </div>
              </div>
              <button className={styles.slickPrev}></button>
              <button className={styles.slickNext}></button>
            </div>
          </div>
        </div>

        {/* <StaticButton scroll={scrollToElement} /> */}
        {/* FAQ SECTION */}
        <div className={`${styles.col}`} style={{background: "#eef5fc",padding: "2rem 0rem 2rem 0"}}>
          <div className={`${styles.col}`} style={{justifyContent: "center", padding: "2rem 0rem 2rem 0", textAlign: "center"}}>
              <h1 style={{color: "black", fontSize: "50px"}}>
                Frequently Asked Questions <br />
                <span style={{color: "#17378a"}}>We've Got All The Answers</span>
              </h1>
          </div>
          <Accordion title={"How long will it take to receive my order?"} detail={"Our shipping typically takes between 4 to 9 days depending on your location. We ship our coins from Fayetteville, AR via USPS Shipping with Tracking. Rest assured that we strive to deliver your order promptly and securely."} />
          <Accordion title={"Is there a warranty for these coins?"} detail={"Yes, all coins come with a lifetime warranty with 100% money back guarantee. We stand behind the quality and craftsmanship of our products."} />
          <Accordion title={"Do you offer bulk discounts for large orders?"} detail={"Our coins come in 5, 10, and 20 packs. We are able to offer 30% Off on our 20-pack coins. If you're interested in larger quantities, please reach out to our sales team directly for inquiries regarding bulk orders and potential discounts. We will be more than happy to assist you with your request."} />
          <Accordion title={"What is your return and refund policy?"} detail={"We want you to be completely satisfied with your purchase. If, for any reason, you are not happy with your order, please contact our customer service team at info@holdtheline.com. We aim to provide a hassle-free return process and resolve any issues promptly."} />
          <Accordion title={"How can I contact customer support?"} detail={"Our dedicated customer support team is here to assist you. You can reach us by email at info@holdtheline.com or by phone at 877-462-4459 during our business hours, which are Monday-Friday from 9am-4pm CST. We value your feedback and strive to provide excellent customer service."} />
        
          <div className={styles.s3btn} style={{width: "20%", margin: "2rem 0 0 0"}}>
          Order Now
          </div>
          <div className={`${styles.row} ${styles.btnTxt}`} style={{width: "30%"}}>
            <p className={styles.btnTxt1}>Ships: Within 24 Hours</p> 
            |
            <p className={styles.btnTxt}>
              <Image src="https://hitsdesignclients.com/Peak-Male-new/images/shape.png" height={50}  width={50} alt="" className={styles.hourglass} style={{width: "10px", height: "auto"}} /> 
              Stock: 58 Bottles Remaining
            </p>
          </div>
        </div>


      </main>

      <Footer />
    </>
  );
}
