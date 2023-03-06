import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import ProductRow from "./ProductRow";
// import CustomSelect from "./CustomSelect"
import { PaymentElement } from "@stripe/react-stripe-js";
import { imPoweredRequest } from "../lib/request";
// import AddressInput from "./AddressInput";
// import MyImage from "./MyImage";
// import SquareCard from "./SquareCard";

// import check_img from "../public/images/check.png"
const validationSchema = Yup.object().shape({
  shipping: Yup.object().shape({
    line1: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    zip: Yup.number().required("Zip code is required"),
  }),
  bump: Yup.boolean(),
});

import { CreditCard, PaymentForm} from "react-square-web-payments-sdk";
import { TokenResult, VerifyBuyerResponseDetails } from "@square/web-payments-sdk-types";

const locationID = process.env.NEXT_PUBLIC_SQR_LOCATION as string
import { useRouter } from 'next/router';
import AddressInput from "./AddressInput";
import Head from "next/head";

export type LineItem = {
    high_risk: boolean,
    title: string,
    sku: string,
    price: number,
    compare_at_price: number,
    handle: string,
    options1: string,
    options2: string,
    options3: string,
    weight: number,
    variant_id: number,
    quantity: number,
    status: false,
    id: string,
    url: string,
    tags: string[]
}

export type OrderProps = {
    [key: string]: any,
    initialValues: any
    handleSubmit: any
    handlePaymentMethodSubmission: any
    status: any
    isLoading: any
    message: any
    stripe: any
    elements: any
    high_risk: any
}

