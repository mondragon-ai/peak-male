import React from 'react';
import Image from 'next/image'; 
import styles from '../../styles/Home.module.css'; 
import checkout_styles from '../../styles/Checkout.module.css'; 

const CustomerReviews: React.FC = () => {
  return (
    <>
      <div className={`${checkout_styles.reviewBox}`}>
        <div className={checkout_styles.rgtLabel}>
          <span>trusted customer reviews</span>
        </div>
      </div>

      <div
        className={`${checkout_styles.chooseBox} ${styles.col}`}
        style={{ width: '100%', marginTop: '10px' }}
      >
        <div className={styles.col} style={{ width: '100%' }}>
          <div className={checkout_styles.s6MidCol}>
            <p className={checkout_styles.s6TestiHead}>The Kickstart I Needed</p>
            <Image
              src="https://hitsdesignclients.com/Peak-Male-new/images/s6-testi-star.png"
              alt=""
              width={500}
              height={500}
              style={{ height: 'auto', width: '100px' }}
              className={checkout_styles.s6TestiStar}
            />
            <p className={checkout_styles.s6Para}>
              I just turned 33, and I wasn't expecting to feel as drained as I did. I was in a
              workout slump, and none of the supplements I tried gave me that boost I needed. Then
              came Peak Male. It kicked in fast, and suddenly, I was breezing through workdays and
              crushing it at the gym. The big surprise was the mental uplift - I felt unstoppable.
              If you're feeling stuck, give Peak Male a try - it's been a total game-changer for me.
            </p>
            <p className={checkout_styles.s6TestiNm}>
              Jimmy B.
              <span>
                <Image
                  src="https://hitsdesignclients.com/Peak-Male-new/images/t-tk.png"
                  alt=""
                  width={500}
                  height={500}
                  style={{ height: 'auto', width: '15px' }}
                  className={checkout_styles.s6TestiStar}
                />
                Verified Customer
              </span>
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${checkout_styles.chooseBox} ${styles.col}`}
        style={{ width: '100%', marginTop: '10px' }}
      >
        <div className={styles.col} style={{ width: '100%' }}>
          <div className={checkout_styles.s6MidCol}>
            <p className={checkout_styles.s6TestiHead}>The Kickstart I Needed</p>
            <Image
              src="https://hitsdesignclients.com/Peak-Male-new/images/s6-testi-star.png"
              alt=""
              width={500}
              height={500}
              style={{ height: 'auto', width: '100px' }}
              className={checkout_styles.s6TestiStar}
            />
            <p className={checkout_styles.s6Para}>
              I just turned 33, and I wasn't expecting to feel as drained as I did. I was in a
              workout slump, and none of the supplements I tried gave me that boost I needed. Then
              came Peak Male. It kicked in fast, and suddenly, I was breezing through workdays and
              crushing it at the gym. The big surprise was the mental uplift - I felt unstoppable.
              If you're feeling stuck, give Peak Male a try - it's been a total game-changer for me.
            </p>
            <p className={checkout_styles.s6TestiNm}>
              Jimmy B.
              <span>
                <Image
                  src="https://hitsdesignclients.com/Peak-Male-new/images/t-tk.png"
                  alt=""
                  width={500}
                  height={500}
                  style={{ height: 'auto', width: '15px' }}
                  className={checkout_styles.s6TestiStar}
                />
                Verified Customer
              </span>
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${checkout_styles.chooseBox} ${styles.col}`}
        style={{ width: '100%', marginTop: '50px' }}
      >
        <div className={checkout_styles.rgtLabel}>
          <span>Why Choose Us</span>
        </div>
        <div className={checkout_styles.chooseCol}>
          <Image
            src="https://hitsdesignclients.com/Peak-Male-new/images/choose-ic1.png"
            alt=""
            width={500}
            height={500}
            style={{ height: 'auto', width: '50px' }}
            className={checkout_styles.s6TestiStar}
          />
          <span>30-Day Satisfaction Guarantee</span>
          <p>If you're not satisfied with your product(s), we'll make it right! We promise.</p>
        </div>
        <div className={checkout_styles.chooseCol}>
          <Image
            src="https://hitsdesignclients.com/Peak-Male-new/images/choose-ic2.png"
            alt=""
            width={500}
            height={500}
            style={{ height: 'auto', width: '50px' }}
            className={checkout_styles.s6TestiStar}
          />
          <span>Over 7582+ successfully shipped orders</span>
          <p>Happy customers, end to end tracking and reliable customer service.</p>
        </div>
        <div className={checkout_styles.chooseCol}>
          <Image
            src="https://hitsdesignclients.com/Peak-Male-new/images/choose-ic3.png"
            alt=""
            width={500}
            height={500}
            style={{ height: 'auto', width: '50px' }}
            className={checkout_styles.s6TestiStar}
          />
          <span>Your Privacy Is Important</span>
          <p>
            All information is encrypted and transmitted without risk using a Secure Socket Layer
            (SSL) protocol.
          </p>
        </div>
      </div>
    </>
  );
};

export default CustomerReviews;
