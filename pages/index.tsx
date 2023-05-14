import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import Footer from "@/components/Footer";
// import Testimonials from "@/components/Testimonials";
import OrderFormContainer, { InitialValuesType }  from "@/components/Form/FormSection";
import { Context } from "../context/context";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Brand from "@/components/Brand";
import CustomImage from "@/components/global/Image";
import Accordion from "@/components/global/Accordian";
import { sendPageViewEvent } from "@/lib/analytics";
import { getSecret } from "@/lib/getSecret";
import { saveItem } from "@/context/storage";
import { imPoweredRequest } from "@/components/lib/request";
import { LineItem } from "@/components/Form/OrderForm";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

export default function Home() {
  const [viewItem, setViewItem] = useState(0);
  // const globalState: any | { clientSecret: string} = useContext(Context);
  // const { clientSecret } = globalState;
  const [clientSecret, setSecret] = useState("");
  // const clientSecret = getSecret();
  // const [clientSecret, setClient] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);

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
      title: "Gold Entries ($150 Value) (BEST DEAL!!)",
      piece: "$5.00 / pc",
      price: 5000,
      options1: "Gold Entries ($150 Value)",
      options2: "M",
      options3: "",
      product_id: "42235974189228",
      high_risk: false,
      sku: "",
      compare_at_price: 0,
      handle: "",
      weight: 0,
      variant_id: 345,
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
      fun_uuid: "",
      high_risk: false,
  } as InitialValuesType;

  const [state, setState] = useState(initialValues);
  // Page Effect
  useEffect(() => {
    if (!window) {};
    setWindowWidth(window.innerWidth);
    fetchData();
    //Send Analytics to imPowered
    sendPageViewEvent("OPT_IN");
    
  }, []);


  console.log(clientSecret);

  return (
    <>
      <main className={styles.main}>
        <Header />
        
        {/* TOP SECTION */}
        <div className={`${styles.row} ${styles.mobileCol}`} style={{paddingTop: "2%", }}>

          <div className={`${styles.col} ${styles.mobileFull}`} style={{
              width: "50%",
              alignItems: "flex-end",
              paddingRight: "3rem"
            }}>
            <div className={`${styles.col}`}>
              <div className={`${styles.col}`}>
                <Brand text={"OUR MISSION: INSPIRE & UNITE AN ENTIRE GENERATION OF PATRIOTIC AMERICANS THROUGH COMMEMORATIVE SYMBOLS OF FREEDOM."} src={"/images/htl-logo-3-crop.png"} />
              </div>
              <div className={`${styles.row}`} style={{width: "100%", padding: "1rem", justifyContent: "center"}} ><hr style={{width: "80%"}} /></div>
              <div className={`${styles.col}`} style={{padding: "1rem 0", maxWidth: "500px", textAlign: "center"}}>
               <h2>INTRODUCING THE "HOLD THE LINE" FREEDOM COIN</h2>
              </div>
              <div className={`${styles.col}`} style={{padding: "1rem 0"}}>
                <p>FRONT OF COIN</p>
                <CustomImage w={500} h={500} src={"/images/coin_front.png"} />
              </div>
              <div className={`${styles.col}`} style={{padding: "1rem 0"}}>
                <p>BACK OF COIN</p>
                <CustomImage w={500} h={500} src={"/images/coin_back.png"} />
              </div>
              <div className={`${styles.col}`}  style={{maxWidth: "500px", textAlign: "center"}}>
                <h2 style={{padding: "1rem 0"}}>WHAT DO I DO WITH THESE COINS?</h2>
                <h5 style={{padding: "0.5rem 0"}}>THESE COINS WERE SPECIFICALLY MADE FOR PATRIOTIC AMERICANS TO GIFT TO OTHER FREEDOM LOVING PATRIOTS.</h5>
                <h5 style={{padding: "0.5rem 0"}}>TWHEN YOU BUY COINS FROM US AND GIFT THEM TO FELLOW PATRIOTS, YOU'RE NOT ONLY SUPPORTING A HOMEGROWN AMERICAN BUSINESS, BUT YOU'RE ALSO PASSING ON A LEGACY OF HONOR AND APPRECIATION FOR THE LAND OF THE FREE AND THE HOME OF THE BRAVE.</h5>
                <h5 style={{padding: "0.5rem 0"}}>TBORN FROM A DEEP-ROOTED RESPECT FOR OUR COUNTRY'S HISTORY AND THE HEROES WHO'VE FOUGHT FOR OUR FREEDOM, OUR COINS ARE MORE THAN JUST KEEPSAKES - THEY'RE SYMBOLS OF FREEDOM, PRIDE, UNITY, AND THE AMERICAN SPIRIT.</h5>
                <h2 style={{padding: "1rem 0"}}>WHO IS THIS COIN FOR?</h2>
                <h5 style={{padding: "0.5rem 0"}}>TWHETHER IT'S A GIFT FOR A VETERAN, FIRST RESPONDER, TEACHER, BLUE COLLAR WORKER, NURSE, OR JUST A PROUD PATRIOTIC AMERICAN, OUR COINS ARE DESIGNED TO BE A DISTINCTIVE AND HEARTFELT TOKEN OF APPRECIATION, PERFECT FOR EVERY PATRIOT THAT HOLDS THE LINE FOR FREEDOM DAY IN, AND DAY OUT.</h5>
              </div>
            </div>
          </div>

          <div className={`${styles.col} ${styles.mobileFull}`} style={{width: "50%", alignItems: "flex-start"}}>
            {clientSecret !== "" ? (
              <Elements stripe={stripePromise} options={options as any}>
                <OrderFormContainer state={state} setState={setState} />
              </Elements>
            ) : (
              null
            )}
          </div>

        </div>

        {/* FIRST TEXT SECTION */}
        <div className={`${styles.col}`} style={{paddingTop: "2%"}}>
          <div className={`${styles.col}`} style={{justifyContent: "center"}}>
              <h1>JOIN THE MOVEMENT</h1>
              <div className={`${styles.row}`} style={{width: "100%", padding: "1rem", justifyContent: "center"}} ><hr style={{width: "80%"}} /></div>
          </div>
          <div className={`${styles.row} ${styles.mobileCol}  ${styles.textContainer}`} style={{paddingTop: "2%"}}>
            <div className={`${styles.col} ${styles.mobileFull}`} style={{width: "50%"}}>
              <Image src={"/images/firstTextSection.jpg"} alt={""} height={750} width={500} style={{height: "auto", borderRadius: "6px"}} />
            </div>
            <div className={`${styles.col} ${styles.mobileFull}`} style={{width: "50%"}}>
              <div className={`${styles.col} ${styles.textSection}`}>
                <p style={{paddingBottom: "3%"}}>WE ARE THE BLUE COLLAR WORKERS WORKING THROUGH THE NIGHT TO GET THE POWER BACK ON AFTER A STORM.</p>
                <p style={{paddingBottom: "3%"}}>WE ARE THE STAY AT HOME MOMS THAT STAND UP FOR THEIR KIDS AT LOCAL SCHOOL BOARD MEETINGS AGAINST THE WOKE AGENDA.</p>
                <p style={{paddingBottom: "3%"}}>WE ARE THE POLICE OFFICERS THAT REFUSED A MEDICAL PROCEDURE AND WERE FIRED AFTER YEARS OF PROTECTING THEIR LOCAL COMMUNITIES.</p>
                <p style={{paddingBottom: "3%"}}>WE ARE THE TEACHERS THAT WERE FORCED TO RESIGN FOR REFUSING TO TEACH STUDENTS AN ANTI-AMERICAN CURRICULUM.</p>
                <p style={{paddingBottom: "3%"}}>WE ARE THE VETERANS THAT LEFT THEIR FAMILIES TO FIGHT WARS OVERSEAS ONLY TO COME BACK HOME AND BE FORCED OUT INTO EARLY RETIREMENT BY WOKE BUREAUCRATS.</p>
                <p style={{paddingBottom: "3%"}}>WE ARE THE SILENT MAJORITY THAT FIGHTS FOR FREEDOM DAY IN, AND DAY OUT.</p>
                <p style={{paddingBottom: "3%"}}>TOGETHER AS ONE, WE HOLD THE LINE. <strong>JOIN US.</strong></p>
              </div>

              {/* Payment Button */}
              <button
                className={`${styles.payBtn} ${styles.wobbleButton}`}
                id="submit"
                // disabled={isLoading || !stripe || !elements || isSubmitting}
                type="submit"
                style={{
                  fontFamily: "Fjalla"
                }}
              >
                {false ? "Loading . . ." : "GET YOUR COINS & SAVE 30"}
              </button>
            </div>
          </div>
        </div>

        {/* INFLUENCERS SECTION */}
        <div className={`${styles.row} ${styles.mobileCol} ${styles.influencers}`} style={{}}>
          <div className={`${styles.col} ${styles.mobileFull} ${styles.influencerItem}`} style={{width: "30%"}}>
              <Image src={"/images/ht.jpg"} alt={""} width={300} height={300} style={{width: "100%", borderRadius: "3px", height: "auto", paddingBottom: "1rem"}}  />
              <p style={{paddingBottom: "1rem"}}>“If you have somebody in mind that believes in freedom, believes in the constitution, this coin is for them. HOLD THE LINE!”</p>
              <h3>-The Hodgetwins <br />Conservative Comedians</h3>
          </div>
          <div className={`${styles.col} ${styles.mobileFull} ${styles.influencerItem}`} style={{width: "30%"}}>
              <Image src={"/images/chad.jpg"} alt={""} width={300} height={300} style={{width: "100%", borderRadius: "3px", height: "auto", paddingBottom: "1rem"}}  />
              <p style={{paddingBottom: "1rem"}}>“How many Patriots do you know? Every one of them needs a coin. Help us grow this family as together, we Hold The Line.”</p>
              <h3>-Chad Prather <br />Blaze TV Host</h3>
          </div>
          <div className={`${styles.col} ${styles.mobileFull} ${styles.influencerItem}`} style={{width: "30%"}}>
              <Image src={"/images/bryce.jpg"} alt={""} width={300} height={300} style={{width: "100%", borderRadius: "3px", height: "auto", paddingBottom: "1rem"}}  />
              <p style={{paddingBottom: "1rem"}}>“This coin represents freedom and is for people that refuse to give into tyranny. We the People MUST Hold the Line for Freedom.” </p>
              <h3>-Bryce "Thug Nasty" Mitchell<br />UFC Fighter</h3>
          </div>
        </div>

        {/* SECOND TEXT SECTION */}
        <div className={`${styles.col}`} style={{paddingTop: "2%"}}>
          <div className={`${styles.col}`} style={{justifyContent: "center"}}>
              <h1>JOIN THE MOVEMENT</h1>
              <div className={`${styles.row}`} style={{width: "100%", padding: "1rem", justifyContent: "center"}} ><hr style={{width: "80%"}} /></div>
          </div>
          <div className={`${styles.row} ${styles.textContainer} ${styles.mobileCol}`} style={{paddingTop: "2%"}}>
            <div className={`${styles.col}  ${styles.mobileFull} `} style={{width: "50%"}}>
              <Image src={"/images/coinandbag.jpg"} alt={""} height={750} width={500} style={{height: "auto", borderRadius: "6px"}} />
            </div>
            <div className={`${styles.col}  ${styles.mobileFull} `} style={{width: "50%"}}>
              <div className={`${styles.col} ${styles.textSectionTwo}`}>
                <div className={`${styles.col} ${styles.textContainerTwo}`}>
                  <h5>GIFT FOR PROUD AMERICANS</h5>
                  <p>Perfect for Veterans, First Responders, Nurses, Blue Collar Workers, Teachers, Small Business Owners, and anyone else that holds the line for freedom!</p>
                </div>
                <div className={`${styles.col} ${styles.textContainerTwo}`}>
                  <h5>HAND CRAFTED WITH PRIDE</h5>
                  <p>Made from 1 oz. of steel and measuring 2" in diameter, our coins are crafted with meticulous care and attention to detail. Each coin is a testament to the skilled labor of dedicated artisans.</p>
                </div>
                <div className={`${styles.col} ${styles.textContainerTwo}`}>
                  <h5>SAFE & SECURE</h5>
                  <p>Our Hold The Line coins are packaged in a protective case and come in a custom Hold The Line velvet carrying bag, allowing you to take your coins with you wherever you go or present them as meaningful gifts.</p>
                </div>
                <div className={`${styles.col} ${styles.textContainerTwo}`}>
                  <h5>LIFETIME WARRANTY INCLUDED</h5>
                  <p>We're confident in the quality of our coins, which is why we offer a lifetime warranty for every coin we sell. You can rest assured that you're buying a piece of American pride that will last for generations to come.</p>
                </div>
                <div className={`${styles.col} ${styles.textContainerTwo}`}>
                  <h5>FAST USPS SHIPPING</h5>
                  <p>We're confident in the quality of our coins, which is why we offer a lifetime warranty for every coin we sell. You can rest assured that you're buying a piece of American pride that will last for generations to come.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VETERAN SECTION */}
        <div className={`${styles.col}`} style={{paddingTop: "2%", }}>
          <div className={`${styles.col}  ${styles.mobileFull} `} style={{width: "50%", alignItems: "center"}}>
            {/* Payment Button */}
            <button
              className={`${styles.payBtn} ${styles.wobbleButton}`}
              id="submit"
              // disabled={isLoading || !stripe || !elements || isSubmitting}
              type="submit"
              style={{
                fontFamily: "Fjalla",
                width: "50%"
              }}
            >
              {false ? "Loading . . ." : "ORDER NOW & SAVE 30"}
            </button>
          </div>
          <div className={`${styles.col}`} style={{width: "50%", alignItems: "center", padding: "3rem 0"}}>
            <Image src={"/images/flag.jpg"} alt={""} width={350} height={500}  style={{width: "50%", height: "auto"}}/>
          </div>
          <div className={`${styles.col}`} style={{width: "50%", alignItems: "center", textAlign: "center"}}>
            <h2>At Hold The Line, we are proud to make a difference by donating a portion of every sale to support our American heroes—Veterans and First Responders—providing them with the assistance they deserve.</h2>
          </div>
          <div className={`${styles.row}`} style={{width: "100%", padding: "1rem", justifyContent: "center"}} ><hr style={{width: "50%"}} /></div>
        </div>

        {/* FAQ SECTION */}
        <div className={`${styles.col}`}>
          <div className={`${styles.col}`} style={{justifyContent: "center", padding: "2rem 0rem 2rem 0"}}>
              <h1>HAVE ANY QUESTIONS?</h1>
          </div>
          <Accordion title={"How long will it take to receive my order?"} detail={"Our shipping typically takes between 4 to 9 days depending on your location. We ship our coins from Fayetteville, AR via USPS Shipping with Tracking. Rest assured that we strive to deliver your order promptly and securely."} />
          <Accordion title={"Is there a warranty for these coins?"} detail={"Yes, all coins come with a lifetime warranty with 100% money back guarantee. We stand behind the quality and craftsmanship of our products."} />
          <Accordion title={"Do you offer bulk discounts for large orders?"} detail={"Our coins come in 5, 10, and 20 packs. We are able to offer 30% Off on our 20-pack coins. If you're interested in larger quantities, please reach out to our sales team directly for inquiries regarding bulk orders and potential discounts. We will be more than happy to assist you with your request."} />
          <Accordion title={"What is your return and refund policy?"} detail={"We want you to be completely satisfied with your purchase. If, for any reason, you are not happy with your order, please contact our customer service team at info@holdtheline.com. We aim to provide a hassle-free return process and resolve any issues promptly."} />
          <Accordion title={"How can I contact customer support?"} detail={"Our dedicated customer support team is here to assist you. You can reach us by email at info@holdtheline.com or by phone at 877-462-4459 during our business hours, which are Monday-Friday from 9am-4pm CST. We value your feedback and strive to provide excellent customer service."} />
        </div>

        {/* CLUB DETAIL SECTION */}
        <div className={`${styles.col}`}  style={{ padding: "2rem 0rem 2rem 0"}}>
          <div className={`${styles.row}`} style={{width: "100%", padding: "1rem", justifyContent: "center"}} ><hr style={{width: "50%"}} /></div>
          <div className={`${styles.col}`} style={{width: "50%", alignItems: "center", textAlign: "center", padding: "2rem 0rem 2rem 0"}}>
            <h1>HOLD THE LINE CLUB</h1>
            <h4>VIP Club Members receive...</h4>
          </div>
          <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: "2rem 0rem 4rem 0"}}>
            <div className={`${styles.col} ${styles.mobileFull} ${styles.mobileIcon}`} style={{padding: "0 3rem"}}>
              <Image src={"/images/gift-box-icon.png"} alt={""} width={150} height={150}/>
              <p style={{maxWidth: "200px", textAlign: "center", fontSize: "20px"}}>Automatic entries into all giveaways, including exclusive member's only monthly giveaways!</p>
            </div>
            <div className={`${styles.col} ${styles.mobileFull} ${styles.mobileIcon}`} style={{padding: "0 3rem"}}>
              <Image src={"/images/money-icon.png"} alt={""} width={150} height={150}/>
              <p style={{maxWidth: "200px", textAlign: "center", fontSize: "20px"}}>Automatic entries into all giveaways, including exclusive member's only monthly giveaways!</p>
            </div>
            <div className={`${styles.col} ${styles.mobileFull} ${styles.mobileIcon}`} style={{padding: "0 3rem"}}>
              <Image src={"/images/phone-icon.png"} alt={""} width={150} height={150}/>
              <p style={{maxWidth: "200px", textAlign: "center", fontSize: "20px"}}>Automatic entries into all giveaways, including exclusive member's only monthly giveaways!</p>
            </div>
            <div className={`${styles.col} ${styles.mobileFull} ${styles.mobileIcon}`} style={{padding: "0 3rem"}}>
              <Image src={"/images/computer-icon.png"} alt={""} width={150} height={150}/>
              <p style={{maxWidth: "200px", textAlign: "center", fontSize: "20px"}}>Automatic entries into all giveaways, including exclusive member's only monthly giveaways!</p>
            </div>
          </div>

            {/* Payment Button */}
            <button
              className={`${styles.payBtn} ${styles.wobbleButton}`}
              id="submit"
              // disabled={isLoading || !stripe || !elements || isSubmitting}
              type="submit"
              style={{
                fontFamily: "Fjalla",
                width: "30%"
              }}
            >
              {false ? "Loading . . ." : "ORDER NOW & SAVE 30"}
            </button>
        </div>

      </main>
      <Footer />
    </>
  );
}
