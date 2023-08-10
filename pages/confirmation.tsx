import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { Context } from "@/context/context";
import styles from "../styles/Home.module.css";
import confirmation_styles from "../styles/Confirmation.module.css";
import { BillingAddress, Customer, getBillingAddressFromLocalStorage, getCustomerFromLocalStorage } from "@/components/lib/storage";
import { getFormattedDate } from "@/components/lib/formatter";
import { sendPageViewEvent } from "@/components/lib/analytics";


const description = `Rivigerate your manhood with Peak Male`;
const ogImgUrl =  "https://cdn.shopify.com/s/files/1/0727/2805/2008/files/card.png?v=1690477687";
const canonicalUrl = "";
const title = "Peak Male | Optimal Human" 

const Confirmation = () => {
  const [globalState, setGlobalState] = useContext(Context);
  const [windowWidth, setWindowWidth] = useState(0);
  const [order, setOrder] = useState({
    product: "",
    isSubbed: false,
    upsell: false,
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
    orderID: ""
  });


  useEffect(() => {
    setWindowWidth(window? window.innerWidth : 0);
    // Fetch data from local storage and update formData accordingly
    const isSubbed = localStorage.getItem("subscribed");
    const product = localStorage.getItem("product");
    const upsell = localStorage.getItem("upsell");
    const billing = getBillingAddressFromLocalStorage("billing_address");
    const shipping = getBillingAddressFromLocalStorage("shipping");
    const customer = getCustomerFromLocalStorage("customer");
    const orderID = localStorage.getItem("draft_order");

    setOrder((prevFormData) => ({
      ...prevFormData,
      product: product || "",
      isSubbed: isSubbed == "true",
      upsell: upsell == "true",
      customer: customer ? customer : {} as Customer,
      shipping: shipping ? shipping : {} as BillingAddress,
      billing: billing ? billing : {} as BillingAddress,
      orderID: orderID ? orderID.substring(4,orderID.length) : ""
    }));

    // sendPageViewEvent("CONFIRMATION"); // send page view event to google analytics

    // push 3rd party analytics
    // gtags.twitterEvent(email, price);
    // gtags.event('conversion', {
    //   'send_to': 'AW-10793712364/Knd8CNuBkpIYEOz165oo',
    //   'value': price,
    //   'currency': 'USD',
    //   'transaction_id': "txt_" + crypto.randomBytes(10).toString("hex").substring(0,10)
    // });    
  }, []);

  const ONE = order.isSubbed ? 59.00 : 69.00;
  const THREE = order.isSubbed ? (49.00*3) : (59.00*3);
  const SIX = order.isSubbed ? (39.00*6): (49.00*6);
  const TOTAL = order.upsell ? 34.50 : 0.00;
  const formattedDate = getFormattedDate();   

  return (
    <div style={{background: "grey", minHeight: "100vh"}}>
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
      <main className={`${styles.col}`} style={{width: "100%", background: "white"}}>
        <div className={confirmation_styles.header}>
          <div className={confirmation_styles.container}>
            <img src="https://hitsdesignclients.com/Peak-Male-new/images/logo.png" alt="" className={confirmation_styles.logo} />
            <ul className={confirmation_styles.stpList}>
              <li>Checkout</li>
              <li>Special Offer</li>
              <li>Order Receipt</li>
            </ul>
          </div>
        </div>

        <div className={confirmation_styles.tyTopHdng}>
          <div className={confirmation_styles.container}>
            <p className={confirmation_styles.tyHdngTxt1}>
              <span>Thank You For Your Order!</span>
            </p>
            <p className={confirmation_styles.tyHdngTxt2}>Your Order Will Be Processed & Shipped Shortly!</p>
          </div>
        </div>

        <div className={confirmation_styles.thankSec}>
          <div className={confirmation_styles.container}>
            <div className={confirmation_styles.thankBox}>
              <div className={confirmation_styles.tyCoupnInner}>

                <p className={confirmation_styles.thnkTopTxt}>We'll send you an email as soon as your order is shipped out. If you have any questions, please get in touch with our customer service team.</p>
                
                <div className={confirmation_styles.tySecHeading}>
                  <span>Order Summary</span>
                </div>

                <div className={confirmation_styles.summryContainer}>

                  <div className={confirmation_styles.thnkOdrnmbr}>
                    <p className={confirmation_styles.thnkOdrtxt1}>Order Number: <br className={confirmation_styles.showMob} /><span>{order.orderID}</span></p>
                    <p className={confirmation_styles.thnkOdrtxt2}>Order Date: <br className={confirmation_styles.showMob} /><span>{formattedDate}</span></p>
                  </div>

                  <div className={confirmation_styles.tyOdrSmryBox}>
                    <div className={confirmation_styles.tyHeadingRow}>
                      <div className={confirmation_styles.tyCol1}>Product</div>
                      <div className={confirmation_styles.tyCol3}>Qty.</div>
                      <div className={confirmation_styles.tyCol4}>Price</div>
                    </div>
                    <div className={confirmation_styles.tyProdRow}>
                      <div className={confirmation_styles.tyCol1}>
                        <span className={confirmation_styles.tyProdbx}>
                          <img src="https://hitsdesignclients.com/Peak-Male-new/images/sldr1.png" alt="" />
                        </span>
                        <p className={confirmation_styles.tyPrdName}>Peak Male</p>
                      </div>
                      <div className={confirmation_styles.tyCol3}>{order.product == "ONE" ? "1" : order.product == "THREE" ? "3" : order.product == "SIX" ? "6" : "0"}</div>
                      <div className={confirmation_styles.tyCol4}>{order.product == "ONE" ? "$"+ONE.toFixed(2) : order.product == "THREE" ? "$"+THREE.toFixed(2) : order.product == "SIX" ? "$"+SIX.toFixed(2) : "$0.00"}</div>
                    </div>
                    {order.upsell ? <div className={confirmation_styles.tyProdRow}>
                      <div className={confirmation_styles.tyCol1}>
                        <span className={confirmation_styles.tyProdbx}>
                          <img src="https://hitsdesignclients.com/Peak-Male-new/images/up-slide1.png" alt="" />
                        </span>
                        <p className={confirmation_styles.tyPrdName}>Thermogenic Fat Burner </p>
                      </div>
                      <div className={confirmation_styles.tyCol3}>1</div>
                      <div className={confirmation_styles.tyCol4}>$34.50</div>
                    </div> : null}
                  </div>

                  <div className={confirmation_styles.priceFlds}>
                    <div className={confirmation_styles.prcRow}>
                      <p>Sub Total:</p>
                      <span>{order.product == "ONE" ? "$"+(ONE+TOTAL).toFixed(2) : order.product == "THREE" ? "$"+(THREE+TOTAL).toFixed(2) : order.product == "SIX" ? "$"+(SIX+TOTAL).toFixed(2) : "$0.00"}</span>
                    </div>
                    <div className={confirmation_styles.prcRow}>
                      <p>Shipping & Handling:</p>
                      <span>{order.product == "ONE" ? "$5.99" : "$0.00"}</span>
                    </div>
                    <div className={`${confirmation_styles.prcRow}  ${confirmation_styles.total}`} style={{fontSize: "19px", fontWeight: 500}}>
                      <p>Total:</p>
                      <span>{order.product == "ONE" ? "$"+(ONE+TOTAL+5.99).toFixed(2) : order.product == "THREE" ? "$"+(THREE+TOTAL).toFixed(2) : order.product == "SIX" ? "$"+(SIX+TOTAL).toFixed(2) : "$0.00"}</span>
                    </div>
                  </div>
                </div>

                <div className={confirmation_styles.clearall}></div>

                <div className={confirmation_styles.thnkAddressinfo}>
                  <div className={confirmation_styles.tyLftAddress}>
                    <div className={confirmation_styles.shHeading}>Shipping Info:</div>
                    <ul className={confirmation_styles.userInfo}>
                      <li>
                        <span>First Name</span>
                        {order.customer.first_name ? order.customer.first_name : "-"}
                      </li>
                      <li>
                        <span>Last Name</span>
                        {order.customer.last_name ? order.customer.last_name : "-"}
                      </li>
                      <li>
                        <span>Address</span>
                        {order.shipping.line1 ? order.shipping.line1  : "-"}
                      </li>
                      <li>
                        <span>City</span>
                        {order.shipping.city ? order.shipping.city  : "-"}
                      </li>
                      <li>
                        <span>State</span>
                        {order.shipping.state ? order.shipping.state  : "-"}
                      </li>
                      <li>
                        <span>Country</span>
                        {order.shipping.country ? order.shipping.country  : "-"}
                      </li>
                      <li>
                        <span>Email</span>
                        {order.customer.email ? order.customer.email : "-"}
                      </li>
                    </ul>
                  </div>
                  <div className={confirmation_styles.tyRgtAddress}>
                    <div className={confirmation_styles.shHeading}>Billing Info:</div>
                    <ul className={confirmation_styles.userInfo}>
                      <li>
                        <span>First Name</span>
                        {order.customer.first_name ? order.customer.first_name : "-"}
                      </li>
                      <li>
                        <span>Last Name</span>
                        {order.customer.last_name ? order.customer.last_name : "-"}
                      </li>
                      <li>
                        <span>Address</span>
                        {order.billing.line1 ? order.billing.line1  :  "-"}
                      </li>
                      <li>
                        <span>City</span>
                        {order.billing.city ? order.billing.city  :  "-"}
                      </li>
                      <li>
                        <span>State</span>
                        {order.billing.state ? order.billing.state  :  "-"}
                      </li>
                      <li>
                        <span>Country</span>
                        {order.billing.country ? order.billing.country  : "-"}
                      </li>
                      <li>
                        <span>Email</span>
                        {order.customer.email ? order.customer.email : "-"}
                      </li>
                    </ul>
                  </div>
                </div>

                <ul className={confirmation_styles.custmrServiceList}>
                  <li>
                    <img src="https://hitsdesignclients.com/Peak-Male-new/images/custmr-srvc-ico1.png" alt="" />
                    <p>Customer <br /> Service</p>
                  </li>
                  <li>
                    <img src="https://hitsdesignclients.com/Peak-Male-new/images/custmr-srvc-ico2.png" alt="" />
                    <p>Free <br /> Shipping</p>
                  </li>
                  <li>
                    <img src="https://hitsdesignclients.com/Peak-Male-new/images/custmr-srvc-ico3.png" alt="" />
                    <p>Satisfaction <br /> Guranteed</p>
                  </li>
                  <li>
                    <img src="https://hitsdesignclients.com/Peak-Male-new/images/custmr-srvc-ico4.png" alt="" />
                    <p>Hassle-Free <br /> Returns</p>
                  </li>
                </ul>

                <div className={confirmation_styles.clearall}></div>


                <div className={confirmation_styles.helpBox}>
                  <p className={confirmation_styles.helpTxt1}>
                    <img src="https://hitsdesignclients.com/Peak-Male-new/images/ty-hlp-ic.png" alt="" />
                  </p>
                  <p className={confirmation_styles.helpTxt2}>Questions? We're Here To Help</p>
                  <ul>
                    <li>
                      <img src="https://hitsdesignclients.com/Peak-Male-new/images/ty-msg-ic.png" alt="" />
                      <p>Email Us <br />support@optimalhuman.com</p>
                    </li>
                    <li>
                      <img src="https://hitsdesignclients.com/Peak-Male-new/images/ty-call-ic.png" alt="" />
                      <p>Call Us <br />877-462-4459</p>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className={confirmation_styles.footer}>
          <div className={confirmation_styles.container}>
            <img src="https://hitsdesignclients.com/Peak-Male-new/images/logo.png"  className={confirmation_styles.upLogo} alt="" />
            <p className={confirmation_styles.ftrTxt}>
              <a href="">Terms & Condition</a>
              |
              <a href="">Privacy Policy</a>
              |
              <a href="">Contact Us</a>
            </p>
            <p className={`${confirmation_styles.ftrTxt}`}>
              © 2023 Optimal Human, All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Confirmation;

export async function getServerSideProps({  }) {
  sendPageViewEvent("CONFIRMATION");
  return { props: {} };
}
