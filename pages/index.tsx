import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import Brand from "@/components/Brand";
import { useContext, useState } from "react";
import Pricing from "@/components/Pricing";
import Testimonial from "@/components/TestimonialItem";
// import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import { Rate } from "antd";
import Testimonials from "@/components/Testimonials";
import OrderFormContainer  from "@/components/Form/FormSection";
import { Context } from "../context/context";


export default function Home() {
  const [viewItem, setViewItem] = useState(0);
  // const globalState: any | { clientSecret: string} = useContext(Context);
  // const { clientSecret } = globalState;
  const [windowWidth, setWindowWidth] = useState(0);

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

  console.log(state)

  return (
    <>
      <main className={styles.main}>
        <Header />
        <HeroBanner />
        <div className={styles.brands}>
          <Brand
            src="/images/brand-1.png"
            text="All Products are grown, processed and shipped in the USA"
          />
          <Brand
            src="/images/brand-2.png"
            text="Our CBD Products are Hemp-Derived and contain <0.3% Delta-9 THC."
          />
          <Brand
            src="/images/brand-3.png"
            text="All Products from blazed hemp come with a Risk-Free
            100% Money-Back Guarantee"
          />
          <Brand
            src="/images/brand-4.png"
            text="Premium Ingredients make premium tasting flavors
            with no bad aftertaste."
          />
        </div>
        <div className={styles.emotions}></div>
        <div className={styles.line}></div>
        <div>
          <Pricing state={state} setState={setState} />
        </div>
        <div>
          <OrderFormContainer state={state} setState={setState} />
        </div>
        {/* <div className={styles.testimonials}>
          <h3>What Our Customers Say</h3>
          <div className={styles.testimonialsCounts}>
            <div>Real Reviews from Real Costumers</div>
            <div>
              <Rate
                allowHalf
                disabled
                defaultValue={5}
                style={{ color: "#FFA41C" }}
              />{" "}
              {"1246 Reviews "} <FaLessThan />
              <FaGreaterThan />
            </div>
          </div>
          <div>
            <div className={styles.lessThan}>
              {" "}
              <FaLessThan />
            </div>
            <div className={styles.testimonialList}>
              <Testimonial
                src="/images/package-1.png"
                author="sammy"
                title="Quality CBD and fast shipping"
                rating={5}
                description="These are my husband’s favorite.  He likes the flavor.  They do have sugar all over them."
              />
              <Testimonial
                src="/images/package-1.png"
                author="sammy"
                title="Quality CBD and fast shipping"
                rating={5}
                description="These are my husband’s favorite.  He likes the flavor.  They do have sugar all over them."
              />
            </div>
            <div className={styles.greaterThan}>
              <FaGreaterThan />
            </div>
          </div>
        </div> */}
        <Testimonials />
        <div className={styles.faqSection}>
          <h3>CBD GUMMIES FAQS</h3>
          <div className={styles.faqList}>
            <div className={styles.faqHeader} onClick={() => setViewItem(0)}>
              <div className={styles.faqLeft}>
                <Image
                  src="/icons/question.svg"
                  height={35}
                  width={31}
                  alt=""
                />
                <h3>What are CBD Gummies?</h3>
              </div>
              <h3>
                <ImPlus />
              </h3>
            </div>
            {/* <div
              className={viewItem === 0 ? styles.display : styles.displayActive}
            >
              {`Our new giveaway promotion is LIVE...we giving away a
                2022 Ram 2500 CUMMINS DIESEL 4x4 + $10,000 CASH! With
                each purchase, you are automatically entered into our
                giveaway to WIN! Every $1 you spend gets you 1 entry
                into the giveaway...it's that easy!`}
            </div> */}
          </div>
          <div className={styles.faqList}>
            <div className={styles.faqHeader} onClick={() => setViewItem(0)}>
              <div className={styles.faqLeft}>
                <Image
                  src="/icons/teloscope.svg"
                  height={35}
                  width={31}
                  alt=""
                />
                <h3>What are the benefits of CBD?</h3>
              </div>
              <h3>
                <ImPlus />
              </h3>
            </div>
            {/* <div
              className={viewItem === 0 ? styles.display : styles.displayActive}
            >
              {`Our new giveaway promotion is LIVE...we giving away a
                2022 Ram 2500 CUMMINS DIESEL 4x4 + $10,000 CASH! With
                each purchase, you are automatically entered into our
                giveaway to WIN! Every $1 you spend gets you 1 entry
                into the giveaway...it's that easy!`}
            </div> */}
          </div>
          <div className={styles.faqList}>
            <div className={styles.faqHeader} onClick={() => setViewItem(0)}>
              <div className={styles.faqLeft}>
                <Image src="/icons/smilie.svg" height={35} width={31} alt="" />
                <h3>How does CBD Gummies make me feel?</h3>
              </div>
              <h3>
                <ImPlus />
              </h3>
            </div>
            {/* <div
              className={viewItem === 0 ? styles.display : styles.displayActive}
            >
              {`Our new giveaway promotion is LIVE...we giving away a
                2022 Ram 2500 CUMMINS DIESEL 4x4 + $10,000 CASH! With
                each purchase, you are automatically entered into our
                giveaway to WIN! Every $1 you spend gets you 1 entry
                into the giveaway...it's that easy!`}
            </div> */}
          </div>
          <div className={styles.faqList}>
            <div className={styles.faqHeader} onClick={() => setViewItem(0)}>
              <div className={styles.faqLeft}>
                <Image src="/icons/justice.svg" height={35} width={31} alt="" />
                <h3>Are CBD Gummies legal?</h3>
              </div>
              <h3>
                <ImPlus />
              </h3>
            </div>
            {/* <div
              className={viewItem === 0 ? styles.display : styles.displayActive}
            >
              {`Our new giveaway promotion is LIVE...we giving away a
                2022 Ram 2500 CUMMINS DIESEL 4x4 + $10,000 CASH! With
                each purchase, you are automatically entered into our
                giveaway to WIN! Every $1 you spend gets you 1 entry
                into the giveaway...it's that easy!`}
            </div> */}
          </div>
          <div className={styles.faqList}>
            <div className={styles.faqHeader} onClick={() => setViewItem(0)}>
              <div className={styles.faqLeft}>
                <Image src="/icons/person.svg" height={35} width={31} alt="" />
                <h3>Are there any CBD Gummie side effects?</h3>
              </div>
              <h3>
                <ImPlus />
              </h3>
            </div>
            {/* <div
              className={viewItem === 0 ? styles.display : styles.displayActive}
            >
              {`Our new giveaway promotion is LIVE...we giving away a
                2022 Ram 2500 CUMMINS DIESEL 4x4 + $10,000 CASH! With
                each purchase, you are automatically entered into our
                giveaway to WIN! Every $1 you spend gets you 1 entry
                into the giveaway...it's that easy!`}
            </div> */}
          </div>
          <div className={styles.btnContainer}>
            <Button text="CLAIM YOUR FREE SAMPLE" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
