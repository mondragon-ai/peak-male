import checkout_styles from "../styles/Checkout.module.css";
import { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Head from "next/head";
import { Context } from "@/context/context";
import styles from "../styles/Home.module.css";
import { imPoweredRequest } from "@/components/lib/request";
import Image from "next/image";
import { formatTime } from "@/components/lib/formatter";
import CollectJSSection from "@/components/Payments/COollectionJSSection";
import { LineItem } from "@/components/Form/OrderForm";

interface FormData {
  firstName: string;
  lastName: string;
  amount: string;
  isSubmitting: boolean;
  alertMessage: string;
  token: string;
}

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

const description = `Rivigerate your manhood with Peak Male`;
const ogImgUrl =  "";
const canonicalUrl = "https://hitsdesignclients.com/Peak-Male-new/images/logo.png";
const title = "Peak Male | Optimal Human" 


const CheckOut = () => {
  const [countdown, setCountdown] = useState(300);
  const [globalState, setGlobalState] = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [differentBilling, setBilling] = useState(true);
  const [clientOrigin, setClientOrigin] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);

  // Customer & Product Data
  const [state, setState] = useState({
    line_items: [] as LineItem[],
    product: "",
    isSubbed: false,
    customer: {
      email: "",
      first_name: "",
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
  });

  // CC Form Data
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    amount: '',
    isSubmitting: false,
    alertMessage: '',
    token: '',
  });

  console.log(state);

  // When the Collect.js callback is triggered -> POST
  const finishSubmit = (response: any) => {
    const { isSubmitting, alertMessage, ...formDataWithoutSubmissionProps } = formData;
    formDataWithoutSubmissionProps.token = response.token;
    console.log(formDataWithoutSubmissionProps.token);
    setFormData({
      ...formDataWithoutSubmissionProps,
      isSubmitting: false,
      alertMessage: 'The form was submitted. Check the console to see the output data.',
    });

  };

  // Handle CC Form Submit
  const handleSubmit = (event: React.FormEvent) => {
    const CollectJS = window ? (window as any).CollectJS : null;
    event.preventDefault();
    console.log(state);
    setFormData((prevFormData) => ({ ...prevFormData, isSubmitting: true }));
    CollectJS.startPaymentRequest();
  };

  // Render Countdown
  const renderCountdown = () => {

    for (let i = countdown; i > 0; i--) {
        return (<span key={i} style={{color: "red"}} id={`second-${i}`}>
          {formatTime(i)}
        </span>)
    }
  };

  // Fn to Handle POST to imPowered API
  const handlePurchase = async () => {
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

  // Create Payload for imPowered POST
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

  // Analytics Use Effect
  useEffect(() => {
    let query = new URLSearchParams(window.location.search);
    setWindowWidth(window? window.innerWidth : 0);
    // sendPageViewEvent("UPSELL"); // send page view event to google analytics
  

    let price = 0;

    // push 3rd party analytics
    // gtag.twitterEvent(email, price);
    // gtag.event('conversion', {
    //   'send_to': 'AW-10793712364/Knd8CNuBkpIYEOz165oo',
    //   'value': price,
    //   'currency': 'USD',
    //   'transaction_id': "txt_" + crypto.randomBytes(10).toString("hex").substring(0,10)
    // });
  }, [formData]);
  
  // On Load Effect -> Collect.js
  useEffect(() => {
    const isSubbed = localStorage.getItem("subscribed");
    const product = localStorage.getItem("product");

    setState({...state, product: product || "", isSubbed: Boolean(isSubbed || false)});

    const CollectJS = window ? (window as any).CollectJS : null;
    console.log('CollectJS:', CollectJS);

    if (CollectJS) {
      console.log('CollectJS is available!');
      CollectJS.configure({
        variant: 'inline',
        'theme': 'bootstrap',
        'buttonText': 'SUBMIT ME!',
        callback: (token: string) => {
          console.log(token);
          finishSubmit(token);
        },
        fields: {
          ccnumber: {
            placeholder: 'CC Number',
            selector: '#ccnumber',
          },
          ccexp: {
            placeholder: 'CC Expiration',
            selector: '#ccexp',
          },
          cvv: {
            placeholder: 'CVV',
            selector: '#cvv',
          },
        },
      });
    } else {
      console.log('CollectJS is not available!');
    }

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, []);

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
                        state.product == "ONE"  ? <p className={checkout_styles.prodCount}>1</p> : 
                        state.product == "THREE"  ? <p className={checkout_styles.prodCount}>3</p> :
                        state.product == "SIX"  ? <p className={checkout_styles.prodCount}>6</p> : null
                      }
                    </div>
                    <div className={checkout_styles.odrRgt}>
                        <p className={checkout_styles.ordTitle}><strong>Peak Male</strong><br />Xtreme Test Booster</p>
                    </div>
                  </div>
                  <div className={checkout_styles.ordRight}>
                      {
                        state.product == "ONE"  ? <p><span>$49.00</span><br />$59.99</p> : 
                        state.product == "THREE"  ? <p><span>$269.00</span><br />$149.99</p> :
                        state.product == "SIX"  ? <p><span>$534.00</span><br />$234.99</p> : null
                      }
                  </div>
                </div>

                <div className={checkout_styles.deviderCp}></div>
                  
                <table className={checkout_styles.cartTable}>
                  <tbody>
                    <tr>
                      <td align="left">Subtotal</td>
                      {
                        state.product == "ONE"  ? <td align="right"><span>$69.98</span></td> : 
                        state.product == "THREE"  ? <td align="right"><span>$159.98</span></td> :
                        state.product == "SIX"  ? <td align="right"><span>$244.98</span></td> : null
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
                        state.product == "ONE"  ? <td align="right" className={checkout_styles.totTxtL}><span>$69.98</span></td> : 
                        state.product == "THREE"  ? <td align="right" className={checkout_styles.totTxtL}><span>$159.98</span></td> :
                        state.product == "SIX"  ? <td align="right" className={checkout_styles.totTxtL}><span>$244.98</span></td> : null
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
                      <input onChange={(e) => setState((prevState) => { return {...prevState, customer: {...prevState.customer, email: e.target.value}}})} type="email" className={`${checkout_styles.inputFlds}`} placeholder="Email" id="email" data-placeholder="Email" />
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
                        <input onChange={(e) => setState((prevState) => { return {...prevState, customer: {...prevState.customer, first_name: e.target.value}}})} type="first_name" className={`${checkout_styles.inputFlds}`} placeholder="First Name" id="first_name" data-placeholder="First Name" />
                      </div>
                    </div>
                    <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                      <div className={``}>
                        <label htmlFor="last_name" className="fl-label">Last Name</label>
                        <input onChange={(e) => setState((prevState) => { return {...prevState, customer: {...prevState.customer, last_name: e.target.value}}})} type="last_name" className={`${checkout_styles.inputFlds}`} placeholder="Last Name" id="last_name" data-placeholder="Last Name" />
                      </div>
                    </div>
                  </div>

                  <div className={`${checkout_styles.frmFlds}`}>
                    <div className={``}>
                      <label htmlFor="line1" className="fl-label">Street Address</label>
                      <input onChange={(e) => setState((prevState) => { return {...prevState, shipping: {...prevState.shipping, line1: e.target.value}}})} type="line1" className={`${checkout_styles.inputFlds}`} placeholder="Street Address" id="line1" data-placeholder="Street Address" />
                    </div>
                  </div>

                  <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between"}}>
                    <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                      <div className={``}>
                        <label htmlFor="city" className="fl-label">City</label>
                        <input onChange={(e) => setState((prevState) => { return {...prevState, shipping: {...prevState.shipping, city: e.target.value}}})} type="city" className={`${checkout_styles.inputFlds}`} placeholder="City" id="city" data-placeholder="City" />
                      </div>
                    </div>
                    <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                      <div className={``}>
                        <select onChange={(e) => setState((prevState) => { return {...prevState, shipping: {...prevState.shipping, state: e.target.value}}})}  name="state" className={checkout_styles.selcetFld} id="state">
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
                        <input onChange={(e) => setState((prevState) => { return {...prevState, shipping: {...prevState.shipping, zip: e.target.value}}})}  type="zip" className={`${checkout_styles.inputFlds}`} placeholder="Zip Code" id="zip" data-placeholder="Zip Code" />
                      </div>
                    </div>
                    <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                      <div className={``}>
                        <label htmlFor="country" className="fl-label">Country</label>
                        <input onChange={(e) => setState((prevState) => { return {...prevState, shipping: {...prevState.shipping, country: e.target.value}}})}  type="country" className={`${checkout_styles.inputFlds}`} placeholder="US" id="country" data-placeholder="US" disabled />
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
                          <input onChange={(e) => setState((prevState) => { return {...prevState, billing: {...prevState.billing, line1: e.target.value}}})} type="line1" className={`${checkout_styles.inputFlds}`} placeholder="Street Address" id="line1" data-placeholder="Street Address" />
                        </div>
                      </div>

                      <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between"}}>
                        <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                          <div className={``}>
                            <label htmlFor="city" className="fl-label">City</label>
                            <input onChange={(e) => setState((prevState) => { return {...prevState, billing: {...prevState.billing, city: e.target.value}}})} type="city" className={`${checkout_styles.inputFlds}`} placeholder="City" id="city" data-placeholder="City" />
                          </div>
                        </div>
                        <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                          <div className={``}>
                            <select onChange={(e) => setState((prevState) => { return {...prevState, billing: {...prevState.billing, state: e.target.value}}})} name="state" className={checkout_styles.selcetFld} id="state">
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
                            <input  onChange={(e) => setState((prevState) => { return {...prevState, billing: {...prevState.billing, zip: e.target.value}}})} type="zip" className={`${checkout_styles.inputFlds}`} placeholder="Zip Code" id="zip" data-placeholder="Zip Code" />
                          </div>
                        </div>
                        <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                          <div className={``}>
                            <label htmlFor="country" className="fl-label">Country</label>
                            <input  onChange={(e) => setState((prevState) => { return {...prevState, billing: {...prevState.billing, country: e.target.value}}})} type="country" className={`${checkout_styles.inputFlds}`} placeholder="US" id="country" data-placeholder="US" disabled />
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
                        state.product == "ONE"  ? <p className={checkout_styles.prodCount}>1</p> : 
                        state.product == "THREE"  ? <p className={checkout_styles.prodCount}>3</p> :
                        state.product == "SIX"  ? <p className={checkout_styles.prodCount}>6</p> : null
                      }
                    </div>
                    <div className={checkout_styles.odrRgt}>
                        <p className={checkout_styles.ordTitle}><strong>Peak Male</strong><br />Xtreme Test Booster</p>
                    </div>
                  </div>
                  <div className={checkout_styles.ordRight}>
                      {
                        state.product == "ONE"  ? <p><span>$49.00</span><br />$59.99</p> : 
                        state.product == "THREE"  ? <p><span>$269.00</span><br />$149.99</p> :
                        state.product == "SIX"  ? <p><span>$534.00</span><br />$234.99</p> : null
                      }
                  </div>
                </div>

                <div className={checkout_styles.deviderCp}></div>
                  
                <table className={checkout_styles.cartTable}>
                  <tbody>
                    <tr>
                      <td align="left">Subtotal</td>
                      {
                        state.product == "ONE"  ? <td align="right"><span>$69.98</span></td> : 
                        state.product == "THREE"  ? <td align="right"><span>$159.98</span></td> :
                        state.product == "SIX"  ? <td align="right"><span>$244.98</span></td> : null
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
                        state.product == "ONE"  ? <td align="right" className={checkout_styles.totTxtL}><span>$69.98</span></td> : 
                        state.product == "THREE"  ? <td align="right" className={checkout_styles.totTxtL}><span>$159.98</span></td> :
                        state.product == "SIX"  ? <td align="right" className={checkout_styles.totTxtL}><span>$244.98</span></td> : null
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