function OrderForm({
  initialValues,
  handleSubmit,
  handlePaymentMethodSubmission,
  status,
  isLoading,
  message,
  stripe,
  elements,
  high_risk,
}: OrderProps) {

  const [bump, setBump] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [])


  const [billing, setBilling] = useState<any>({} as any)
  const [stripeToken, setStripeToken] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

      setBilling({
          ...billing,
          country: "" + event.target.value as  "" | "US" | "BR" | "UK" | "CA" | "NG" | "MX"
      });

  };

  const options: any[] = [
      { value: '', label: 'SELECT OPTION' },
      { value: 'US', label: 'United States' },
      { value: 'BR', label: 'Brazil' },
      { value: 'UK', label: 'United Kingdom' },
      { value: 'CA', label: 'Canada' },
      { value: 'NG', label: 'Nigeria' },
      { value: 'MX', label: 'Mexico' },
  ];

  const sqr_form = ""// + styles.col +  " " + styles.squareSettings;


  const createPayment = async (
      token: string,
  ) => {
        const body = {
            cus_uuid: "",
            source_id: token,
            name: {
                first_name: "Amelia",
                last_name: "Earhart",
            },
            customer: {
                email: "diana@gmail.com",
                first_name: "TEST",
                last_name: "ORDER"
            },
            shipping: {
                type: "BOTH",
                line1: "420 Bigly Ln",
                line2: "",
                city: "South Park",
                state: "Colorado",
                zip: "10003",
                country: "US",
                name: "TEST_ORDER",
                title: "Home"
            },
            product: {
                variant_id: 41397647507628,
                product_id: "",
                url: "",
                high_risk: true,
                title: "Bronze Entries ($60 Value) / M",
                sku: "SO-8938022",
                price: 4500,
                compare_at_price: 0,
                handle: "",
                options1: "Bronze Entries ($60 Value)",
                options2: "M",
                options3: "",
                weight: 0.0125,
                quantity: 1,
                external_id: 41397647507628,
                external_type: "SHOPIFY"
            },
            external: "SHOPIFY",
            bump: true,
            high_risk: true,
            funnel_uuid: "fun_7626c00357"
        }
        console.log(body);
        console.log(" TOKEN ==> " + token);
        console.log(" BODY ==> " + body);
        const paymentResponse = await imPoweredRequest(
            "http://localhost:5001/impowered-funnel/us-central1/funnel/checkout/quick",
            "POST",
            body
        );
      console.log(" RESPONSE => ");
      console.log(paymentResponse)
      if (paymentResponse) {
          return paymentResponse;
      }
  }

  const product: LineItem = {
      high_risk: false,
      title: "",
      sku: "",
      price: 0,
      compare_at_price: 0,
      handle: "",
      options1: "",
      options2: "",
      options3: "",
      weight: 0,
      variant_id: 42235971567788,
      quantity: 1,
      status: false,
      id: "",
      url: "",
      tags: []
  };

  const router = useRouter();
  const description = `.`;
  const canonicalUrl = "https://populipress.com/trending";
  const ogImgUrl = "https://media.discordapp.net/attachments/1008571220385599488/1074900516934524958/angmon_default_placeholder_image_for_article_in_a_new_media_sit_9b4d3887-e8f5-4566-a8a9-f09f74b27409.png";
  // {posts1 && posts1[0] && posts1[0].title ? " | " + posts1[0].title : ""}
  const t = "Blazed Hemp"; 
  return (
    <div className="formcard" id="FORM_TWO">
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
      
      <div className="imgblock">
        {/* <MyImage src={"/images/entry.png"} /> */}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div className="productcontainer">
              <div className="div-block-89">
                <div className="listheadertext">Item</div>
                <div className="listheadertext">Price</div>
              </div>
              
              {/* <ProductRow
                title="Bronze Box (45 GIVEAWAY ENTRIES)"
                price_str="$45.00"
                price_num={4500}
                piece="$60 value in products"
                product_id="42235971567788"
                sku="HT-BOX"
                options1="Bronze Entries ($60 Value)"
              />
              <ProductRow
                title="Silver Box (60 GIVEAWAY ENTRIES)"
                price_str="$60.00"
                price_num={6000}
                piece="$85 value in products"
                options1="Silver Entries ($85 Value)"
                product_id="42235972780204"
              />
              <ProductRow
                title="Gold Box - 100 GIVEAWAY ENTRIES (BEST DEAL!!)"
                price_str="$100.00"
                price_num={10000}
                piece="$150 value in products"
                product_id="42235974189228"
                options1="Gold Entries ($150 Value)"
                id="BEST_DEAL"
              />
              <ProductRow
                title="Platinum Box (200 GIVEAWAY ENTRIES)"
                price_str="$200.00"
                price_num={20000}
                piece="$310 value in products"
                options1="Platinum Entries ($310 Value)"
                product_id="42235974877356"
              />
              <h5>Select our Size</h5>
              <CustomSelect /> */}
            </div>
            <div>
              <h5>What You Get:</h5>
              <ul style={{ listStyleImage: ""}}>
                <li style={{ listStyleImage: `url(../public/images/check.png)`, margin: '0px 0', fontSize: "13px" }}>Bronze Box (45 Entries) = $60 in Products</li>
                <li style={{ listStyleImage: `url(../public/images/check.png)`, margin: '0px 0', fontSize: "13px"  }}>Silver Box (60 Entries) = $85 in Products</li>
                <li style={{ listStyleImage: `url(../public/images/check.png)`, margin: '0px 0', fontSize: "13px"  }}>Gold Box (100 Entries) = $150 in Products</li>
                <li style={{ listStyleImage: `url(../public/images/check.png)`, margin: '0px 0', fontSize: "13px"  }}>Platinum Box (200 Entries) = $310 in Products</li>
              </ul>
            </div>
            <div className="div-block-93">
              <div className="div-block-95">
                <div className="headerdividertext">PRIZE DELIVERY ADDRESS</div>
              </div>
              <div className="div-block-94" />
            </div>
            <div className="div-block-37">
              <AddressInput
                label="Address Name"
                name="shipping.line1"
                required
              />
              <AddressInput label="City" name="shipping.city" required />
              <AddressInput label="State" name="shipping.state" required />
              <AddressInput label="Zip Code" name="shipping.zip" required />
            </div>
            <div className="div-block-93">
              <div className="div-block-95">
                <div className="headerdividertext">PAYMENT INFORMATION</div>
              </div>
              <div className="div-block-94" />
            </div>
            {/* <div className="div-block-37 payment-methods">
              <div
                className={
                  paymentType === "stripe"
                    ? "payment-btn-active"
                    : "payment-btn-inactive"
                }
                onClick={() => setPaymentType("stripe")}
              >
                Stripe
              </div>
              <div
                className={
                  paymentType === "square"
                    ? "payment-btn-active"
                    : "payment-btn-inactive"
                }
                onClick={() => setPaymentType("square")}
              >
                Square
              </div>
            </div> */}

            <div id="payment-form">
              <div className="div-block-98">
                {high_risk ?  (
                  <div id="payment-element">
                    {/*Stripe.js injects the Payment Element*/}
                    <PaymentForm 
                        applicationId={process.env.NEXT_PUBLIC_SQR_APP_ID as string} 
                        cardTokenizeResponseReceived={(
                            token: TokenResult,
                            verifiedBuyer?: VerifyBuyerResponseDetails | null | undefined
                        ) => {
                                setStripeToken(token.token as string);
                                createPayment(token.token as string);
                                console.info('Token:', token);
                                console.info('Verified Buyer:', verifiedBuyer);
                            }
                        }
                        formProps={{
                            className: sqr_form,
                        }}
                        createVerificationDetails={() => ({
                            // `CHARGE` or `STORE`
                            intent: 'STORE',
                            billingContact: {
                                addressLines: [billing.line1 ? billing.line1 : "", billing.line2 ? billing.line2 : ""],
                                familyName: '',
                                givenName: '',
                                email: '',
                                country: billing.country ? billing.country : "US",
                                phone: '',
                                region: '',
                                city: billing.city ? billing.city : "",
                            },
                        })}
                        locationId={locationID}
                    >
                        <CreditCard>
                                START SELLIN'
                        </CreditCard> 
                    </PaymentForm>
                  </div>
                ) : null}
              </div>
              <div className="div-block-98">
                <div className="div-block-96">
                  <div className="listheadertext">Item</div>
                  <div className="listheadertext">Amount</div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 10px 10px 17px",
                      height: "auto"
                    }}
                    className="productrow"
                  >
                    <div className="boldtext productrowtitle">
                      {/* <p style={{ lineHeight: "15px", fontSize: "15px", color: "grey" }}>{values.product?.title}</p> */}
                      <p style={{ fontSize: "10px", color: "grey" }}>{values.product?.piece}</p>
                    </div>
                    <div className="productrowsubheader min">
                      {values.product?.price_str?.replace(/\s/g, "")}
                    </div>
                  </div>
                  {bump && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 10px 10px 17px",
                        height: "auto"
                      }}
                      className="productrow"
                    >
                      <div className="boldtext productrowtitle">
                        Rush & Ensure My Order
                      </div>
                      <div className="productrowsubheader min">$3.99</div>
                    </div>
                  )}
                  <div className="div-block-99">
                    <div 
                        onClick={(e) => setBump(!bump)}
                        className="div-block-100" 
                        style={{
                          cursor: "pointer"
                        }}>
                      <div
                        style={{
                          minWidth: "25px",
                          padding: "4px 0",
                          cursor: 'pointer'
                        }}
                      >
                        <Field
                          type="checkbox"
                          name="bump"
                          id="rush"
                          checked={bump}
                          values={bump.toString()}
                        />
                      </div>
                      <div className="listheadertext o">
                        <strong>
                          Yes! <em>{`Rush & Insure`}</em>
                          {` My Order for $3.99 `}
                        </strong>
                      </div>
                      <div>
                        <img
                          src="/images/arrow-flash-small.webp"
                          loading="lazy"
                          alt=""
                          style={{
                            marginLeft: "1rem",
                            WebkitTransform: "scaleX(-1)",
                            transform: "scaleX(-1)",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-block-6">
                        <strong>
                          Put me in the front of the shipping line & insure my
                          order: 
                        </strong>
                        {` This will give your order priority in the fulfillment center
                  (There is a huge demand for these) as well as shipping
                  insurance that will cover 100% of your shipment in case of
                  loss or damaged packages, no questions asked!`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-block-7" 
                style={{
                  margin: '1rem 0'
                }}>
                <em className="italic-text">
                  {`By clicking "Enter Now" below, I certify that I am 18 years of age
            or older, and agree to the GoingBigly.com`}
                </em>
                <a
                  target="_blank"
                  href="https://goingbigly.com/pages/terms-of-service"
                  rel="noreferrer"
                >
                  <em>Terms and Conditions</em>
                </a>
                <em> for this purchase.</em>
              </div>
              {message && (
                <div className="div-block-97">
                  <p id="ERROR_TWO">{message}</p>
                </div>
              )}

              <button
                className="funnelbtn btntext"
                id="submit"
                disabled={isLoading || !stripe || !elements || isSubmitting}
                type="submit"
                style={{
                  fontFamily: "Fjalla"
                }}
              >
                {isLoading ? "Loading . . ." : "ENTER NOW"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default OrderForm;
