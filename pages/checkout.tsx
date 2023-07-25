import checkout_styles from "../styles/Checkout.module.css";
import { useState, useEffect, useCallback} from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { imPoweredRequest } from "@/components/lib/request";
import Image from "next/image";
import { formatTime } from "@/components/lib/formatter";
import CollectJSSection from "@/components/Payments/COollectionJSSection";

// Checkout Form Type
interface FormData {
  product: string,
  isSubbed: boolean,
  customer: {
    email: string,
    first_name: string,
    last_name: string,
    cus_uuid: string
  },
  shipping: {
    line1: string,
    line2: string,
    city: string,
    state: string,
    zip: string,
    country: string | "US"
  },
  billing: {
    line1: string,
    line2: string,
    city: string,
    state: string,
    zip: string,
    country: string | "US"
  },
  external_type: "SHOPIFY",
  amount: string;
  isSubmitting: boolean;
  alertMessage: string;
  token: string;
}

// Form Data
const formDataInitialState: FormData = {
  product: "",
  isSubbed: false,
  customer: {
    email: "",
    first_name: "",
    last_name: "",
    cus_uuid: ""
  },
  shipping: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "US"
  },
  billing: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "US"
  },
  external_type: "SHOPIFY",
  amount: "",
  isSubmitting: true,
  alertMessage: "",
  token: "",
};

const description = `Rivigerate your manhood with Peak Male`;
const ogImgUrl =  "";
const canonicalUrl = "https://hitsdesignclients.com/Peak-Male-new/images/logo.png";
const title = "Peak Male | Optimal Human" 

