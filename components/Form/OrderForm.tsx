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
import styles from "../../styles/Home.module.css";

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

import { useRouter } from 'next/router';
import AddressInput from "./AddressInput";
import Head from "next/head";
import CustomImage from "../global/Image";
import Image from "next/image";
import { Products } from "../Product/Product";

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

  const createPayment = async (
      token: string,
  ) => {
        const body = {
          line_items: [{
              title: "Gold Entries ($150 Value) (BEST DEAL!!)",
              price_str: "$5.00 / pc",
              price: 5000,
              piece: "$150 value in products",
              options1: "Gold Entries ($150 Value)",
              options2: "M",
              options3: "",
              product_id: "42235974189228",
              high_risk: false,
          }],
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
      };

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
  return (
    <div className={`${styles.formCard}`}>
      <div className={`${styles.col} ${styles.formContainer}`}>
        <Formik initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting, values }) => (
            <Form>

              {/* MAIN IMAGE */}
              <div className={`${styles.col}`}>
                <Image src={"/images/htl_form.jpg"} width={350} height={450} alt="" style={{borderRadius: "6px", width: "100%", height: "auto"}} />
                <h2>ORDER NOW - SUPPLIES ARE LIMITED</h2>
              </div>


              {/* PRODUCTS - Title */}
              <div className={`${styles.row}`} style={{justifyContent: "space-between", padding: "1rem 0"}}>
                  <p>Select Your Discount</p>
                  <p>Price</p>
              </div>

              {/* PRODUCT LIST */}
              <div className={`${styles.col}`}>
                <Products />
              </div>


              {/* Step #1 Contact - Title */}
              <div className=""  style={{padding: "30px 0" }}>
                <div className="" style={{fontSize: "15px" }}>STEP ONE: CONTACT</div>
              </div>

              {/* PRODUCTS */}
              <div className={`${styles.col}`}>
                <AddressInput label="Address Name" name="shipping.line1" required />
                <AddressInput label="City" name="shipping.city" required />
                <AddressInput label="State" name="shipping.state" required />
                <AddressInput label="Zip Code" name="shipping.zip" required />
              </div>

              <div className={`${styles.col}`}>
                  <div className="" style={{fontSize: "15px" }}>PAYMENT INFORMATION</div>
              </div>

              <div id="">
                <div className="">
                    <div id="payment-element">
                      {/*Stripe.js injects the Payment Element*/}
                      {/* <PaymentElement
                        id="payment-element"
                        options={{
                          wallets: {
                            googlePay: "never"
                          },
                          layout: {
                            type: "accordion",
                            defaultCollapsed: true
                          },
                          terms: {
                            card: "never"
                          }
                        }}
                        /> */}
                    </div>
                </div>

                <div className="">
                  <div className="">
                    <div className="">Item</div>
                    <div className="">Amount</div>
                  </div>
                  <div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 10px 0px 17px",
                        height: "auto"
                      }}
                      className="productrow"
                    >
                      <div className="boldtext productrowtitle">
                        {/* <p style={{ lineHeight: "15px", fontSize: "15px", color: "grey" }}>{values.product?.title}</p> */}
                        <p style={{ fontSize: "10px", color: "grey" }}>{values.product?.title}</p>
                      </div>
                      <div className="boldtext productrowtitle">
                        <p style={{ fontSize: "10px", color: "grey" }}>
                          {"$" + Number(values.product?.price_num/100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    {bump && (
                      <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0px 10px 0px 17px",
                          height: "auto"}}
                          className="productrow">
                        <div className={``}>
                          <p style={{ fontSize: "10px", color: "grey" }}>
                            Rush & Ensure My Order
                          </p>
                        </div>
                        <div className={``}>
                          <p style={{ fontSize: "10px", color: "grey" }}>
                            $3.99
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="">
                      <div onClick={(e) => setBump(!bump)}
                          className="" 
                          style={{
                            cursor: "pointer"
                          }}>
                        <div style={{
                            minWidth: "25px",
                            padding: "4px 0",
                            cursor: 'pointer'
                          }}>
                          <Field
                            type="checkbox"
                            name="bump"
                            id="rush"
                            checked={bump}
                            values={bump}
                          />
                        </div>
                        <div className={``}></div>
                      </div>
                      <div>
                        <div className="">
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
                <div className="" 
                  style={{
                    margin: '1rem 0'
                  }}>
                  <em className="italic-text">
                    By clicking "Enter Now" below, I certify that I am 18 years of age
                    or older, and agree to the GoingBigly.com
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
    </div>
  );
}

export default OrderForm;
