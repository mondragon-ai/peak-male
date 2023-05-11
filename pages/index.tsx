import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "@/components/Header";
import { useContext, useState } from "react";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import OrderFormContainer  from "@/components/Form/FormSection";
import { Context } from "../context/context";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Brand from "@/components/Brand";
import CustomImage from "@/components/global/Image";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

export default function Home() {
  const [viewItem, setViewItem] = useState(0);
  const globalState: any | { clientSecret: string} = useContext(Context);
  const { clientSecret } = globalState;
  const [windowWidth, setWindowWidth] = useState(0);

  const options = {
    clientSecret,
    appearance: { theme: "night" },
  };

  const [state, setState] = useState({
    product: {
      title: "Gold Entries ($150 Value) (BEST DEAL!!)",
      price_str: "$5.00 / pc",
      price_num: 5000,
      piece: "$150 value in products",
      options1: "Gold Entries ($150 Value)",
      options2: "M",
      product_id: "42235974189228"
    },
    shipping: {
      line1: "",
      state: "",
      city: "",
      zip: "",
    },
    bump: true,
    external: "SHOPIFY",
    high_risk: true
  });

  return (
    <>
      <main className={styles.main}>
        <Header />
        
        <div className={`${styles.row}`} style={{paddingTop: "2%", }}>

          <div className={`${styles.col}`} style={{width: "50%", alignItems: "flex-end"}}>
            <div className={`${styles.col}`}>
              <div className={`${styles.col}`}>
                <Brand text={"OUR MISSION: INSPIRE & UNITE AN ENTIRE GENERATION OF PATRIOTIC AMERICANS THROUGH COMMEMORATIVE SYMBOLS OF FREEDOM."} src={"/images/htl-logo-3-crop.png"} />
              </div>
              <div className={`${styles.col}`}>
                <CustomImage w={300} h={300} src={"/images/coin_front.png"} />
              </div>
              <div className={`${styles.col}`}>
                <CustomImage w={300} h={300} src={"/images/coin_back.png"} />
              </div>
            </div>
          </div>

          <div className={`${styles.col}`} style={{width: "50%", alignItems: "flex-start"}}>
            {!clientSecret ? (
              <Elements stripe={stripePromise} options={options as any}>
                <OrderFormContainer state={state} setState={setState} />
              </Elements>
            ) : (
              null
            )}
          </div>

        </div>
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
