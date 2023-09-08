import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import OrderFormContainer, { InitialValuesType }  from "@/components/Form/FormSection";
import Accordion from "@/components/global/Accordian";
import { LineItem } from "@/components/Form/OrderForm";
import Head from "next/head";
import StaticButton from "@/components/Button/StaticBtn";
import Marquee from "react-fast-marquee";
import { sendPageViewEvent } from "@/components/lib/analytics";
import TestimonialComponent from "@/components/Testimonials/Testimonials";
import BenefitsComponent from "@/components/Product/Benefits";
import DeclineInTLevelsComponent from "@/components/Product/MainProblems";
import IngredientsSection from "@/components/Product/Ingredients";
import ImageSlider from "@/components/Product/MainImageSlider";
import MobileOptinForm from "@/components/Product/MobileOptinForm";
// import Router from "next/router";

declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}


const description = `Rivigerate your manhood with Peak Male`;
const ogImgUrl =  "https://cdn.shopify.com/s/files/1/0727/2805/2008/files/card.png?v=1690477687";
const canonicalUrl = "";
const title = "Peak Male | Optimal Human" 

export default function Home() {
  const [mainImage, setImage] = useState("https://hitsdesignclients.com/Peak-Male-new/images/sldr1.png");
  const [productSelected, setProduct] = useState("SIX");
  const [isSubbed, setSub] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Page Effect -> Analytics
  useEffect(() => {
    if (!window) {};
    setWindowWidth(window.innerWidth);
    localStorage.setItem("upsell", "false");
    localStorage.setItem("cus_uuid", "");
    localStorage.setItem("subscribed", "true");
    localStorage.setItem("product", "SIX");
    localStorage.setItem("billing_address", "");
    localStorage.setItem("shipping", "");
    localStorage.setItem("customer", "");
    localStorage.setItem("draft_order", "");
    // fetchData();
    sendPageViewEvent("LANDING");
    //Send Analytics to imPowered
    // sendPageViewEvent("OPT_IN");
  }, []);

  // Select Main Image
  const selectImage = (img: string) => {
    setImage(img);
  };

  const navigateToCheckout = async (productSelect?: string) => {
    const product = productSelect !== "" ? productSelect : productSelected;
    setIsLoading(true);
    if (window) {
      localStorage.setItem("subscribed", String(isSubbed));
      localStorage.setItem("product", String(product));
      window.location.href = "/checkout";
    }
    setIsLoading(false);
  };

  const handleScroll = (scrollToElement: string) => {
    const targetElement = document.getElementById(scrollToElement);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
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

      <main className={styles.main}>
        <Header />
        
        {/* TOP SECTION */}
        <div className={`${styles.row} ${styles.mobileCol}  ${styles.topContainer} `} style={{marginTop: windowWidth < 720 ? "90px" : "7rem"}}>

          <div className={`${styles.col} ${styles.mobileFull} ${styles.topContainerLeft}`}>
            <div style={{width: windowWidth < 720 ? "100%" : "540px"}}>
              {windowWidth < 720 ? 
                <>
                  <div className={`${styles.row}`} style={{width: "95%", margin: "0 auto"}}>
                    <p style={{
                      fontSize: "18px",
                      lineHeight: "27px",
                      color: "#252525",
                      textAlign: "left",
                      fontWeight: "500",
                      letterSpacing: "0.5px"}}>
                        <span className={styles.span1} style={{
                          background: "#ff7200",
                          color: "#fff",
                          fontWeight: "100",
                          fontFamily: 'ApercuPro-Light',
                          display: "inline-block",
                          padding: "1px 10px 2px 5px",
                          fontSize: "15px",
                          position: "relative",
                          letterSpacing: 0}}>#1 Best Seller - Male Performance </span>
                    </p>
                  </div>

                  <div className={`${styles.row}`} style={{width: "95%", margin: "0px auto",  padding: "0rem"}}>
                    <p style={{
                      fontSize: "3.4vw",
                      lineHeight: "18px",
                      marginTop: "13px",
                      color: "#fff",
                      textAlign: "left"}}>
                        <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/stars.png"} alt={""} width={100} height={50} style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          margin: "-4px 6px 0 0",
                          height: "auto",
                          fontWeight: "100"
                        }}  />
                        Rated 4.9 by 2000+ Verified Customers 
                    </p>
                  </div>

                  <div style={{
                    justifyContent: "space-between",
                    padding: "0rem",
                    width: "95%",
                    margin: "1rem auto 2rem auto"
                    }}>
                    <p className={`${styles.row}`} style={{
                      width: "100%",
                      fontSize: "20px",
                      fontWeight: "500",
                      lineHeight: "25px",
                      textAlign: "left",
                      marginTop: "20px",
                      color: "#fff",
                      borderBottom: "1px solid #cccccc",
                      justifyContent: "space-between",
                      padding: "0 0rem 5px 0rem"}}>
                        <div>
                          <span style={{
                            letterSpacing: "3px",
                            fontSize: "40px",
                            color: "white",
                            fontWeight: "200",
                            fontFamily: 'ApercuPro-Medium'}}>Peak Male</span>
                          <br />
                          <span style={{fontSize: "20px", fontFamily: 'ApercuPro-light'}}>Xtreme Test Booster </span>
                        </div>
                        <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/capsule.png"} alt={""} width={100} height={100} style={{height: "auto", width: "80px", margin: "0"}}  />
                      </p>
                  </div> 
                </>
                : null}

                {/* MAIN IMAGE */}
                <ImageSlider mainImage={mainImage} windowWidth={windowWidth} selectImage={selectImage} />

                {/* GUARANTEE || TEXT */}
                {windowWidth > 720 ? <div className={`${styles.row} ${styles.badges}`}>
                  <div>
                    <img src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal3.png"} 
                      alt={""}
                      style={{width: "100%", height: "auto"}} />
                  </div>
                  <div>
                    <img src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal2.png"} 
                      alt={""}
                      style={{width: "100%", height: "auto"}} />
                  </div>
                  <div>
                    <img src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal1.png"} 
                      alt={""}
                      style={{width: "100%", height: "auto"}} />
                  </div>
                  <div>
                    <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal4.png"} 
                      alt={""}
                      width={60}
                      height={60}
                      style={{width: "100%", height: "auto"}} />
                  </div>
                </div> : <MobileOptinForm setSub={setSub} isSubbed={isSubbed} productSelected={productSelected} setProduct={setProduct} navigateToCheckout={navigateToCheckout} isLoading={isLoading} />}

                {/* PRODUCT TESTIMONIAL */}
                <div className={`${styles.row} ${styles.productTestimonial}`}>
                  <div>
                    <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1rvface.png"} 
                      alt={""}
                      width={6000}
                      height={600}
                      style={{width: "70px", height: "auto", borderRadius: "100%"}} />
                  </div>

                  <div className={`${styles.col}`} style={{padding: "0 0 0 1rem"}}>
                    <p>I ordered the 3 month supply and I just finished my 1st month (1 bottle), so I’m not sure if that’s long enough to truly notice any differences, but it seems like I'm starting to "feel" results!! I feel less tired most of the time, and I've been feeling better during/after my workouts. Plus, my sex drive seems to be improving too!</p>
                    <div className={`${styles.row}`} style={{width: "100%", marginTop: "12px", fontWeight: "bold", alignItems: "center"}}>
                      <p style={{fontFamily: 'ApercuPro-Bold'}}>Alexander L.</p>

                      <span className={`${styles.row}`} style={{alignItems: "center", fontFamily: 'ApercuPro-Light'}} >  
                          <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/rvtick.png"} 
                            alt={""}
                            width={60}
                            height={60}
                            style={{width: "15px", height: "auto", margin: "2px 0.2rem 0 1rem"}} />Verified Customer
                        </span>
                    </div>
                  </div>
                </div>
            </div>

          </div>

          <div className={`${styles.col} ${styles.mobileFull}`} style={{width:  windowWidth < 720 ? "100%" : "55%", flexWrap: "wrap", alignContent: "flex-start"}}> 
            {windowWidth > 720 ? <OrderFormContainer isSubbed={isSubbed} setSub={setSub} setProduct={setProduct} productSelected={productSelected} isLoading={isLoading} setIsLoading={setIsLoading} /> : null}
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
              fontWeight: "100",
              position: "relative",
              fontFamily: "'ApercuPro-light', sans-serif",
              letterSpacing: "0.5px"}}>Safe & Secure Checkout</p> 
            <p style={{ 
              float: "left",
              padding:" 0 30px 0 30px",
              fontSize: "17px",
              lineHeight: "38px",
              color: "#fff",
              fontWeight: "100",
              textAlign: "center",
              position: "relative",
              fontFamily: "'ApercuPro-light', sans-serif",
              letterSpacing: "0.5px"}}>|</p>
            <p style={{ 
              float: "left",
              padding:" 0 30px 0 30px",
              fontSize: "17px",
              lineHeight: "38px",
              color: "#fff",
              fontWeight: "100",
              textAlign: "center",
              position: "relative",
              fontFamily: "'ApercuPro-light', sans-serif",
              letterSpacing: "0.5px"}}>30 Day Money Back Guarantee</p> 
            <p style={{ 
              float: "left",
              padding:" 0 30px 0 30px",
              fontSize: "17px",
              lineHeight: "38px",
              color: "#fff",
              fontWeight: "100",
              textAlign: "center",
              position: "relative",
              fontFamily: "'ApercuPro-light', sans-serif",
              letterSpacing: "0.5px"}}>|</p>
            <p style={{ 
              float: "left",
              padding:" 0 30px 0 30px",
              fontSize: "17px",
              lineHeight: "38px",
              color: "#fff",
              fontWeight: "100",
              textAlign: "center",
              position: "relative",
              fontFamily: "'ApercuPro-light', sans-serif",
              letterSpacing: "0.5px"}}>Fast Shipping Across U.S.A.</p>
            <p style={{ 
              float: "left",
              padding:" 0 30px 0 30px",
              fontSize: "17px",
              lineHeight: "38px",
              color: "#fff",
              fontWeight: "100",
              textAlign: "center",
              position: "relative",
              fontFamily: "'ApercuPro-light', sans-serif",
              letterSpacing: "0.5px"}}>|</p>
          </Marquee>
        </div>

        {/* DECLINE TEST SECTION */}
        <DeclineInTLevelsComponent windowWidth={windowWidth} />

        {/* INTRODUCTION SECTION */}
        <div id="INTRODUCTION" className={`${styles.col} ${styles.sec3}`} style={{width: "100%", padding: "4rem 0 4rem 0"}}>
          <div className={styles.delcinedTestWrapper}>
            <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2line3.png"} className={styles.s2line3} height={5000}  width={5000} alt="" style={{width: "auto", height: "85px"}}  />  
            <h3 className={styles.bdhding}>
              Introducing Peak Male <br />
              <span style={{color: "#17378a"}}>Xtreme Test Booster</span>
            </h3>
            <div className={`${styles.row} ${styles.mobileCol}`} style={{width: windowWidth < 720 ? "100%" : "60%"}}>
              <div className={`${styles.col}`}>
                <p className={styles.bdfont}>
                  Our specially crafted blend of six powerful herbs has been formulated to help you achieve peak physical and mental performance. Tackling the root cause of hormone imbalances that many males face today.
                </p>
                <p className={styles.bdfont} style={{color: "#17378a", borderBottom: "1px solid #d7d7d7", borderTop: "1px solid #d7d7d7"}}>
                  Backed by science, our unique blend includes Fenugreek, Tribulus Terrestris, Maca, Tongkat Ali Root, Horny Goat Weed, and Panax Ginseng, all of which work together to support healthy testosterone levels in men.
                </p>

                {windowWidth < 720 ? <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "90%", position: "relative", justifyContent: "center", alignItems: "center", margin: "2rem 0 0 0"}}>
                  <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s3img.png"} height={5000}  width={5000} alt="" style={{
                    width: "330px",
                    height: "auto"
                  }}  />
                </div> : null}
                <p className={styles.bdfont}>
                By targeting healthy testosterone production, our all-natural blend of six powerful herbs helps to improve the overall health and vitality of men, rather than simply masking symptoms.
                </p>
                <p className={styles.bdfont}>
                Don't settle for superficial fixes that only provide temporary relief. With Peak Male, men can achieve a long-term solution that addresses the root cause of the issues that many men face, unlocking their full potential for health and vitality.
                </p>
                <p className={styles.bdfont} style={{width: "100%", borderBottom: "none"}}>
                Ready to take control and unleash your full potential?
                </p>
                <div className={styles.col} style={{width: "100%", alignItems: "flex-start"}}>
                  <div onClick={() => handleScroll("SELECT_PRODUCT")} className={styles.s3btn} style={{width: windowWidth < 720 ? "100%" : "70%", marginLeft: "0"}}>
                    Order Now
                  </div>
                  <div className={`${styles.row} ${styles.btnTxt}`}  style={{width: windowWidth < 720 ? "100%" : "70%"}}>
                    <p className={styles.btnTxt1}>Ships: Within 24 Hours</p> 
                    |
                    <p className={styles.btnTxt}>
                      <Image src="https://hitsdesignclients.com/Peak-Male-new/images/shape.png" height={50}  width={50} alt="" className={styles.hourglass} style={{width: "10px", height: "auto"}} /> 
                      Stock: 58 Bottles Remaining
                    </p>
                  </div>
                </div>
              </div>
              {windowWidth > 720 ? <div className={`${styles.row} ${styles.mobileCol}`} style={{width:"40%", position: "relative"}}>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s3img.png"} height={5000}  width={5000} alt="" style={{
                  position: "absolute",
                  bottom: 0,
                  top: 0,
                  left: "100px",
                  width: "500px",
                  height: "auto"
                }}  />
              </div> : null}
            </div>
          </div>
        </div>

        {/* BENEFITS SECTION */}
        <BenefitsComponent windowWidth={windowWidth} handleScroll={handleScroll} />

        {/* INGREDIENTS SECTION */}
        <IngredientsSection windowWidth={windowWidth} handleScroll={handleScroll} />

        {/* TESTIMONIAL SECTION */}
        <TestimonialComponent windowWidth={windowWidth} />

        <StaticButton scrollToElement={"SELECT_PRODUCT"} />

        {/* FAQ SECTION */}
        <div id="FAQ"  className={`${styles.col}`} style={{background: "#eef5fc",padding: "2rem 0rem 2rem 0"}}>
          <div className={`${styles.col}`} style={{justifyContent: "center", padding: "2rem 0rem 2rem 0", textAlign: "center"}}>
              <h1 style={{color: "black", fontSize: windowWidth < 720 ? "22px" :"50px"}}>
                Frequently Asked Questions <br />
                <span style={{color: "#17378a"}}>We've Got All The Answers</span>
              </h1>
          </div>
          <Accordion defaultOpen={true} title={"What is Peak Male?"} detail={"Peak Male is a natural testosterone booster supplement formulated with six powerful herbs that work together to help men achieve their peak physical and mental performance."} />
          <Accordion defaultOpen={false} title={"What does Peak Male do?"} detail={"Peak Male is designed to aid the body in producing testosterone naturally and support balanced hormonal health. It does not contain actual testosterone; instead, it utilizes a power combination of herbs that have been shown to support testosterone production, maintain hormonal balance, and encourage a healthy response to stress."} />
          <Accordion defaultOpen={false} title={"What are the benefits of using Peak Male?"} detail={"Peak Male can help support healthy testosterone levels in men, which can lead to increased muscle mass, improved athletic performance, enhanced sexual function, improved mood and energy levels, and overall improved health and wellness."} />
          <Accordion defaultOpen={false} title={"Is Peak Male safe?"} detail={"Yes, Peak Male is made with all-natural ingredients and is safe for most men to use. However, as with any supplement, it is important to follow the recommended dosage instructions and consult with a healthcare professional if you have any underlying medical conditions or are taking any medications."} />
          <Accordion defaultOpen={false} title={"How long does it take to see results with Peak Male?"} detail={"Results may vary from person to person, but most men should start to notice some benefits within a few weeks of starting to use Peak Male. However, it is important to use the supplement consistently and as directed in order to achieve optimal results."} />
          <Accordion defaultOpen={false} title={"Are there any side effects from using Peak Male?"} detail={"Peak Male is made with all-natural ingredients and is generally well-tolerated. If you experience any adverse effects, discontinue use and consult with a healthcare professional."} />
          <Accordion defaultOpen={false} title={"Can I take Peak Male with other supplements or medications?"} detail={"It is always important to consult with a healthcare professional before starting any new supplement or medication. Some ingredients in Peak Male may interact with certain medications or supplements, so it is important to discuss any potential interactions with your healthcare provider."} />
          <Accordion defaultOpen={false} title={"Is Peak Male suitable for vegetarians or vegans?"} detail={"Yes, Peak Male is made with all-natural, plant-based ingredients and is suitable for vegetarians and vegans."} />
          <Accordion defaultOpen={false} title={"How do I take Peak Male?"} detail={"For optimal results, it is recommended to take 1 capsule of Peak Male 1-2 times per day, preferably with food or as directed by a healthcare professional."} />
        
          {windowWidth > 720 ? <>
            <div onClick={() => handleScroll("SELECT_PRODUCT")} className={styles.s3btn} style={{width: windowWidth <720 ? "100%" : "50%"}}>
            Order Now
            </div>
            <div className={`${styles.row} ${styles.btnTxt}`} style={{width:  windowWidth <720 ? "100%" : "50%", color: "black"}}>
              <p className={styles.btnTxt1} style={{color: "black"}}>Ships: Within 24 Hours</p> 
              |
              <p className={styles.btnTxt} style={{color: "black"}}>
                <Image src="https://hitsdesignclients.com/Peak-Male-new/images/shape.png" height={50}  width={50} alt="" className={styles.hourglass} style={{width: "10px", height: "auto"}} /> 
                Stock: 58 Bottles Remaining
              </p>
            </div>
          </> : null}
        </div>

      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps({  }) {
  await sendPageViewEvent("LANDING");
  return { props: {} };
}
