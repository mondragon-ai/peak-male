import React, { useState } from 'react';
import Image from "next/image"
import styles from '../../styles/Home.module.css';

interface TestimonialProps {
  windowWidth: number;
}

const TestimonialComponent: React.FC<TestimonialProps> = ({ windowWidth }) => {
  const [testimonial, setTestimonial] = useState<number>(1);

  // Slide Between Testimonials
  const changeTestimonial = (num: number) => {
    console.log(testimonial)
    if ((testimonial + num) > 3) {
      setTestimonial(1);
    } else if ((testimonial + num) < 1) {
      setTestimonial(3);
    } else {
      setTestimonial(testimonial + num);
    }
  };

  return (
    <div id="REVIEWS" className={`${styles.col} ${styles.sec3} ${styles.sec6}`} style={{ width: '100%' }}>
      <div className={styles.delcinedTestWrapper}>
        <h1
          style={{
            padding: windowWidth < 720 ? '3rem 0 0 0' : 0,
            color: 'black',
            fontWeight: 900,
            textAlign: 'center',
            fontSize: windowWidth < 720 ? '25px' : '50px',
            lineHeight: windowWidth < 720 ? '28px' : '56px',
          }}
        >
          Customer Testimonials <br />
          <span style={{ color: '#17378a' }}>Real People. Real Results.</span>
        </h1>
        <div className={`${styles.row} ${styles.testimonial} ${styles.mobileCol}`}>
          <div className={`${styles.col}`} style={{ width: windowWidth < 720 ? '100%' : '30%' }}>
            {testimonial === 1 ? (
              <Image
                src="https://hitsdesignclients.com/Peak-Male-new/images/t1.png"
                alt=""
                width={1200} height={800}
                style={{ width: windowWidth > 720 ? '23vw' : '100%', height: 'auto' }}
              />
            ) : testimonial === 2 ? (
              <Image
                src="https://hitsdesignclients.com/Peak-Male-new/images/t2.png"
                alt=""
                width={1200} height={800}
                style={{ width: windowWidth > 720 ? '23vw' : '100%', height: 'auto' }}
              />
            ) : testimonial === 3 ? (
              <Image
                src="https://hitsdesignclients.com/Peak-Male-new/images/t3.png"
                alt=""
                width={1200} height={800}
                style={{ width: windowWidth > 720 ? '23vw' : '100%', height: 'auto' }}
              />
            ) : null}
          </div>
          <div
            className={`${styles.col}`}
            style={{
              width: windowWidth < 720 ? '100%' : '70%',
              padding: '1rem',
              alignItems: 'flex-start',
              minHeight: windowWidth < 720 ? '200px' : '',
            }}
          >
            <Image
              src="https://hitsdesignclients.com/Peak-Male-new/images/sldrstars.png"
              alt=""
              width={1200} height={800}
              style={{ width: '150px', height: 'auto' }}
            />
            {testimonial === 1 ? (
              <>
                <h2 className={styles.sldrTxt1}>Confidence Boost</h2>
                  <p className={styles.sldrTxt2}>
                    Before I found Peak Male, I was just an average Joe, struggling with low energy and lackluster workouts. I tried other supplements, but nothing really stuck. That all changed when a buddy recommended Peak Male. Within days, I felt an energy boost, and by the third week, my workouts were next level. But what really surprised me was the boost in confidence. Being physically stronger has made me mentally stronger. Long story short, Peak Male turned my life around. If you're feeling stuck, give it a try - it's a total game-changer.
                  </p>
              </>
            ) : testimonial === 2 ? (
              <>
                <h2 className={styles.sldrTxt1}>Game Changer</h2>
                  <p className={styles.sldrTxt2}>
                    Peak Male has been a game-changer for me! As a 43 year old MALE, I was struggling with low energy, decreased muscle mass, and a lack of motivation. However, since incorporating Peak Male into my daily routine, I've experienced a remarkable boost in my overall vitality, stamina, and mental focus. Not only has it enhanced my physical performance, but it has also positively impacted my confidence and overall well-being. I highly recommend Peak Male to any man looking to optimize their health and reclaim their peak performance.
                  </p>
              </>
            ) : testimonial === 3 ? (
              <>
                <h2 className={styles.sldrTxt1}>The Kickstart I Needed</h2>
                  <p className={styles.sldrTxt2}>
                    I just turned 33, and I wasn't expecting to feel as drained as I did. I was in a workout slump, and none of the supplements I tried gave me that boost I needed. Then came Peak Male. It kicked in fast, and suddenly, I was breezing through workdays and crushing it at the gym. The big surprise was the mental uplift - I felt unstoppable. If you're feeling stuck, give Peak Male a try - it's been a total game-changer for me.
                  </p>
              </>
            ) : null}
            <div className={`${styles.col}`} style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <div className={`${styles.col}`}>
                <div className={`${styles.row}`} style={{ width: '50%', display: windowWidth < 720 ? 'none' : '', position: 'absolute', bottom: 100, right: '250px', paddingLeft: '2rem' }}>
                  <Image src="https://hitsdesignclients.com/Peak-Male-new/images/sldrqt.png" width={1200} height={800} alt="" style={{ width: '70px', height: 'auto' }} />
                  <Image src="https://hitsdesignclients.com/Peak-Male-new/images/sldrbtl.png" width={1200} height={800} alt="" style={{ width: '70px', height: 'auto', position: 'absolute', right: '40px', bottom: '-30px' }} />
                </div>
                <p className={styles.sldrnm}>{testimonial === 1 ? 'Jordan L.' : testimonial === 2 ? 'Martin H.' : testimonial === 3 ? 'Jimmy B.' : ''}</p>
              </div>
            </div>
          </div>
          <button onClick={() => changeTestimonial(1)} className={styles.slickPrev}></button>
          <button onClick={() => changeTestimonial(-1)} className={styles.slickNext}></button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialComponent;
