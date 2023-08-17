import checkout_styles from "../styles/Checkout.module.css";
import { useState, useEffect, useCallback, SetStateAction} from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { imPoweredRequest } from "@/components/lib/request";
import Image from "next/image";
import { formatTime } from "@/components/lib/formatter";
import CollectJSSection from "@/components/Payments/COollectionJSSection";
import Router from "next/router";
import { BillingAddress, storeBillingAddressInLocalStorage } from "@/components/lib/storage";
import { sendPageViewEvent } from "@/components/lib/analytics";
import ShippingAddressForm from "@/components/Form/ShippingAddress";
import BillingAddressForm from "@/components/Form/BillingAddress";
import CountdownTimer from "@/components/lib/CountDown";
import OrderSummary from "@/components/Form/CartSummary";
import CustomerReviews from "@/components/TestimonialItem/CheckoutReviews";
import CreditCardForm from "@/components/Form/CreditCardForm";

import CryptoJS from 'crypto-js';

const algorithm = "aes-256-cbc";
const key = CryptoJS.enc.Hex.parse("739cee5373d844885b8ba15815dc2899314d2a8bf836c5124b321c818b175d58");
const iv = CryptoJS.enc.Hex.parse("01ec86cf7ac60bcc0ef84f70be4ed6c5");

/**
 * Encrypts the given plaintext using the AES-256-CBC algorithm.
 * 
 * @param text The plaintext to encrypt.
 * @returns The encrypted ciphertext if encryption is successful, otherwise an empty string.
 */
export const encryptMsg = (text: string) => {
  if (text !== "") {
    try {
      const cipherText = CryptoJS.AES.encrypt(text, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
      return cipherText.toString();
    } catch (error) {
      return "";
    }
  } else {
    return "";
  }
}

// Checkout Form Type
export interface FormData {
  product:  'ONE' | 'THREE' | 'SIX',
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
    country: string | "USA",
    phone: string
  },
  billing: {
    line1: string,
    line2: string,
    city: string,
    state: string,
    zip: string,
    country: string | "USA"
  },
  external_type: "SHOPIFY",
  amount: string;
  isSubmitting: boolean;
  alertMessage: string;
  token: string;
  loading: boolean,
  cc_info: {
    cc_number: number,
    exp_month: number,
    exp_year: number,
    ccv: number,
  }
}

// Form Data
const formDataInitialState: FormData = {
  product: "THREE",
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
    country: "USA",
    phone: ""
  },
  billing: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "USA"
  },
  external_type: "SHOPIFY",
  amount: "",
  isSubmitting: true,
  alertMessage: "",
  token: "",
  loading: false,
  cc_info: {
    cc_number: 0,
    exp_month: 0,
    exp_year: 0,
    ccv: 0,
  }
};

const description = `Rivigerate your manhood with Peak Male`;
const ogImgUrl =  "https://cdn.shopify.com/s/files/1/0727/2805/2008/files/card.png?v=1690477687";
const canonicalUrl = "";
const title = "Peak Male | Optimal Human" 