const CheckOut = () => { const [countdown, setCountdown] = useState(300);
  const [isLoading, setIsLoading] = useState(true);
  const [differentBilling, setBilling] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const [formData, setFormData] = useState<FormData>(formDataInitialState);

  // Render Timer JSX
  const renderCountdown = () => {
    return (
      <span style={{ color: "red" }} id={`second-${countdown}`}>
        {formatTime(countdown)}
      </span>
    );
  };

  // Handle POST -> imPowered API
  const handlePurchase = async (token: string) => {
    try {
      setIsLoading(true);
      console.log("[formData]");
      console.log(formData);
      console.log("[token]");
      console.log(token);
      console.log("[payload]");
      const payload = createPayloadFromOrder(token);
      console.log(payload);
      // Uncomment and modify the payload creation logic when using imPoweredRequest
      // const payload = createPayloadFromOrder();
      // const response = await imPoweredRequest("URL", "POST", payload);
      // if (response.status < 300) {
      //   // Handle success response
      //   Router.push(`${clientOrigin}/confirmation`);
      //   setIsLoading(false);
      //   return;
      // }
      // throw new Error("Error message");
    } catch (e) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Create POST Payload
  const createPayloadFromOrder = (token: string) => {
    try {
      const { customer, shipping, billing, product: P, isSubbed } = formData;

      let product = {
        high_risk: true,
        title: "",
        sku: "",
        price: isSubbed ? 0 : 0,
        compare_at_price: 0,
        handle: "",
        options1: "",
        options2: "",
        options3: "",
        weight: 1,
        variant_id: 0,
        quantity: 1,
        product_id: "",
        is_recurring: isSubbed
      };
      switch (P) {
        case "ONE": {
          product = {
            high_risk: true,
            title: "1 Bottle",
            sku: "PM-1-B",
            price: isSubbed ? 39 : 49,
            compare_at_price: 0,
            handle: "1-bottle",
            options1: "1 Bottle",
            options2: "",
            options3: "",
            weight: 0.15,
            variant_id: 0,
            quantity: 1,
            product_id: "",
            is_recurring: isSubbed
          };
          break;
        }      
        case "THREE": {
          product = {
            high_risk: true,
            title: "3 Bottles",
            sku: "PM-3-B",
            price: isSubbed ? 49 : 59,
            compare_at_price: 0,
            handle: "3-bottles",
            options1: "3 Bottles",
            options2: "",
            options3: "",
            weight: 0.35,
            variant_id: 0,
            quantity: 1,
            product_id: "",
            is_recurring: isSubbed
          };
          break;
        }      
        case "SIX": {
          product = {
            high_risk: true,
            title: "6 Bottles",
            sku: "PM-6-B",
            price: isSubbed ? 59 : 69,
            compare_at_price: 0,
            handle: "6-bottls",
            options1: "6 Bottles",
            options2: "",
            options3: "",
            weight: 0.75,
            variant_id: 0,
            quantity: 1,
            product_id: "",
            is_recurring: true
          };
          break;
        }      
        default:
          break;
      }
      return {
        customer: {...customer, token},
        shipping: shipping,
        billing: differentBilling ? billing : shipping,
        high_risk: false,
        product: product,
        fun_uid: process.env.NEXT_PUBLIC_IMPOWERED_FUNNEL,
        external_type: "SHOPIFY",
      };
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Submit
  const handleSubmit = (event: React.FormEvent) => {
    console.log("[HANDLE SUBMIT]");
    console.log(formData);
    const CollectJS = window ? (window as any).CollectJS : null;
    event.preventDefault();
    setFormData((prevFormData) => ({ ...prevFormData, isSubmitting: true }));
    CollectJS.startPaymentRequest();
  };

  // Use Effect for 
  useEffect(() => {
    // Fetch data from local storage and update formData accordingly
    const isSubbed = localStorage.getItem("subscribed");
    const product = localStorage.getItem("product");
    setFormData((prevFormData) => ({
      ...prevFormData,
      product: product || "",
      isSubbed: Boolean(isSubbed || false),
      isSubmitting: false
    }));
  }, []);

  // Countdown Timer 
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    setWindowWidth(window.innerWidth);

    return () => clearInterval(timer);
  }, []);

  // Configure CollectJS 
  useEffect(() => {
    console.log("STARTED");
    const CollectJS = window ? (window as any).CollectJS : null;
    if (CollectJS && !formData.isSubmitting) {
      CollectJS.configure({
        variant: "inline",
        theme: "bootstrap",
        buttonText: "SUBMIT ME!",
        callback: finishSubmit,
        fields: {
          ccnumber: {
            placeholder: "CC Number",
            selector: "#ccnumber",
          },
          ccexp: {
            placeholder: "CC Expiration",
            selector: "#ccexp",
          },
          cvv: {
            placeholder: "CVV",
            selector: "#cvv",
          },
        },
      });
    }
  }, [formData]);

  // Finish Submit call back 
  const finishSubmit = useCallback(async (response: any) => {
    const { isSubmitting, alertMessage, ...formDataWithoutSubmissionProps } = formData;
    formDataWithoutSubmissionProps.token = response.token;
    await handlePurchase(response.token);
    setFormData({
      ...formDataWithoutSubmissionProps,
      isSubmitting: false,
      alertMessage: "",
    });
  }, [formData]);

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
        <script 
          async
          src="https://secure.safewebservices.com/token/Collect.js"
          data-tokenization-key="6wJ393-XNxZRT-2MgyE5-9732R4"
          data-custom-css='{
            "background-color": "white",
            "color": "000",
            "float": "left",
            "width": "100%",
            "border": "1px solid #bbb9b7",
            "outline": "none !important",
            "height": "50px",
            "padding": "10px 15px",
            "border-radius": "5px",
            "font-weight": "normal",
            "transition": "all 0.2s ease-out",
            "box-sizing": "border-box",
            "font-size": "16px",
            "margin-bottom": "0.5rem"
          }'></script>
      </Head>
      <main className={`${styles.row}  ${styles.mobileCol} ${checkout_styles.container}`}>
        <div className={`${styles.col} ${checkout_styles.left}`}>
          <header className={`${checkout_styles.header} ${styles.row}`} style={{justifyContent: "space-between"}}>
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
                      {
                        formData.product == "ONE"  ? <p className={checkout_styles.prodCount}>1</p> : 
                        formData.product == "THREE"  ? <p className={checkout_styles.prodCount}>3</p> :
                        formData.product == "SIX"  ? <p className={checkout_styles.prodCount}>6</p> : null
                      }
                    </div>
                    <div className={checkout_styles.odrRgt}>
                        <p className={checkout_styles.ordTitle}><strong>Peak Male</strong><br />Xtreme Test Booster</p>
                    </div>
                  </div>
                  <div className={checkout_styles.ordRight}>
                      {
                        formData.product == "ONE"  ? <p><span>$49.00</span><br />$59.99</p> : 
                        formData.product == "THREE"  ? <p><span>$269.00</span><br />$149.99</p> :
                        formData.product == "SIX"  ? <p><span>$534.00</span><br />$234.99</p> : null
                      }
                  </div>
                </div>

                <div className={checkout_styles.deviderCp}></div>
                  
                <table className={checkout_styles.cartTable}>
                  <tbody>
                    <tr>
                      <td align="left">Subtotal</td>
                      {
                        formData.product == "ONE"  ? <td align="right"><span>$69.98</span></td> : 
                        formData.product == "THREE"  ? <td align="right"><span>$159.98</span></td> :
                        formData.product == "SIX"  ? <td align="right"><span>$244.98</span></td> : null
                      }
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
                      {
                        formData.product == "ONE"  ? <td align="right" className={checkout_styles.totTxtL}><span>$69.98</span></td> : 
                        formData.product == "THREE"  ? <td align="right" className={checkout_styles.totTxtL}><span>$159.98</span></td> :
                        formData.product == "SIX"  ? <td align="right" className={checkout_styles.totTxtL}><span>$244.98</span></td> : null
                      }
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>: null}


          <form onSubmit={handleSubmit}>
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
                      <input onChange={(e) => setFormData({...formData, customer: {...formData.customer, email: e.target.value}})} type="email" className={`${checkout_styles.inputFlds}`} placeholder="Email" id="email" data-placeholder="Email" />
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
                        <input onChange={(e) => setFormData({...formData, customer: {...formData.customer, first_name: e.target.value}})} type="first_name" className={`${checkout_styles.inputFlds}`} placeholder="First Name" id="first_name" data-placeholder="First Name" />
                      </div>
                    </div>
                    <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                      <div className={``}>
                        <label htmlFor="last_name" className="fl-label">Last Name</label>
                        <input onChange={(e) => setFormData({...formData, customer: {...formData.customer, last_name: e.target.value}})} type="last_name" className={`${checkout_styles.inputFlds}`} placeholder="Last Name" id="last_name" data-placeholder="Last Name" />
                      </div>
                    </div>
                  </div>

                  <div className={`${checkout_styles.frmFlds}`}>
                    <div className={``}>
                      <label htmlFor="line1" className="fl-label">Street Address</label>
                      <input onChange={(e) => setFormData({...formData, shipping: {...formData.shipping, line1: e.target.value}})} type="line1" className={`${checkout_styles.inputFlds}`} placeholder="Street Address" id="line1" data-placeholder="Street Address" />
                    </div>
                  </div>

                  <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between"}}>
                    <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                      <div className={``}>
                        <label htmlFor="city" className="fl-label">City</label>
                        <input onChange={(e) => setFormData({...formData, shipping: {...formData.shipping, city: e.target.value}})} type="city" className={`${checkout_styles.inputFlds}`} placeholder="City" id="city" data-placeholder="City" />
                      </div>
                    </div>
                    <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                      <div className={``}>
                        <select onChange={(e) => setFormData({...formData, shipping: {...formData.shipping, state: e.target.value}})}  name="state" className={checkout_styles.selcetFld} id="state">
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
                        <input onChange={(e) => setFormData({...formData, shipping: {...formData.shipping, zip: e.target.value}})}  type="zip" className={`${checkout_styles.inputFlds}`} placeholder="Zip Code" id="zip" data-placeholder="Zip Code" />
                      </div>
                    </div>
                    <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                      <div className={``}>
                        <label htmlFor="country" className="fl-label">Country</label>
                        <input onChange={(e) => setFormData({...formData, shipping: {...formData.shipping, country: e.target.value}})}  type="country" className={`${checkout_styles.inputFlds}`} placeholder="US" id="country" data-placeholder="US" disabled />
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
                    <input onClick={() => setBilling(false)} type="radio" name="address" checked={!differentBilling}/>Same as shipping address
                  </label>
                </div>
                <div className={checkout_styles.paymentCardsBox}>
                  <label className={checkout_styles.billingtogglbtn}>
                    <input onClick={() => setBilling(true)}  type="radio" name="address" checked={differentBilling} />Use a different billing address
                  </label>
                </div>
              {differentBilling ? <div className={checkout_styles.paymentFldsBox}>
                  <div className={checkout_styles.cpContact} style={{marginTop: "0"}}>

                      {/* <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between"}}>
                        <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                          <div className={``}>
                            <label htmlFor="first_name" className="fl-label">First Name</label>
                            <input onChange={(e) => setState((prevState) => { return {...prevState, customer: {...prevState.customer, first_name: e.target.value}}})} type="first_name" className={`${checkout_styles.inputFlds}`} placeholder="First Name" id="first_name" data-placeholder="First Name" />
                          </div>
                        </div>
                        <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                          <div className={``}>
                            <label htmlFor="last_name" className="fl-label">Last Name</label>
                            <input onChange={(e) => setState((prevState) => { return {...prevState, customer: {...prevState.customer, last_name: e.target.value}}})} type="last_name" className={`${checkout_styles.inputFlds}`} placeholder="Last Name" id="last_name" data-placeholder="Last Name" />
                          </div>
                        </div>
                      </div> */}

                      <div className={`${checkout_styles.frmFlds}`}>
                        <div className={``}>
                          <label htmlFor="line1" className="fl-label">Street Address</label>
                          <input onChange={(e) => setFormData({...formData, billing: {...formData.billing, line1: e.target.value}})} type="line1" className={`${checkout_styles.inputFlds}`} placeholder="Street Address" id="line1" data-placeholder="Street Address" />
                        </div>
                      </div>

                      <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between"}}>
                        <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                          <div className={``}>
                            <label htmlFor="city" className="fl-label">City</label>
                            <input onChange={(e) => setFormData({...formData, billing: {...formData.billing, city: e.target.value}})} type="city" className={`${checkout_styles.inputFlds}`} placeholder="City" id="city" data-placeholder="City" />
                          </div>
                        </div>
                        <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                          <div className={``}>
                            <select onChange={(e) => setFormData({...formData, billing: {...formData.billing, state: e.target.value}})} name="state" className={checkout_styles.selcetFld} id="state">
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
                            <input  onChange={(e) => setFormData({...formData, billing: {...formData.billing, zip: e.target.value}})} type="zip" className={`${checkout_styles.inputFlds}`} placeholder="Zip Code" id="zip" data-placeholder="Zip Code" />
                          </div>
                        </div>
                        <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                          <div className={``}>
                            <label htmlFor="country" className="fl-label">Country</label>
                            <input  onChange={(e) => setFormData({...formData, billing: {...formData.billing, country: e.target.value}})} type="country" className={`${checkout_styles.inputFlds}`} placeholder="US" id="country" data-placeholder="US" disabled />
                          </div>
                        </div>
                      </div>

                  </div>
                </div> : null}
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

              {formData.alertMessage && <div className="alert">{formData.alertMessage}</div>}
              <div className={checkout_styles.payoptbox}>
                <div className={checkout_styles.paymentCardsBox}>
                  <label className={checkout_styles.paymybtn}>
                    <input type="radio" name="paymenttoggle" checked />Credit card
                  </label>
                  <img src="https://hitsdesignclients.com/Peak-Male-new/images/payment-cards.png" alt=""/> 
                </div>
                <div style={{padding: "1rem"}}>
                  <CollectJSSection />
                  <p className={checkout_styles.securityText}>
                    <img src="https://hitsdesignclients.com/Peak-Male-new/images/lock.png" alt="" />
                    <span>We protect your payment information using encryption to provide bank-level security.</span>
                  </p>
                </div>
                
              </div>
            </div>

            <div className={checkout_styles.allSubmit}>
              <button className={checkout_styles.frmSubmit} id='payButton' type="submit" disabled={formData.isSubmitting}>
                <span>
                  <Image src="https://hitsdesignclients.com/Peak-Male-new/images/lock2.png" alt="" width={500} height={500} style={{height: "auto", width: "18px"}}/>complete purchase
                </span>
                <p>Try it risk free! - 30-day money back Guarantee</p>
              </button>
            </div>
          </form>

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
                      {
                        formData.product == "ONE"  ? <p className={checkout_styles.prodCount}>1</p> : 
                        formData.product == "THREE"  ? <p className={checkout_styles.prodCount}>3</p> :
                        formData.product == "SIX"  ? <p className={checkout_styles.prodCount}>6</p> : null
                      }
                    </div>
                    <div className={checkout_styles.odrRgt}>
                        <p className={checkout_styles.ordTitle}><strong>Peak Male</strong><br />Xtreme Test Booster</p>
                    </div>
                  </div>
                  <div className={checkout_styles.ordRight}>
                      {
                        formData.product == "ONE"  ? <p><span>$49.00</span><br />$59.99</p> : 
                        formData.product == "THREE"  ? <p><span>$269.00</span><br />$149.99</p> :
                        formData.product == "SIX"  ? <p><span>$534.00</span><br />$234.99</p> : null
                      }
                  </div>
                </div>

                <div className={checkout_styles.deviderCp}></div>
                  
                <table className={checkout_styles.cartTable}>
                  <tbody>
                    <tr>
                      <td align="left">Subtotal</td>
                      {
                        formData.product == "ONE"  ? <td align="right"><span>$69.98</span></td> : 
                        formData.product == "THREE"  ? <td align="right"><span>$159.98</span></td> :
                        formData.product == "SIX"  ? <td align="right"><span>$244.98</span></td> : null
                      }
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
                      {
                        formData.product == "ONE"  ? <td align="right" className={checkout_styles.totTxtL}><span>$69.98</span></td> : 
                        formData.product == "THREE"  ? <td align="right" className={checkout_styles.totTxtL}><span>$159.98</span></td> :
                        formData.product == "SIX"  ? <td align="right" className={checkout_styles.totTxtL}><span>$244.98</span></td> : null
                      }
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
  // sendPageViewEvent("CHECKOUT");
  return { props: {} };
}
