import { useState, useEffect, useContext } from "react";
import Footer from "../components/Footer";
import { sendPageViewEvent } from "../components/lib/analytics"; 
import Router from "next/router";
import Head from "next/head";
import { Context } from "@/context/context";
import styles from "../styles/Home.module.css";
import checkout_styles from "../styles/Checkout.module.css";
import { imPoweredRequest } from "@/components/lib/request";
import { LineItem } from "@stripe/stripe-js";
// import * as gtag from "../components/lib/analytics"
import Image from "next/image";

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

  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const renderCountdown = () => {

    for (let i = countdown; i > 0; i--) {
        return (<span key={i} style={{color: "red"}} id={`second-${i}`}>
          {formatTime(i)}
        </span>)
    }
  };

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
    // gtag.twitterEvent(email, price);
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
      <main className={`${styles.row}  ${styles.mobileCol} ${checkout_styles.container}`}>
        <div className={`${styles.col} ${checkout_styles.left}`}>
          <header className={`${checkout_styles.header} ${styles.row}`} >
            <div>
              <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/logo.png"} alt={""} width={500} height={500} style={{height: "auto", width: "100px"}} />
            </div>
            <p className={`${checkout_styles.secureLock} ${styles.row}`}>
              <Image src="https://hitsdesignclients.com/Peak-Male-new/images/secure-lock.png" alt="" width={500} height={500} style={{height: "auto", width: "50px"}}/>
              <span>SECURE<br />CHECKOUT</span>
            </p>
          </header>

          {windowWidth < 720 ? 
          <>
            <h2 className={checkout_styles.sumryHdng}>Order Summary</h2>
            <div style={{width: "100%", padding: "0 0 15px"}} >
              <div style={{width: "100%", padding: "0 0 15px"}}> 
                <div className={checkout_styles.deviderCp}></div>

                <div className={checkout_styles.prodBox}>
                  <div className={checkout_styles.ordLft}>
                    <div className={checkout_styles.prodImg}>
                      <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/chk-prod.png"} alt={""} width={500} height={500} style={{height: "auto", width: "55px"}} />
                      <p className={checkout_styles.prodCount}>6</p>
                    </div>
                    <div className={checkout_styles.odrRgt}>
                        <p className={checkout_styles.ordTitle}><strong>Peak Male</strong><br />Xtreme Test Booster</p>
                    </div>
                  </div>
                  <div className={checkout_styles.ordRight}>
                      <p><span>$249.00</span><br />$179.99</p>
                  </div>
                </div>

                <div className={checkout_styles.deviderCp}></div>
                  
                <table className={checkout_styles.cartTable}>
                  <tbody>
                    <tr>
                      <td align="left">Subtotal</td>
                      <td align="right"><span>$199.98</span></td>
                    </tr>
                  </tbody>
                </table>

                <div className={checkout_styles.deviderCp}></div>
                  
                <table className={checkout_styles.cartTable}>
                  <tbody>
                    <tr>
                      <td align="left">Shipping</td>
                      <td align="right"><span>$0.00</span></td>
                    </tr>
                  </tbody>
                </table>

                <div className={checkout_styles.deviderCp}></div>
                  
                <table className={checkout_styles.cartTable}>
                  <tbody>
                    <tr>
                      <td align="left" className={checkout_styles.totTxtL}>Total</td>
                      <td align="right" className={checkout_styles.totTxtL}><span>$212.93</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>: null}

          <div className={`${checkout_styles.checkoutForm} ${styles.col}`}>
            <div className={`${checkout_styles.sale} ${styles.row}`}>
              <div className={`${checkout_styles.viewBoxImg}`}>
                <Image src="https://hitsdesignclients.com/Peak-Male-new/images/per-path.png" alt="" width={500} height={500} style={{height: "auto", width: "100%"}}/>
                <span>%</span>
              </div>
              <div className={`${checkout_styles.viewBoxTxt}`}>
                <strong>Sale ends soon!</strong> Your cart is reserved for: &nbsp;  
                {/* <span id="stopwatch2">00:00</span> */}
                {renderCountdown()}
              </div>
            </div>

            <ul className={checkout_styles.brdcrm}>
              <li><span>Checkout</span></li>
              <li><svg width="10" focusable="false" aria-hidden="true" className="icon-svg icon-svg--color-accent icon-svg--size-10 previous-link__icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M2 1l1-1 4 4 1 1-1 1-4 4-1-1 4-4"></path></svg></li>
              <li>Special Offers</li>
              <li><svg width="10" focusable="false" aria-hidden="true" className="icon-svg icon-svg--color-accent icon-svg--size-10 previous-link__icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M2 1l1-1 4 4 1 1-1 1-4 4-1-1 4-4"></path></svg></li>
              <li>Order Receipt</li>
            </ul>

            <div className={checkout_styles.cpContact}>
                <div className={checkout_styles.headingBox}>
                    <p className={checkout_styles.chkHead}>Contact information</p>
                </div>
                <div className={`${checkout_styles.frmFlds}`}>
                  <div className={``}>
                    <label htmlFor="email" className="fl-label">Email</label>
                    <input type="email" className={`${checkout_styles.inputFlds}`} placeholder="Email" id="email" data-placeholder="Email" />
                  </div>
                </div>
            </div>

            <div className={checkout_styles.cpContact}>
                <div className={checkout_styles.headingBox}>
                    <p className={checkout_styles.chkHead}>Shipping Address</p>
                </div>

                <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between"}}>
                  <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                    <div className={``}>
                      <label htmlFor="first_name" className="fl-label">First Name</label>
                      <input type="first_name" className={`${checkout_styles.inputFlds}`} placeholder="First Name" id="first_name" data-placeholder="First Name" />
                    </div>
                  </div>
                  <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                    <div className={``}>
                      <label htmlFor="last_name" className="fl-label">Last Name</label>
                      <input type="last_name" className={`${checkout_styles.inputFlds}`} placeholder="Last Name" id="last_name" data-placeholder="Last Name" />
                    </div>
                  </div>
                </div>

                <div className={`${checkout_styles.frmFlds}`}>
                  <div className={``}>
                    <label htmlFor="line1" className="fl-label">Street Address</label>
                    <input type="line1" className={`${checkout_styles.inputFlds}`} placeholder="Street Address" id="line1" data-placeholder="Street Address" />
                  </div>
                </div>

                <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between"}}>
                  <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                    <div className={``}>
                      <label htmlFor="city" className="fl-label">City</label>
                      <input type="city" className={`${checkout_styles.inputFlds}`} placeholder="City" id="city" data-placeholder="City" />
                    </div>
                  </div>
                  <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                    <div className={``}>
                      <select name="state" className={checkout_styles.selcetFld} id="state">
                        <option value="1" selected>- Select State -</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                    </div>
                  </div>
                </div>


                <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between"}}>
                  <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                    <div className={``}>
                      <label htmlFor="zip" className="fl-label">Zip Code</label>
                      <input type="zip" className={`${checkout_styles.inputFlds}`} placeholder="Zip Code" id="zip" data-placeholder="Zip Code" />
                    </div>
                  </div>
                  <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                    <div className={``}>
                      <label htmlFor="country" className="fl-label">Country</label>
                      <input type="country" className={`${checkout_styles.inputFlds}`} placeholder="US" id="country" data-placeholder="US" disabled />
                    </div>
                  </div>
                </div>

            </div>

            <div className={checkout_styles.cpContact}>
                <div className={checkout_styles.headingBox}>
                    <p className={checkout_styles.chkHead}>Billing Address</p>
                    <p className={checkout_styles.chkSubheading}>Select the address that matches your card or payment method.</p>
                </div>
            </div>

            <div className={checkout_styles.payoptbox}>
              <div className={checkout_styles.paymentCardsBox}>
                <label className={checkout_styles.billingtogglbtn}>
                  <input type="radio" name="address" checked/>Same as shipping address
                </label>
              </div>
              <div className={checkout_styles.paymentCardsBox}>
                <label className={checkout_styles.billingtogglbtn}>
                  <input type="radio" name="address" />Use a different billing address
                </label>
              </div>
              <div className={checkout_styles.paymentFldsBox}>
                <div className={checkout_styles.cpContact} style={{marginTop: "0"}}>

                    <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between"}}>
                      <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                        <div className={``}>
                          <label htmlFor="first_name" className="fl-label">First Name</label>
                          <input type="first_name" className={`${checkout_styles.inputFlds}`} placeholder="First Name" id="first_name" data-placeholder="First Name" />
                        </div>
                      </div>
                      <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                        <div className={``}>
                          <label htmlFor="last_name" className="fl-label">Last Name</label>
                          <input type="last_name" className={`${checkout_styles.inputFlds}`} placeholder="Last Name" id="last_name" data-placeholder="Last Name" />
                        </div>
                      </div>
                    </div>

                    <div className={`${checkout_styles.frmFlds}`}>
                      <div className={``}>
                        <label htmlFor="line1" className="fl-label">Street Address</label>
                        <input type="line1" className={`${checkout_styles.inputFlds}`} placeholder="Street Address" id="line1" data-placeholder="Street Address" />
                      </div>
                    </div>

                    <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between"}}>
                      <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                        <div className={``}>
                          <label htmlFor="city" className="fl-label">City</label>
                          <input type="city" className={`${checkout_styles.inputFlds}`} placeholder="City" id="city" data-placeholder="City" />
                        </div>
                      </div>
                      <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                        <div className={``}>
                          <select name="state" className={checkout_styles.selcetFld} id="state">
                            <option value="1" selected>- Select State -</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                          </select>
                        </div>
                      </div>
                    </div>


                    <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between"}}>
                      <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                        <div className={``}>
                          <label htmlFor="zip" className="fl-label">Zip Code</label>
                          <input type="zip" className={`${checkout_styles.inputFlds}`} placeholder="Zip Code" id="zip" data-placeholder="Zip Code" />
                        </div>
                      </div>
                      <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                        <div className={``}>
                          <label htmlFor="country" className="fl-label">Country</label>
                          <input type="country" className={`${checkout_styles.inputFlds}`} placeholder="US" id="country" data-placeholder="US" disabled />
                        </div>
                      </div>
                    </div>

                </div>
              </div>
            </div>
          </div>

          <div className={checkout_styles.cpContact}>
            <div className={checkout_styles.headingBox}>
                <p className={checkout_styles.chkHead}>Payment Method</p>
                <p className={checkout_styles.chkSubheading}>
                  <Image src="https://hitsdesignclients.com/Peak-Male-new/images/lock-icn.png" alt="" width={500} height={500} style={{height: "auto", width: "10px"}}/>
                  All transactions are secure and encrypted..
                </p>
            </div>
            <div className={checkout_styles.payoptbox}>

            </div>
          </div>

          <div className={checkout_styles.allSubmit}>
            <button type="submit" className={checkout_styles.frmSubmit}>
              <span>
                <Image src="https://hitsdesignclients.com/Peak-Male-new/images/lock2.png" alt="" width={500} height={500} style={{height: "auto", width: "18px"}}/>complete purchase
              </span>
              <p>Try it risk free! - 30-day money back Guarantee</p>
            </button>
          </div>

          <div className={checkout_styles.guarantyRow}>
            <Image src="https://hitsdesignclients.com/Peak-Male-new/images/30mbg.png" alt="" width={500} height={500} style={{height: "auto", width: "50px"}}/>
            <p><strong>30-Day Guarantee:</strong> Peak Male offers a 30-Day Money Back Guarantee in case you don't fall completely in love with our product.</p>
          </div>

          {windowWidth > 720 ? <div className={checkout_styles.footer}>
            <p>
              <a href="#">Terms &amp; Conditions</a>
              <a href="#">Privacy Policy</a> 
              <a href="#">Contact Us</a>
            </p>
            <p>Copyright © <script type="text/javascript">var year = new Date();document.write(year.getFullYear());</script>2023  Optimal Human. All Rights Reserved.</p>
          </div> : null}
        </div>

        <div className={`${styles.col} ${checkout_styles.right}`}>
          {windowWidth > 720 ? 
          <>
            <h2 className={checkout_styles.sumryHdng}>Order Summary</h2>
            <div style={{width: "100%", padding: "0 0 15px"}} >
              <div style={{width: "100%", padding: "0 0 15px"}}> 
                <div className={checkout_styles.deviderCp}></div>

                <div className={checkout_styles.prodBox}>
                  <div className={checkout_styles.ordLft}>
                    <div className={checkout_styles.prodImg}>
                      <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/chk-prod.png"} alt={""} width={500} height={500} style={{height: "auto", width: "55px"}} />
                      <p className={checkout_styles.prodCount}>6</p>
                    </div>
                    <div className={checkout_styles.odrRgt}>
                        <p className={checkout_styles.ordTitle}><strong>Peak Male</strong><br />Xtreme Test Booster</p>
                    </div>
                  </div>
                  <div className={checkout_styles.ordRight}>
                      <p><span>$249.00</span><br />$179.99</p>
                  </div>
                </div>

                <div className={checkout_styles.deviderCp}></div>
                  
                <table className={checkout_styles.cartTable}>
                  <tbody>
                    <tr>
                      <td align="left">Subtotal</td>
                      <td align="right"><span>$199.98</span></td>
                    </tr>
                  </tbody>
                </table>

                <div className={checkout_styles.deviderCp}></div>
                  
                <table className={checkout_styles.cartTable}>
                  <tbody>
                    <tr>
                      <td align="left">Shipping</td>
                      <td align="right"><span>$0.00</span></td>
                    </tr>
                  </tbody>
                </table>

                <div className={checkout_styles.deviderCp}></div>
                  
                <table className={checkout_styles.cartTable}>
                  <tbody>
                    <tr>
                      <td align="left" className={checkout_styles.totTxtL}>Total</td>
                      <td align="right" className={checkout_styles.totTxtL}><span>$212.93</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>: null}

          <div className={`${checkout_styles.reviewBox}`}>
            <div className={checkout_styles.rgtLabel}>
              <span>trusted customer reviews</span>
            </div>
          </div>
          
          <div className={`${checkout_styles.chooseBox} ${styles.col}`} style={{width: "100%", marginTop: "10px"}}>
            <div className={styles.col} style={{width: "100%"}}>
              <div className={checkout_styles.s6MidCol}>
                <p className={checkout_styles.s6TestiHead}>The Kickstart I Needed</p>
                <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s6-testi-star.png" alt="" width={500} height={500} style={{height: "auto", width: "100px"}} className={checkout_styles.s6TestiStar}/>
                <p className={checkout_styles.s6Para}>
                  I just turned 33, and I wasn't expecting to feel as drained as I did. I was in a workout slump, and none of the supplements I tried gave me that boost I needed. Then came Peak Male. It kicked in fast, and suddenly, I was breezing through workdays and crushing it at the gym. The big surprise was the mental uplift - I felt unstoppable. If you're feeling stuck, give Peak Male a try - it's been a total game-changer for me.
                </p>
                <p className={checkout_styles.s6TestiNm}>
                  Jimmy B.
                  <span>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/t-tk.png" alt="" width={500} height={500} style={{height: "auto", width: "15px"}} className={checkout_styles.s6TestiStar}/>
                    Verified Customer
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className={`${checkout_styles.chooseBox} ${styles.col}`} style={{width: "100%", marginTop: "10px"}}>
            <div className={styles.col} style={{width: "100%"}}>
              <div className={checkout_styles.s6MidCol}>
                <p className={checkout_styles.s6TestiHead}>The Kickstart I Needed</p>
                <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s6-testi-star.png" alt="" width={500} height={500} style={{height: "auto", width: "100px"}} className={checkout_styles.s6TestiStar}/>
                <p className={checkout_styles.s6Para}>
                  I just turned 33, and I wasn't expecting to feel as drained as I did. I was in a workout slump, and none of the supplements I tried gave me that boost I needed. Then came Peak Male. It kicked in fast, and suddenly, I was breezing through workdays and crushing it at the gym. The big surprise was the mental uplift - I felt unstoppable. If you're feeling stuck, give Peak Male a try - it's been a total game-changer for me.
                </p>
                <p className={checkout_styles.s6TestiNm}>
                  Jimmy B.
                  <span>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/t-tk.png" alt="" width={500} height={500} style={{height: "auto", width: "15px"}} className={checkout_styles.s6TestiStar}/>
                    Verified Customer
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          <div className={`${checkout_styles.chooseBox} ${styles.col}`} style={{width: "100%", marginTop: "50px"}}>
            <div className={checkout_styles.rgtLabel}>
              <span>Why Choose Us</span>
            </div>
            <div className={checkout_styles.chooseCol}>
              <Image src="https://hitsdesignclients.com/Peak-Male-new/images/choose-ic1.png" alt="" width={500} height={500} style={{height: "auto", width: "50px"}} className={checkout_styles.s6TestiStar}/>
              <span>30-Day Satisfaction Guarantee</span>
              <p>If you're not satisfied with your product(s), we'll make it right! We promise.</p>
            </div>
            <div className={checkout_styles.chooseCol}>
              <Image src="https://hitsdesignclients.com/Peak-Male-new/images/choose-ic2.png" alt="" width={500} height={500} style={{height: "auto", width: "50px"}} className={checkout_styles.s6TestiStar}/>
              <span>Over 7582+ successfully shipped orders</span>
              <p>Happy customers, end to end tracking and reliable customer service.</p>
            </div>
          </div>


          {windowWidth < 720 ? <div className={checkout_styles.footer}>
            <p>
              <a href="#">Terms &amp; Conditions</a>
              <a href="#">Privacy Policy</a> 
              <a href="#">Contact Us</a>
            </p>
            <p>Copyright © <script type="text/javascript">var year = new Date();document.write(year.getFullYear());</script>2023  Optimal Human. All Rights Reserved.</p>
          </div> : null}
        </div>

      </main>
    </div>
  );
};

export default CheckOut;

export async function getServerSideProps({  }) {
  sendPageViewEvent("CHECKOUT");
  return { props: {} };
}
