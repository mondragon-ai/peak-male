import React, { useEffect, useState } from "react";
import { imPoweredRequest } from "../lib/request";
import styles from "../../styles/Home.module.css";
import { useRouter } from 'next/router';
import AddressInput from "./CustomerInputs";
import Head from "next/head";
import CustomImage from "../global/Image";
import Image from "next/image";
import ProductRow from "../Product/Product";
import { PaymentElement } from "@stripe/react-stripe-js";

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
    handleSubmit: any
    status: any
    isLoading: any
    message: any
}

function OrderForm({
  handleSubmit,
  status,
  isLoading,
  message,
  setState, 
  state
}: OrderProps) {

  const [bump, setBump] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const router = useRouter();
  return (
    <div className={`${styles.formCard}`}>
      <div className={`${styles.col} ${styles.formContainer}`}>
          <form>
            {/* MAIN IMAGE */}
            <div className={`${styles.col}`}>
              <Image src={"/images/htl_form.jpg"} width={350} height={450} alt="" style={{borderRadius: "6px", width: "100%", height: "auto"}} />
              <h2>ORDER NOW - SUPPLIES ARE LIMITED</h2>
            </div>


            {/* Step #1 PRODUCTS - Title */}
            <div className={`${styles.selected} ${styles.row}`} style={{justifyContent: "space-between", padding: "0 0.5rem"}}>
              <h5>Item</h5>
              <h5>Amount</h5>
            </div>

            {/* Step #1 PRODUCTS LIST */}
            <div className={`${styles.col} ${styles.productContainer}`}>
              <ProductRow title={"3 Hold The Line Coins"} price={2991} piece={"$9.97/coin"} variant_id={"123"} product_id={""} options1={""} options2={""} options3={""} state={state} setState={setState} />
              <ProductRow title={"3 Hold The Line Coins"} price={4485} piece={"$9.97/coin"} variant_id={"234"} product_id={""} options1={""} options2={""} options3={""} state={state} setState={setState} />
              <ProductRow title={"3 Hold The Line Coins"} price={7970} piece={"$9.97/coin"} variant_id={"345"} product_id={""} options1={""} options2={""} options3={""} state={state} setState={setState} />
              <ProductRow title={"3 Hold The Line Coins"} price={13940} piece={"$9.97/coin"} variant_id={"456"} product_id={""} options1={""} options2={""} options3={""} best={true} state={state} setState={setState} />
            </div>

            {/* Step #2 Contact - Title */}
            <div className={`${styles.formTitle}`}>
              <h2 className="" style={{fontSize: "25px" }}><strong style={{color: "red"}}>STEP ONE:</strong>  CONTACT</h2>
            </div>

            {/* Step #2 Contact - Inputs */}
            <div className={`${styles.col}`}>
              <AddressInput label="First Name" name="customer.email" required />
              <AddressInput label="Email" name="customer.city" required />
            </div>

            {/* Step #3 Shipping - Title */}
            <div className={`${styles.formTitle}`}>
              <h2 className="" style={{fontSize: "25px" }}><strong style={{color: "red"}}>STEP TWO:</strong> SHIPPING</h2>
            </div>

            {/* Step #3 Shipping - Inputs */}
            <div className={`${styles.col}`}>
              <AddressInput label="Address Name" name="shipping.line1" required />
              <AddressInput label="City" name="shipping.city" required />
              <AddressInput label="State" name="shipping.state" required />
              <AddressInput label="Zip Code" name="shipping.zip" required />
            </div>

            {/* Step #4 PAYMENT - Title */}
            <div className={`${styles.formTitle}`}>
              <h2 className="" style={{fontSize: "25px" }}><strong style={{color: "red"}}>STEP THREE:</strong> PAYMENT INFORMATION</h2>
            </div>

            {/* Step #4 Billing - Card */}
            <div className="">
                <div id="payment-element">
                  {/* Stripe.js injects the Payment Element*/}
                  <PaymentElement
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
                        }, 
                      }}
                      />
                </div>
                <div className={`${styles.col}`}>
                  <Image src={"/images/credit-only.png"} alt={""} height={45}  width={350} style={{
                    width: "90%",
                    height: "auto",
                    marginTop: "1rem"
                  }} />
                </div>
            </div>

            {/* Items Selected */}
            <div className={`${styles.selected} ${styles.row}`} style={{justifyContent: "space-between"}}>
              <h5>Item</h5>
              <h5>Amount</h5>
            </div>

            {/* Items Selected  - Listed */}
            <div className={`${styles.selected}`} >
              <div style={{ display: "flex", height: "auto", justifyContent: "space-between"}} className="productrow">
                <p style={{ fontSize: "10px", color: "grey" }}>
                  Rush & Ensure My Order
                </p>
                <p style={{ fontSize: "10px", color: "grey" }}>
                  $3.99
                </p>
              </div>
              {bump && (
                <div style={{
                  justifyContent: "space-between",
                  display: "flex",
                  height: "auto"}}>
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
            </div>

            {/* Express Btn */}
            <div className={`${styles.col} ${styles.rushBox}`}>
              <div className={`${styles.rushHeader} ${styles.row}`} style={{padding: "1rem"}}>
                <div className={`${styles.rushHeader} ${styles.row}`}><Image src={"/images/arrow-flash-small.webp"} alt={""} width={30} height={15} /></div>
                <div className={`${styles.checkBoxProduct}`}  style={{padding: "0 1rem"}}>
                  <div><div></div></div>
                </div>
                <h4>Yes! Rush & Insure my Order for $3.99</h4>
              </div>

              <div className={`${styles.col}`}>
                <p className={`${styles.bumpText}`}>
                  <strong>
                  Put me in the front of the shipping line & insure my
                  order: 
                  </strong> 
                  This will give your order priority in the fulfillment center
                  (There is a huge demand for these) as well as shipping
                  insurance that will cover 100% of your shipment in case of
                  loss or damaged packages, no questions asked!
                </p>
              </div>
            </div>

            {/* Payment Button */}
            <button
              className={styles.payBtn}
              id="submit"
              // disabled={isLoading || !stripe || !elements || isSubmitting}
              type="submit"
              style={{
                fontFamily: "Fjalla"
              }}
            >
              {isLoading ? "Loading . . ." : "COMPLETE ORDER"}
            </button>

            {message && (
              <div className="div-block-97">
                <p id="ERROR_TWO">{message}</p>
              </div>
            )}

            {/* Additonal Info */}
            <div className={`${styles.row} ${styles.additonalFormInfo}`}>
              <div className={`${styles.col}`} style={{width: "25%"}}>
                <p>Availability</p>
                <p>Shipping</p>
                <p>Return</p>
                <p>Need Help?</p>
              </div>
              <div className={`${styles.col}`} style={{width: "75%"}}>
                <p style={{color: "green", fontWeight: 700}}>Limited Stock</p>
                <p><strong>FREE</strong> when you buy 5 or more</p>
                <p>30 Day Money Back Guarantee or replacement</p>
                <p>Contact us <a href="" style={{color: "red", textDecoration: "underline"}}>here?</a> </p>
              </div>
            </div>

            {/* Guarantee Pic */}
            <div className={`${styles.col} ${styles.legalFormInfo}`}>
              <Image src={"/images/png-google-trust.png"} alt={""} width={400} height={200} style={{height: "auto", width: "100%"}} />
            </div>

            {/* THank You Msg */}
            <div className={`${styles.col} ${styles.thankYouMsg}`}>
              <h2>THANK YOU FOR SUPPORTING A U.S. VETERAN OWNED & OPERATED BUSINESS 🇺🇸</h2>
              <h2>🔒 100% MONEY-BACK GUARANTEE</h2>
              <p>Not satisfied with your purchase? We'll arrange a return and full refund for you, no questions asked.</p>
            </div>

          </form>
      </div>
    </div>
  );
}

export default OrderForm;
