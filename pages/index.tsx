import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import OrderFormContainer, { InitialValuesType }  from "@/components/Form/FormSection";
import Accordion from "@/components/global/Accordian";
// import { sendPageViewEvent } from "@/components/lib/analytics";
// import { saveItem } from "@/context/storage";
// import { imPoweredRequest } from "@/components/lib/request";
import { LineItem } from "@/components/Form/OrderForm";
import Head from "next/head";
import StaticButton from "@/components/Button/StaticBtn";
import Marquee from "react-fast-marquee";
import { sendPageViewEvent } from "@/components/lib/analytics";
// import Router from "next/router";

declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}


// Initial Product Selected
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

const description = `Rivigerate your manhood with Peak Male`;
const ogImgUrl =  "https://cdn.shopify.com/s/files/1/0727/2805/2008/files/card.png?v=1690477687";
const canonicalUrl = "";
const title = "Peak Male | Optimal Human" 

export default function Home() {
  const [mainImage, setImage] = useState("");
  const [testimonial, setTestimonial] = useState(1);
  const [issueNum, setIssue] = useState(1);
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
    //Send Analytics to imPowered
    // sendPageViewEvent("OPT_IN");
  }, []);

  // Select Main Image
  const selectImage = (img: string) => {
    setImage(img);
  };

  // Slide Between Testimonials
  const changeTestimonial = (num: number) => {
    console.log(testimonial)
    if ((testimonial + num) > 3) {
      setTestimonial(1);
    } else if ((testimonial + num) < 1) {
      setTestimonial(3);
    } else {
      setTestimonial(testimonial + num);
    }
  };

  // Slide Between Issues
  const changeIssue = (num: number) => {
    console.log(issueNum)
    if ((issueNum + num) > 4) {
      setIssue(1);
    } else if ((issueNum + num) < 1) {
      setIssue(4);
    } else {
      setIssue(issueNum + num);
    }
  };

  const navigateToCheckout = async () => {
    setIsLoading(true);
    if (window) {
      localStorage.setItem("subscribed", String(isSubbed));
      localStorage.setItem("product", String(productSelected));
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
                <div className={styles.col} style={{width: "100%"}}>
                  <Image src={mainImage !== "" ? mainImage : "https://hitsdesignclients.com/Peak-Male-new/images/sldr1.png"} 
                    alt={""}
                    width={5000}
                    height={5000}
                    style={{width: windowWidth < 720 ? "250px" : "450px", height: "auto", transition: "opacity 0.5s ease-in-out"}} />
                </div>

                {/* SELECT IMAGE */}
                <div className={`${styles.row} ${styles.imgSliders}`}>
                  <div onClick={() => selectImage("https://hitsdesignclients.com/Peak-Male-new/images/sldr1.png")}>
                    <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/sldr1.png"} 
                      alt={""}
                      width={500}
                      height={500}
                      style={{width: windowWidth < 720 ? "40px" : "60px", height: "auto"}} />
                  </div>
                  <div onClick={() => selectImage("https://hitsdesignclients.com/Peak-Male-new/images/sldr2.png")}>
                    <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/sldr2.png"} 
                      alt={""}
                      width={500}
                      height={500}
                      style={{width: windowWidth < 720 ? "40px" :  "60px", height: "auto"}} />
                  </div>
                  <div onClick={() => selectImage("https://hitsdesignclients.com/Peak-Male-new/images/sldr3.png")}>
                    <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/sldr3.png"} 
                      alt={""}
                      width={500}
                      height={500}
                      style={{width: windowWidth < 720 ? "40px" : "60px", height: "auto"}} />
                  </div>
                  <div onClick={() => selectImage("https://hitsdesignclients.com/Peak-Male-new/images/sldr4.png")}>
                    <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/sldr4.png"} 
                      alt={""}
                      width={500}
                      height={500}
                      style={{width: windowWidth < 720 ? "40px" : "60px", height: "auto"}} />
                  </div>
                </div>

                {/* GUARANTEE || TEXT */}
                {windowWidth > 720 ? <div className={`${styles.row} ${styles.badges}`}>
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
                </div> : 
                  <><div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between", padding: "0 1rem"}}>
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
                    textAlign: "left",
                    padding: "0 1rem"}}>
                    Helps With:
                  </p>

                  <div className={`${styles.row}`} style={{width: "100%", justifyContent: "flex-start", marginTop: "15px", padding: "0 1rem"}}>
                    <ul className={`${styles.helpsWith}`}>
                      <li>
                        <img src={"https://hitsdesignclients.com/Peak-Male-new/images/help-icon1.png"} alt={""} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Libido
                      </li>
                      <li>
                        <img src={"https://hitsdesignclients.com/Peak-Male-new/images/help-icon2.png"} alt={""} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Energy
                      </li>
                      <li>
                        <img src={"https://hitsdesignclients.com/Peak-Male-new/images/help-icon3.png"} alt={""} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>T-Boost
                      </li>
                      <li>
                        <img src={"https://hitsdesignclients.com/Peak-Male-new/images/help-icon4.png"} alt={""} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Cognition
                      </li>
                    </ul>
                  </div>

                  <div className={`${styles.row} ${styles.benefitbox} ${styles.mobileCol}`}>
                    <div className={`${styles.col}`} style={{alignItems: "flex-start", marginBottom: "2rem"}}>
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
                      <p style={{width: "100%"}}><Image src={"https://hitsdesignclients.com/Peak-Male-new/images/ingredient-icon.png"} alt={""} width={50} height={50} style={{height: "25px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Key Ingredients:</p>
                      <div className={`${styles.row}`}>
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
                        </ul>
                        <ul>
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
                  </div>

                  <p id="SELECT_PRODUCT" className={`${styles.chooosePackage}`} >Choose Your Package</p>

                  <div className={`${styles.row}`} style={{width: "95%", justifyContent: "center", margin: "0 auto"}}>
                    <div onClick={() => setSub(false)} className={`${styles.subBtn}`} style={{color: !isSubbed ? "white" : "",background: !isSubbed ? "#17378a url('https://hitsdesignclients.com/Peak-Male-new/images/selected.png') 15px center no-repeat" : "#fff url('https://hitsdesignclients.com/Peak-Male-new/images/select.png') 15px center no-repeat", border: !isSubbed ? "1px solid #17378a" : ""}}>
                      One Time <br />Purchase
                    </div>
                    <div onClick={() => setSub(true)} className={`${styles.subBtn}`} style={{color: isSubbed ? "white" : "", margin: 0, background: isSubbed ? "#17378a url('https://hitsdesignclients.com/Peak-Male-new/images/selected.png') 15px center no-repeat" : "#fff url('https://hitsdesignclients.com/Peak-Male-new/images/select.png') 15px center no-repeat", border: isSubbed ? "1px solid #17378a" : ""}}>
                      Subscribe & <br /><span>Save 20%</span>
                    </div>
                  </div>

                  <p className={styles.riskFreeTxt}>Try Risk-Free 30 Day Money Back Guarantee</p>

                  <div className={`${styles.row}  ${styles.mobileCol}`} style={{width: "100%", justifyContent: "space-between", alignItems: "center", margin: '01rem 0 0 0', flexDirection: "column-reverse"}}>
                    
                    <div onClick={() => setProduct("ONE")} className={`${styles.col} ${styles.productItem}`} style={{background: productSelected == "ONE" ? "#e5ecfe" : "#fff", border: productSelected == "ONE" ? "2px solid #17378a" : ""}} >
                      <h5 className={styles.pkghding}>1 Bottle</h5>
                      <div className={`${styles.row}`} style={{marginTop: "0px",width: "100%"}}>
                        <div  className={`${styles.row}`} style={{width: "50%", justifyContent: "center", alignItems: "center", height: "100%", minHeight: "150px"}}>
                          <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/pkg3.png"} alt={""} width={100} height={50} style={{height: "auto", width: "100%"}}  />
                        </div>
                        <div className={`${styles.col}`} style={{width: "50%"}}>
                          <h6 className={styles.supplyText}>30 Day Supply</h6>
                          <p className={styles.pkgprc2}>
                            <span className={styles.BigPrice}>{isSubbed ? "$59" : "$69"}</span>
                            <span className={styles.PriceUnit}>/per bottle</span>
                          </p>
                          
                          <div className={`${styles.col}`}  style={{width: "100%"}}>
                            <p className={styles.pkgtxt1}>You Save $30</p>
                            <p className={styles.pkgprc1}><span className={styles.strikeout}>$89</span> <strong>$59</strong></p>
                          </div>
                        </div>
                      </div>
                      <div  onClick={() => navigateToCheckout()} className={`${styles.row}`} style={{margin: "0px auto",width: "100%"}}>
                        <button 
                          disabled={isLoading}
                          style={{
                          cursor: isLoading ? "progress" : "pointer",
                          display: "block",
                          margin: "10px auto 0",
                          background: "#ff7200",
                          height: "45px",
                          width: "80%",
                          borderRadius: "5px",
                          fontSize: "18px",
                          lineHeight: "45px",
                          letterSpacing: "0.5px",
                          color: "#fff",
                          border: "none",
                          outline: "none",
                          fontWeight: "600"}}> Add To Cart</button>
                      </div>
                    </div>

                    <div onClick={() => setProduct("THREE")} className={`${styles.col} ${styles.productItem}`} style={{background: productSelected == "THREE" ? "#e5ecfe" : "#fff", border: productSelected == "THREE" ? "2px solid #17378a" : ""}} >
                      <p className={styles.pkgTophd}>MOST POPULAR</p>
                      <h5 className={styles.pkghding}>3 Bottles</h5>
                      <div className={`${styles.row}`} style={{marginTop: "0px", width: "100%"}}>
                        <div  className={`${styles.row}`} style={{width: "50%", justifyContent: "center", alignItems: "center", height: "100%", minHeight: "150px"}}>
                          <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/pkg2.png"} alt={""} width={100} height={50} style={{height: "auto", width: "100%"}}  />
                        </div>

                        <div className={`${styles.col}`} style={{width: "50%"}}>
                          <h6 className={styles.supplyText}>60 Day Supply</h6>

                          <p className={styles.pkgprc2}>
                            <span className={styles.BigPrice}>{isSubbed ? "$49" : "$59"}</span>
                            <span className={styles.PriceUnit}>/per bottle</span>
                          </p>

                          <p className={styles.freeship}><span>
                            <Image src="https://hitsdesignclients.com/Peak-Male-new/images/chk.png" alt="" height={50} width={50} style={{height: "auto", width: "10px"}}/> Free Usa Shipping</span>
                          </p>
                          
                          <div className={`${styles.col}`}  style={{width: "100%"}}>
                            <p className={styles.pkgtxt1}><span style={{fontWeight: "800"}}>45% OFF</span> - You Save $120</p>
                            <p className={styles.pkgprc1}><span className={styles.strikeout}>$267</span> <strong>$147</strong></p>
                          </div>
                        </div>
                      </div>
                      <div onClick={() => navigateToCheckout()} className={`${styles.row}`} style={{margin: "0px auto",width: "100%"}}>
                        <button 
                          disabled={isLoading}
                          style={{
                          display: "block",
                          cursor: isLoading ? "progress" : "pointer",
                          margin: "10px auto 0",
                          background: "#ff7200",
                          height: "45px",
                          width: "80%",
                          borderRadius: "5px",
                          fontSize: "18px",
                          lineHeight: "45px",
                          letterSpacing: "0.5px",
                          color: "#fff",
                          border: "none",
                          outline: "none",
                          fontWeight: "600"}}> Add To Cart</button>
                      </div>
                    </div>

                    <div onClick={() => setProduct("SIX")} className={`${styles.col} ${styles.productItem}`} style={{background: productSelected == "SIX" ? "#e5ecfe" : "#fff", border: productSelected == "SIX" ? "2px solid #17378a" : ""}} >
                      <p className={styles.pkgTophd}>BEST VALUE</p>
                      <h5 className={styles.pkghding}>6 Bottles</h5>
                      <div className={`${styles.row}`} style={{marginTop: "0px",width: "100%"}}>
                        <div  className={`${styles.row}`} style={{width: "45%", justifyContent: "center", alignItems: "center", height: "100%", minHeight: "150px"}}>
                          <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/pkg1.png"} alt={""} width={100} height={50} style={{height: "auto", width: "100%"}}  />
                        </div>

                        <div className={`${styles.col}`} style={{width: "55%"}}>
                          <h6 className={styles.supplyText}>180 Day Supply</h6>

                          <p className={styles.pkgprc2}>
                            <span className={styles.BigPrice}>{isSubbed ? "$39" : "$49"}</span>
                            <span className={styles.PriceUnit}>/per bottle</span>
                          </p>

                          <p className={styles.freeship}>
                            <span>
                            <Image src="https://hitsdesignclients.com/Peak-Male-new/images/chk.png" alt="" height={50} width={50} style={{height: "auto", width: "10px"}}/> Free Usa Shipping
                            </span>
                          </p>


                          <div className={`${styles.col}`}  style={{width: "100%"}}>
                            <p className={styles.pkgtxt1}><span style={{fontWeight: "800"}}>55% OFF</span> - You Save $300</p>
                            <p className={styles.pkgprc1}><span className={styles.strikeout}>$534</span> <strong>$234</strong></p>
                          </div>
                        </div>
                      </div>
                      <div onClick={() => navigateToCheckout()} className={`${styles.row}`} style={{margin: "0px auto",width: "100%"}}>
                        <button 
                          disabled={isLoading}
                          style={{
                          display: "block",
                          margin: "10px auto 0",
                          cursor: isLoading ? "progress" : "pointer",
                          background: "#ff7200",
                          height: "45px",
                          width: "80%",
                          borderRadius: "5px",
                          fontSize: "18px",
                          lineHeight: "45px",
                          letterSpacing: "0.5px",
                          color: "#fff",
                          border: "none",
                          outline: "none",
                          fontWeight: "600"}}> Add To Cart</button>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.row} ${styles.btnTxt}`}>
                    <p className={styles.btnTxt1}>Ships: Within 24 Hours</p> 
                    |
                    <p className={styles.btnTxt}>
                      <Image src="https://hitsdesignclients.com/Peak-Male-new/images/shape.png" height={50}  width={50} alt="" className={styles.hourglass} style={{width: "10px", height: "auto"}} /> 
                      Stock: 58 Bottles Remaining
                    </p>
                  </div>
                  
                  <div className={`${styles.row} ${styles.badges}`}>
                    <div>
                      <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal3.png"} 
                        alt={""}
                        width={6000}
                        height={6000}
                        style={{width: "100%", height: "auto"}} />
                    </div>
                    <div>
                      <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal2.png"} 
                        alt={""}
                        width={6000}
                        height={6000}
                        style={{width: "100%", height: "auto"}} />
                    </div>
                    <div>
                      <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal1.png"} 
                        alt={""}
                        width={6000}
                        height={6000}
                        style={{width: "100%", height: "auto"}} />
                    </div>
                    <div>
                      <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal4.png"} 
                        alt={""}
                        width={6000}
                        height={6000}
                        style={{width: "100%", height: "auto"}} />
                    </div>
                  </div> 
                </>}

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

        {/* DECLINE SECTION */}
        <div className={`${styles.col}`} style={{width: "100%", padding: "4rem 0 4rem 0", background: "url('https://hitsdesignclients.com/Peak-Male-new/images/sec2.jpg') center bottom no-repeat"}}>
          <div className={styles.delcinedTestWrapper}>
            <h1 style={{color: "red", fontFamily: 'ApercuPro-Bold', textAlign: "center", fontSize: windowWidth < 720 ? "25px" : "50px", lineHeight:  windowWidth < 720 ? "30px" : "56px"}}> Decline In T-Levels In Men <br /> Is The Harsh Reality</h1>
            <p style={{color: "black", marginTop: "19px", textAlign: "center", fontSize: windowWidth < 720 ? "14px" : "18px", lineHeight: windowWidth < 720 ? "18px" : "26px"}}>
              Studies show that male testosterone levels have been steadily declining since the 1980's, <br className={styles.none} />
              impacting an entire generation of men around the world.
            </p>
            <h5 className={styles.s2subhding}>Some of the most common symptoms include</h5>
            <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2line.png"} alt={""} height={5000} width={5000} className={`${styles.none} ${styles.s2line}`} />
            {windowWidth > 720 ? <ul className={styles.s2list}>
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
                <p className={styles.s2ltxt}>Muscle loss can compromise your strength, athletic performance, and body composition, often occurring due to low testosterone levels, aging, and inadequate nutrition.</p>
              </li>
            </ul> : 
            <div className={styles.s2list}>
              {issueNum == 1 ? <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img1.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>Low Libido</h4>
                <p className={styles.s2ltxt}>Low libido, or a diminished sex drive, can impact your overall quality of life, confidence, and intimate relationships. It's a common issue often associated with low testosterone levels, stress, and various lifestyle factors.</p>
              </li> : null}
              {issueNum == 2 ? <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img2.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>All Day Fatigue</h4>
                <p className={styles.s2ltxt}>Constant fatigue can leave you feeling drained, unproductive, and disengaged from the activities you once enjoyed. It can stem from various factors, including low testosterone levels, stress, and poor lifestyle choices.</p>
              </li> : null}
              {issueNum == 3 ? <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img3.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>Weight Gain</h4>
                <p className={styles.s2ltxt}>Unwanted weight gain can affect your self-esteem, physical appearance, and overall health, often resulting from hormonal imbalances, low testosterone levels, and lifestyle habits.</p>
              </li> : null}
              {issueNum == 4 ? <li>
                <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s2img4.png"} height={1000} width={1000} alt="" />
                <h4 className={styles.s2lhding}>Muscle Loss</h4>
                <p className={styles.s2ltxt}>Low libido, or a diminished sex drive, can impact your overall quality of life, confidence, and intimate relationships. It's a common issue often associated with low testosterone levels, stress, and various lifestyle factors.</p>
              </li> : null}

              <div className={styles.row} style={{width: "100%", justifyContent: "center", marginTop: "1rem"}}>
                  <div onClick={() => setIssue(1)} className={styles.col} style={{margin: "0 0.5rem", background: "white", border: "1px solid black", height: "15px", width: "15px", borderRadius: "100%"}}>
                    <div style={{background: issueNum == 1 ? "black" : "white", height: "10px", width: "10px", borderRadius: "100%"}}></div>
                  </div>
                  <div onClick={() => setIssue(2)} className={styles.col} style={{margin: "0 0.5rem", background: "white", border: "1px solid black", height: "15px", width: "15px", borderRadius: "100%"}}>
                    <div style={{background: issueNum == 2 ? "black" : "white", height: "10px", width: "10px", borderRadius: "100%"}}></div>
                  </div>
                  <div onClick={() => setIssue(3)} className={styles.col} style={{margin: "0 0.5rem", background: "white", border: "1px solid black", height: "15px", width: "15px", borderRadius: "100%"}}>
                    <div style={{background: issueNum == 3 ? "black" : "white", height: "10px", width: "10px", borderRadius: "100%"}}></div>
                  </div>
                  <div onClick={() => setIssue(4)} className={styles.col} style={{margin: "0 0.5rem", background: "white", border: "1px solid black", height: "15px", width: "15px", borderRadius: "100%"}}>
                    <div style={{background: issueNum == 4 ? "black" : "white", height: "10px", width: "10px", borderRadius: "100%"}}></div>
                  </div>
              </div>
              <button onClick={() => changeIssue(-1)} className={styles.issuePrev}></button>
              <button onClick={() => changeIssue(1)}  className={styles.issueNext}></button>
            </div> }

            <div className={`${styles.s2bx2} ${styles.row}`}>
              <img src={"https://hitsdesignclients.com/Peak-Male-new/images/s2prd.png"} alt={""}  className={styles.s2prd} />
            </div>
            <p className={`${styles.s2lhding2} ${styles.row}`}>
              This is why our team at Optimal Human created Peak Male – the most comprehensive male 
              vitality supplement on the market, dedicated to addressing key human health challenges by carefully formulating 
              targeted solutions with scientifically-backed ingredients.
            </p>
          </div>
        </div>

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
        <div id="BENEFITS" className={`${styles.col} ${styles.sec4}`} style={{width: "100%", padding: windowWidth < 720 ? "2rem 0 1rem 0" : "4rem 0 4rem 0"}}>
          <div className={styles.delcinedTestWrapper} style={{width: windowWidth < 720 ? "95%" : "70%"}}>
            <h3 className={styles.bdhding} style={{color: "white", textAlign: "center"}}>
            Benefits Of Peak Male <br />
              <span>Xtreme Test Booster</span>
            </h3>
            <p className={styles.bdfont} style={{color: "white", textAlign: "center",border: "none", fontFamily: 'ApercuPro-Light'}}>
              Awaken your inner Alpha with our supercharged blend of 6 powerful herbs
            </p>
            <div className={`${styles.col}`} style={{position: "relative"}}>

              {windowWidth < 720 ?  <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s4img.png"} height={5000}  width={5000} alt="" style={{
                  width: "300px",
                  height: "auto"
                }}  /> : null}

              <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "100%", justifyContent: "space-between", padding: windowWidth < 720 ? "0rem 0" : "2rem 0"}}>
                <div className={`${styles.row} ${styles.benefitItem}`} >
                  <div>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon1.png" height={500}  width={500} alt=""  style={{width: "100px", height: "auto"}} /> 
                  </div>
                  <div className={`${styles.col}`} style={{padding: "0 0 0 1rem"}}>
                    <h6>Boosts Testosterone Levels</h6>
                    <p>Testosterone is essential for building muscle, burning fat, and maximizing your potential in and out of the gym</p>
                  </div>
                </div>
                <div className={`${styles.row} ${styles.benefitItem}`} style={{flexDirection: windowWidth < 720 ? "row" : "row-reverse", borderTop: windowWidth > 720 ? "none" : "1px solid #303d60", borderBottom:  windowWidth > 720 ?  "none" : "1px solid #303d60", padding: windowWidth < 720 ? "1rem 0" : ""}}>
                  <div>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon2.png" height={500}  width={500} alt=""  style={{width: "100px", height: "auto"}} /> 
                  </div>
                  <div className={`${styles.col}`} style={{padding:  windowWidth < 720 ? "0 0 0 1rem" : "0 1rem 0 0rem"}}>
                    <h6 style={{textAlign: windowWidth < 720 ? "left" : "right"}}>Increases Libido & Sex Drive</h6>
                    <p style={{textAlign:  windowWidth < 720 ? "left" :"right"}}>Say goodbye to low libido and hello to a more satisfying sex life, for both you AND your partner(s)</p>
                  </div>
                </div>
              </div>

              <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "100%", justifyContent: "space-between",  borderTop: windowWidth < 720 ? "none" : "1px solid #303d60", borderBottom: windowWidth < 720 ?  "none" : "1px solid #303d60", padding: windowWidth < 720 ? "1rem 0" : "2rem 0"}}>
                <div className={`${styles.row} ${styles.benefitItem}`} >
                  <div>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon3.png" height={500}  width={500} alt=""  style={{width: "100px", height: "auto"}} /> 
                  </div>
                  <div className={`${styles.col}`} style={{padding: "0 0 0 1rem"}}>
                    <h6>Supports Hormonal Balance</h6>
                    <p>Maintaining a natural hormonal balance is key to regulating your bodies natural testosterone levels and improving overall well-being.</p>
                  </div>
                </div>
                <div className={`${styles.row} ${styles.benefitItem}`} style={{flexDirection:  windowWidth < 720 ? "row" : "row-reverse", borderTop: windowWidth > 720 ? "none" : "1px solid #303d60", borderBottom:windowWidth < 720 ? "1px solid #303d60" : "none", padding: windowWidth < 720 ? "1rem 0" : ""}}>
                  <div>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon4.png" height={500}  width={500} alt=""  style={{width: "100px", height: "auto"}} /> 
                  </div>
                  <div className={`${styles.col}`} style={{padding: windowWidth < 720 ? "0 0 0 1rem" : "0 1rem 0 0rem"}}>
                    <h6 style={{textAlign: windowWidth < 720 ? "left" :"right"}}>Supercharges Male Performance</h6>
                    <p style={{textAlign: windowWidth < 720 ? "left" :"right"}}>Achieve peak physical and mental performance at home, at work, while out with friends, or in the gym.</p>
                  </div>
                </div>
              </div>

              <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "100%", justifyContent: "space-between", padding: windowWidth < 720 ? "0rem 0" : "2rem 0"}}>
                <div className={`${styles.row} ${styles.benefitItem}`} >
                  <div>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon5.png" height={500}  width={500} alt=""  style={{width: "100px", height: "auto"}} /> 
                  </div>
                  <div className={`${styles.col}`} style={{padding: "0 0 0 1rem"}}>
                    <h6>Ramps up Stamina & Energy</h6>
                    <p>Our unique blend of ingredients increases energy levels and works to build up your stamina, helping you stay focused and energized throughout the day.</p>
                  </div>
                </div>
                <div className={`${styles.row} ${styles.benefitItem}`} style={{flexDirection: windowWidth < 720 ? "row" : "row-reverse", borderTop: windowWidth > 720 ? "none" : "1px solid #303d60", borderBottom: "none", padding: windowWidth < 720 ? "1rem 0" : ""}}>
                  <div>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon6.png" height={500}  width={500} alt=""  style={{width: "100px", height: "auto"}} /> 
                  </div>
                  <div className={`${styles.col}`} style={{padding: windowWidth < 720 ? "0 0 0 1rem" : "0 1rem 0 0rem"}}>
                    <h6 style={{textAlign: windowWidth < 720 ? "left" :"right"}}>Increases Lean Muscle & Strength Gains</h6>
                    <p style={{textAlign: windowWidth < 720 ? "left" :"right"}}>Reach your fitness goals faster and more efficiently than ever before.</p>
                  </div>
                </div>
              </div>

              {windowWidth > 720 ?  <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s4img.png"} height={5000}  width={5000} alt="" style={{
                  position: "absolute",
                  bottom: 0,
                  top: 0,
                  width: "500px",
                  height: "auto"
                }}  /> : null}
              {windowWidth > 720 ? <>
                <div onClick={() => handleScroll("SELECT_PRODUCT")} className={styles.s3btn} style={{width: windowWidth <720 ? "100%" : "50%"}}>
                Order Now
                </div>
                <div className={`${styles.row} ${styles.btnTxt}`} style={{width:  windowWidth <720 ? "100%" : "50%", color: "white"}}>
                  <p className={styles.btnTxt1} style={{color: "white"}}>Ships: Within 24 Hours</p> 
                  |
                  <p className={styles.btnTxt} style={{color: "white"}}>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/shape.png" height={50}  width={50} alt="" className={styles.hourglass} style={{width: "10px", height: "auto"}} /> 
                    Stock: 58 Bottles Remaining
                  </p>
                </div>
              </> : null}
            </div>
          </div>
        </div>

        {/* INGREDIENTS SECTION */}
        <div id="INGREDIENTS" className={`${styles.col} ${styles.sec3}`} style={{width: "100%", padding: "4rem 0 4rem 0"}}>
          <div className={styles.delcinedTestWrapper} style={{width: windowWidth < 720 ? "90%" :"60%"}}>
            <h1 style={{color: "black", fontWeight: "900", textAlign: "center", fontSize:  windowWidth < 720 ? "30px" : "50px", lineHeight: windowWidth < 720 ? "36px" : "56px"}}>
              The Science behind Peak Male <br />
              <span style={{color: "#17378a"}}>Xtreme Test Booster</span>
            </h1>
            <p style={{color: "black", marginTop: "19px", textAlign: "center", fontSize: "18px", lineHeight: "26px"}}>
              Our unique blend of 6 powerful herbs work together to support healthy testosterone levels, improve muscle mass 
              and athletic performance, and promote overall male health and vitality
            </p>

            <div className={`${styles.col}`}>
              <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: "2rem 0 0 0", alignItems: windowWidth <720 ? "center" : "flex-start", width: "100%"}}>
                  {windowWidth < 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%",
                    paddingBottom: "2rem"
                  }}>Fenugreek</h5> : null}
                <div className={styles.col} style={{width: windowWidth < 720 ? "95%" : "40%", height: windowWidth < 720 ? "200px" : "", margin: "auto"}}>
                  <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img1.png"} height={5000}  width={5000} alt="" style={{
                      position: "relative",
                      bottom: 0,
                      top: 0,
                      width: windowWidth < 720 ? "300px" : "400px",
                      height: "auto"
                    }}  />
                </div>
                <div className={`${styles.col}`} style={{width: windowWidth < 720 ? "95%" :"60%"}}>
                  {windowWidth > 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%"
                  }}>Fenugreek</h5> : null}
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`} style={{padding: "1rem 0 0 0"}}>
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

              <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: windowWidth <720 ? "0" : "2rem 0 0 0", alignItems: windowWidth <720 ? "center" : "flex-start", width: "100%", flexDirection: windowWidth <720 ? "column" : "row-reverse"}}>
                  {windowWidth < 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%",
                    paddingBottom: "2rem"
                  }}>Maca Powder</h5> : null}
                  <div className={styles.col} style={{width: windowWidth < 720 ? "95%" : "40%",height: windowWidth < 720 ? "200px" : "", margin: "auto"}}>
                    <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img2.png"} height={5000}  width={5000} alt="" style={{
                        position: "relative",
                        bottom: 0,
                        top: 0,
                        width: windowWidth < 720 ? "300px" : "400px",
                        height: "auto"
                      }}  />
                  </div>
                <div className={`${styles.col}`} style={{width: windowWidth < 720 ? "95%" : "60%"}}>
                  {windowWidth > 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%"
                  }}>Maca Powder</h5> : null}
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`} style={{padding: "1rem 0 0 0"}}>
                    <li>Maca has been shown to reduce cortisol levels in men who are experiencing chronic stress, resulting in improved testosterone levels and overall well being.</li>
                      
                    <li>Promotes the production of luteinizing hormone (LH), which is responsible for stimulating the testes to produce testosterone in males.</li>
                    
                    <li>Maca powder contains compounds that can help reduce the activity of the enzyme aromatase, which is responsible for converting testosterone into estrogen. One study found that Maca supplementation led to a significant reduction in aromatase activity in men.</li>
                  </ul>
                </div>
              </div>

              <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: "2rem 0 0 0", alignItems: windowWidth <720 ? "center" : "flex-start", width: "100%"}}>
                  {windowWidth < 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%",
                    paddingBottom: "2rem"
                  }}>Tongkat Ali</h5> : null}
                <div className={styles.col} style={{width: windowWidth < 720 ? "95%" : "40%", height: windowWidth < 720 ? "200px" : "", margin: "auto"}}>
                  <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img3.png"} height={5000}  width={5000} alt="" style={{
                      position: "relative",
                      bottom: 0,
                      top: 0,
                      width: windowWidth < 720 ? "300px" : "400px",
                      height: "auto"
                    }}  />
                </div>
                <div className={`${styles.col}`} style={{width: windowWidth < 720 ? "95%" : "60%"}}>
                  {windowWidth > 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%"
                  }}>Tongkat Ali</h5> : null}
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`} style={{padding: "1rem 0 0 0"}}>
                    <li>Tongkat Ali has been shown to reduce the production of cortisol, which is a stress hormone that can negatively impact testosterone production.</li>
                      
                    <li>Contains a compound called eurycomanone, that helps to stimulate the production of luteinizing hormone (LH), which is responsible for signaling the testes to produce testosterone in males.</li>
                    
                    <li>Tongkat Ali has also been shown to reduce levels of sex hormone binding globulin (SHBG), which is a protein that binds to testosterone and prevents it from being used by the body. By reducing SHBG levels, Tongkat Ali can increase the amount of free testosterone in the body, leading to improved muscle mass, athletic performance, and sexual function.</li>
                  </ul>
                </div>
              </div>

              <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: windowWidth <720 ? "0" : "2rem 0 0 0", alignItems: windowWidth <720 ? "center" : "flex-start", width: "100%", flexDirection: windowWidth <720 ? "column" : "row-reverse"}}>
                  {windowWidth < 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%",
                    paddingBottom: "2rem"
                  }}>Panax Ginseng</h5> : null}
                  <div className={styles.col} style={{width: windowWidth < 720 ? "95%" : "40%", height: windowWidth < 720 ? "200px" : "", margin: "auto"}}>
                    <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img4.png"} height={5000}  width={5000} alt="" style={{
                        position: "relative",
                        bottom: 0,
                        top: 0,
                        width: windowWidth < 720 ? "300px" : "400px",
                        height: "auto"
                      }}  />
                  </div>
                <div className={`${styles.col}`} style={{width: windowWidth < 720 ? "95%" : "60%"}}>
                  {windowWidth > 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%"
                  }}>Panax Ginseng</h5> : null}
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`} style={{padding: "1rem 0 0 0"}}>
                    <li>Contains a compound called ginsenoside, which has been found to stimulate the production of luteinizing hormone (LH), which is responsible for signaling the testes to produce testosterone.</li>
                    
                    <li>Panax Ginseng has been shown to have adaptogenic properties, meaning it can help the body adapt to and cope with stress.</li>
                    
                    <li>Has been shown to have anti-inflammatory and antioxidant properties, which can help protect the body against oxidative stress and reduce inflammation throughout the body.</li>
                  </ul>
                </div>
              </div>

              <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: "2rem 0 0 0", alignItems: windowWidth <720 ? "center" : "flex-start", width: "100%"}}>
                  {windowWidth < 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%",
                    paddingBottom: "2rem"
                  }}>Horny Goat Weed</h5> : null}
                <div className={styles.col} style={{width: windowWidth < 720 ? "95%" : "40%", height: windowWidth < 720 ? "200px" : "", margin: "auto"}}>
                  <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img5.png"} height={5000}  width={5000} alt="" style={{
                      position: "relative",
                      bottom: 0,
                      top: 0,
                      width: windowWidth < 720 ? "300px" : "400px",
                      height: "auto"
                    }}  />
                </div>
                <div className={`${styles.col}`} style={{width: windowWidth < 720 ? "95%" :  "60%"}}>
                  {windowWidth > 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%"
                  }}>Horny Goat Weed</h5> : null}
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`} style={{padding: "1rem 0 0 0"}}>
                    <li>Contains a compound called icariin, has been found to inhibit the activity of the enzyme that converts testosterone into estrogen, leading to higher levels of free testosterone in the body.</li>
                    
                    <li>Horny Goat Weed has been shown to have vasodilatory effects, meaning it can help improve blood flow throughout the body. This can have a positive impact on athletic performance and sexual function, as it can increase the amount of oxygen and nutrients that reach the muscles and sexual organs.</li>
                  </ul>
                </div>
              </div>

              <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: windowWidth <720 ? "0" : "2rem 0 0 0", alignItems: windowWidth <720 ? "center" : "flex-start", width: "100%", flexDirection: windowWidth <720 ? "column" : "row-reverse"}}>
                  {windowWidth < 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%",
                    paddingBottom: "2rem"
                  }}>Tribulus Terrestris</h5> : null}
                  <div className={styles.col} style={{width: windowWidth < 720 ? "95%" : "40%", height: windowWidth < 720 ? "200px" : "", margin: "auto"}}>
                    <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img6.png"} height={5000}  width={5000} alt="" style={{
                        position: "relative",
                        bottom: 0,
                        top: 0,
                        width: windowWidth < 720 ? "300px" : "400px",
                        height: "auto"
                      }}  />
                  </div>
                <div className={`${styles.col}`} style={{width: windowWidth < 720 ? "95%" : "60%"}}>
                  {windowWidth > 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%"
                  }}>Tribulus Terrestris</h5> : null}
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`} style={{padding: "1rem 0"}}>
                    <li>Contains a compound called protodioscin, that helps to stimulate the production of luteinizing hormone (LH), which is responsible for signaling the testes to produce testosterone in males.</li>
                      
                    <li>Has been shown to reduce SHBG levels, Tribulus Terrestris can increase the amount of free testosterone in the body, leading to improved muscle mass, athletic performance, and sexual function.</li>
                  </ul>
                </div>
              </div>

              {windowWidth > 720 ? <p className={styles.promise} style={{color: "#002560"}}>Peak Male Promise</p> :
              <p className={`${styles.chooosePackage}`} id="order" style={{color: "#002560"}}>Peak Male Promise</p>}
              
              <ul className={styles.s5list} >
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
          </div>
        </div>

        {/* TESTIMONIAL SECTION */}
        <div id="REVIEWS" className={`${styles.col} ${styles.sec3} ${styles.sec6}`} style={{width: "100%",}}>
          <div className={styles.delcinedTestWrapper}>
            <h1 style={{padding: windowWidth < 720 ? "3rem 0 0 0" : 0, color: "black", fontWeight: "900", textAlign: "center", fontSize: windowWidth < 720 ? "25px" : "50px", lineHeight:windowWidth < 720 ? "28px" :  "56px"}}>
              Customer Testimonials <br />
              <span style={{color: "#17378a"}}>Real People. Real Results.</span>
            </h1>
            <div className={`${styles.row} ${styles.testimonial} ${styles.mobileCol} `} >
              <div className={`${styles.col}`} style={{width: windowWidth < 720 ? "100%" : "30%",}}>
                {testimonial == 1 ? <Image src="https://hitsdesignclients.com/Peak-Male-new/images/t1.png" height={5000}  width={5000} alt="" style={{width: windowWidth > 720 ? "23vw" : "100%", height: "auto"}} /> : testimonial == 2 ?
                  <Image src="https://hitsdesignclients.com/Peak-Male-new/images/t2.png" height={5000}  width={5000} alt="" style={{width: windowWidth > 720 ?"23vw" : "100%", height: "auto"}} />  : testimonial == 3 ? 
                  <Image src="https://hitsdesignclients.com/Peak-Male-new/images/t3.png" height={5000}  width={5000} alt="" style={{width: windowWidth > 720 ? "23vw" : "100%", height: "auto"}} /> : null} 
              </div>
              <div className={`${styles.col}`}  style={{width: windowWidth < 720 ? "100%" : "70%", padding: "1rem", alignItems: "flex-start", minHeight: windowWidth < 720 ? "200px" : ""}}>
                <Image src="https://hitsdesignclients.com/Peak-Male-new/images/sldrstars.png" height={500}  width={500} alt="" style={{width: "150px", height: "auto"}} /> 
               {testimonial == 1 ? <>
                  <h2 className={styles.sldrTxt1}>Confidence Boost</h2>
                  <p className={styles.sldrTxt2}>
                    Before I found Peak Male, I was just an average Joe, struggling with low energy and lackluster workouts. I tried other supplements, but nothing really stuck. That all changed when a buddy recommended Peak Male. Within days, I felt an energy boost, and by the third week, my workouts were next level. But what really surprised me was the boost in confidence. Being physically stronger has made me mentally stronger. Long story short, Peak Male turned my life around. If you're feeling stuck, give it a try - it's a total game-changer.
                  </p>
                </> : testimonial == 2 ?
                <>
                  <h2 className={styles.sldrTxt1}>Game Changer</h2>
                  <p className={styles.sldrTxt2}>
                    Peak Male has been a game-changer for me! As a 43 year old MALE, I was struggling with low energy, decreased muscle mass, and a lack of motivation. However, since incorporating Peak Male into my daily routine, I've experienced a remarkable boost in my overall vitality, stamina, and mental focus. Not only has it enhanced my physical performance, but it has also positively impacted my confidence and overall well-being. I highly recommend Peak Male to any man looking to optimize their health and reclaim their peak performance.
                  </p>
                </> : testimonial == 3 ?
                <>
                  <h2 className={styles.sldrTxt1}>The Kickstart I Needed</h2>
                  <p className={styles.sldrTxt2}>
                    I just turned 33, and I wasn't expecting to feel as drained as I did. I was in a workout slump, and none of the supplements I tried gave me that boost I needed. Then came Peak Male. It kicked in fast, and suddenly, I was breezing through workdays and crushing it at the gym. The big surprise was the mental uplift - I felt unstoppable. If you're feeling stuck, give Peak Male a try - it's been a total game-changer for me.
                  </p>
                </> : null}
                <div className={`${styles.col}`} style={{width: "100%", justifyContent: "flex-start", alignItems: "flex-start"}}>
                  <div className={`${styles.col}`}>
                    <div className={`${styles.row}`} style={{width: "50%", display: windowWidth < 720 ? "none" : "", position: "absolute", bottom: 100, right: "250px",paddingLeft:"2rem"}}>
                      <Image src="https://hitsdesignclients.com/Peak-Male-new/images/sldrqt.png" height={500}  width={500} alt="" style={{width: "70px", height: "auto"}} /> 
                      <Image src="https://hitsdesignclients.com/Peak-Male-new/images/sldrbtl.png" height={500}  width={500} alt="" style={{width: "70px", height: "auto", position: "absolute", right: "40px", bottom: "-30px"}} />
                    </div>
                    <p className={styles.sldrnm}>{testimonial == 1 ? "Jordan L." : testimonial == 2 ? "Martin H." : testimonial == 3 ? "Jimmy B." : ""}</p>
                  </div>
                </div>
              </div>
              <button onClick={() => changeTestimonial(1)} className={styles.slickPrev}></button>
              <button onClick={() => changeTestimonial(-1)}  className={styles.slickNext}></button>
            </div>
          </div>
        </div>

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
  sendPageViewEvent("LANDING");
  return { props: {} };
}