const CheckOut = () => {
  const [differentBilling, setBilling] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [summary, toggleSummary] = useState(false);

  // Handle POST -> imPowered API
  const handlePurchase = async (token: string) => {
    try {
      const payload = createPayloadFromOrder(token);
      const URL = true ? "https://us-central1-impowered-production.cloudfunctions.net/funnels" : "http://127.0.0.1:5001/impowered-production/us-central1/funnels";
    
      // Uncomment and modify the payload creation logic when using imPoweredRequest
      const response = await imPoweredRequest(URL+"/payments/checkout/fast", "POST", payload);

      // 
      if (response.status < 300) {
        
        // Store Data From Response for Order Summary
        storeBillingAddressInLocalStorage("billing_address", payload?.billing_address as BillingAddress);
        storeBillingAddressInLocalStorage("shipping", payload?.shipping as BillingAddress);
        storeBillingAddressInLocalStorage("customer", payload?.customer as any);
        localStorage.setItem("cus_uuid", response.data.data.cus_uuid);
        localStorage.setItem("draft_order", response.data.data.draft_order);

        // Handle success response
        Router.push(`/upsell`);
        return;
      } else {
        setLoading(false);
        console.log("[Status]: "+ response.status);
        console.log("[Data]: "+ response.data);
      }
    } catch (e) {
      setLoading(false);
      setFormData((prevFormData) => ({ ...prevFormData, isSubmitting: false, loading: false, alertMessage: "Problem Processing Your Card. Try Again" }));
    };
  };

  // Create POST Payload
  const createPayloadFromOrder = (token: string) => {
    try {
      const { customer, shipping, billing, cc_info} = formData;
      const isSubb_text = localStorage.getItem("subscribed");
      const p = localStorage.getItem("product");
      const isSubbed = isSubb_text == "true" ? true : isSubb_text == "false" ? false : false;

       // Encrypt the card information using AES encryption with a secret key (replace 'SECRET_KEY' with your actual key)
      const encryptedData = encryptMsg(JSON.stringify(cc_info));
      
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
        weight: 5.0,
        variant_id: 0,
        quantity: 1,
        product_id: "",
        external_id: 0 as number | null ,
        funnel_step: "OPT_IN",
        is_recurring: isSubbed
      };
      switch (p) {
        case "ONE": {
          product = {
            high_risk: true,
            title: "1 Bottle",
            sku: "PM-1-B",
            price: isSubbed ? 5900 : 6900,
            compare_at_price: 0,
            handle: "1-bottle",
            options1: "1 Bottle",
            options2: "",
            options3: "",
            weight: 5.0,
            variant_id: isSubbed ? 45756263104808 : 45361885970728,
            quantity: 1,
            product_id: "",
            external_id: isSubbed ? 1234 : null,
            funnel_step: "OPT_IN",
            is_recurring: isSubbed
          };
          break;
        }      
        case "THREE": {
          product = {
            high_risk: true,
            title: "3 Bottles",
            sku: "PM-3-B",
            price: isSubbed ? (4900*3) : (5900*3),
            compare_at_price: 0,
            handle: "3-bottles",
            options1: "3 Bottles",
            options2: "",
            options3: "",
            weight: 15.0,
            variant_id:  isSubbed ? 45756263170344 : 45361886003496,
            quantity: 1,
            product_id: "",
            external_id: isSubbed ? 1235 : null,
            funnel_step: "OPT_IN",
            is_recurring: isSubbed
          };
          break;
        }      
        case "SIX": {
          product = {
            high_risk: true,
            title: "6 Bottles",
            sku: "PM-6-B",
            price: isSubbed ? (3900*6) : (4900*6),
            compare_at_price: 0,
            handle: "6-bottls",
            options1: "6 Bottles",
            options2: "",
            options3: "",
            weight: 30.0,
            variant_id:  isSubbed ? 45756263235880 : 45361886036264,
            quantity: 1,
            product_id: "",
            external_id: isSubbed ? 1236 : null,
            funnel_step: "OPT_IN",
            is_recurring: isSubbed
          };
          break;
        }      
        default:
          break;
      }
      return {
        payment_method: "",
        fun_uuid: process.env.NEXT_PUBLIC_IMPOWERED_FUNNEL,
        high_risk: true,
        billing_address: differentBilling ? {...billing, type: "BILLING"} : {...shipping, type: "BOTH"},
        bump: false,
        payment_token: token || "",
        security_key: "2hNZ5C543yfQH59e9zcEd33QDZw5JcvV",  
        customer: {...customer, token: token || ""},
        shipping:  differentBilling ? {...shipping, type: "SHIPPING"} : {...shipping, type: "BOTH"},
        line_items: [product],
        fun_uid: process.env.NEXT_PUBLIC_IMPOWERED_FUNNEL,
        external_type: "SHOPIFY",
        shopify_shop: "optimalhuman",
        cc_info: encryptedData,
        single_form: true
      };
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Submit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setFormData((prevFormData) => ({ ...prevFormData, isSubmitting: true, loading: true }));
    if (formData.customer.email !== "" && 
      formData.customer.first_name !== "" && 
      formData.shipping.line1 !== "" && 
      formData.shipping.city !== "" && 
      formData.shipping.state !== "" &&
      formData.shipping.zip !== "" &&
      formData.cc_info.cc_number > 0 &&
      formData.cc_info.exp_month > 0 &&
      formData.cc_info.exp_year > 8 &&
      formData.cc_info.ccv > 0 &&
      formData.cc_info.exp_year > 22) {
      await handlePurchase("");
    } else {
      setLoading(false);
      setFormData((prevFormData) => ({ ...prevFormData, alertMessage: "All Forms Required"}));
    }
  };

  // Use Effect for 
  useEffect(() => {
    // Fetch data from local storage and update formData accordingly
    const isSubb_text = localStorage.getItem("subscribed");
    const p:  'ONE' | 'THREE' | 'SIX' = localStorage.getItem("product") as unknown as  'ONE' | 'THREE' | 'SIX' ;
    const isSubbed = isSubb_text == "true" ? true : isSubb_text == "false" ? false : false;

    // reset window width
    setWindowWidth(window.innerWidth);

    // Set initial Form Data
    setFormData((prevFormData) => ({
      ...prevFormData,
      isSubmitting: false,
      isSubbed: isSubbed || false,
      product: p || 'THREE'
    }));
    sendPageViewEvent("OPT_IN");
  }, []);


  // Clear alert message after 5 seconds
  useEffect(() => {
    if (formData.alertMessage) {
      const timer = setTimeout(() => {
        setFormData((prevFormData) => ({ ...prevFormData, alertMessage: '' }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [formData.alertMessage]);

  const ONE = formData.product == "ONE" && formData.isSubbed ? "$59.00" : formData.product == "ONE" && !formData.isSubbed ? "$69.00" : "";
  const THREE = formData.product == "THREE" && formData.isSubbed ? "$147.00" : formData.product == "THREE" && !formData.isSubbed ? "$177.00" : "";
  const SIX = formData.product == "SIX" && formData.isSubbed ? "$234.00" : formData.product == "SIX" && !formData.isSubbed ? "$294.00" : "";

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

          {windowWidth < 720  ? 
            <>
              <div onClick={() => toggleSummary(!summary)}  className={checkout_styles.summryToggleMob}>
                <div className={checkout_styles.container}>
                  <p className={checkout_styles.summryToggle}>
                    {summary ? <span>Hide Order Summary  <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg" className={checkout_styles.orderSummaryToggleDropdown} fill="#000"><path d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path></svg></span> : 
                    <span>Open Order Summary  <svg width="11" height="6" xmlns="http://www.w3.org/2000/svg" className={checkout_styles.orderSummaryToggleDropdown} fill="#000"><path d="M.504 1.813l4.358 3.845.496.438.496-.438 4.642-4.096L9.504.438 4.862 4.534h.992L1.496.69.504 1.812z"></path></svg></span> }
                  </p>
                  <p className={checkout_styles.toglePrice}>
                    {
                      formData.product == "ONE"  ? <strong>{ONE}</strong> : 
                      formData.product == "THREE"  ? <strong>{THREE}</strong> :
                      formData.product == "SIX"  ? <strong>{SIX}</strong> : ""
                    }
                  </p>
                </div>
              </div>
              {summary ? <OrderSummary formData={formData} ONE={ONE} THREE={THREE} SIX={SIX} summary={summary} /> : null}
            </>: null}

          <form>
            <div className={`${checkout_styles.checkoutForm} ${styles.col}`}>
              <div className={`${checkout_styles.sale} ${styles.row}`}>
                <div className={`${checkout_styles.viewBoxImg}`}>
                  <Image src="https://hitsdesignclients.com/Peak-Male-new/images/per-path.png" alt="" width={500} height={500} style={{height: "auto", width: "100%"}}/>
                  <span>%</span>
                </div>
                <div className={`${checkout_styles.viewBoxTxt}`}>
                  <strong>Sale ends soon!</strong> Your cart is reserved for: &nbsp;
                  <CountdownTimer initialCountdown={300} />
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

              <ShippingAddressForm formData={formData} setFormData={setFormData}  />

              <BillingAddressForm formData={formData} setFormData={setFormData} differentBilling={differentBilling} setBilling={setBilling} />
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
                <div className={checkout_styles.paymentCardsBox}>
                  <label className={checkout_styles.paymybtn}>
                    <input type="radio" name="paymenttoggle" checked />Credit card
                  </label>
                  <img src="https://hitsdesignclients.com/Peak-Male-new/images/payment-cards.png" alt=""/> 
                </div>
                <div style={{padding: "1rem"}}>
                  
                  <CreditCardForm formData={formData} setFormData={setFormData} />

                  <p className={checkout_styles.securityText}>
                    <img src="https://hitsdesignclients.com/Peak-Male-new/images/lock.png" alt="" />
                    <span>We protect your payment information using encryption to provide bank-level security.</span>
                  </p>
                </div>
                
              </div>
            </div>

            <div className={checkout_styles.allSubmit}>
              {formData.alertMessage && <div className="alert" style={{color: "red", fontFamily: "ApercuPro-Bold", fontSize: "20px"}}>{formData.alertMessage}</div>}
              <button style={{
                  cursor: !isLoading ? "pointer" : "progress"
                }}
                onClick={handleSubmit}
                className={checkout_styles.frmSubmit}
                type="button"
                disabled={isLoading}>
                <span>
                  <Image src="https://hitsdesignclients.com/Peak-Male-new/images/lock2.png" alt="" width={500} height={500} style={{height: "auto", width: "18px"}}/>{isLoading ? "Loading..." : "complete purchase"}
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
          {windowWidth > 720 ? <OrderSummary formData={formData} ONE={ONE} THREE={THREE} SIX={SIX} summary={summary} /> : null}

          <CustomerReviews />

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
  await sendPageViewEvent("OPT_IN");
  return { props: {} };
}
