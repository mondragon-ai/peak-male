import React from 'react';
import Image from 'next/image';
import styles from  '../../styles/Home.module.css';

interface BenefitsProps {
  windowWidth: number;
  handleScroll: (key: string) => void
}

const BenefitsComponent: React.FC<BenefitsProps> = ({ windowWidth, handleScroll  }) => {

  return (
    <div id="BENEFITS" className={`${styles.col} ${styles.sec4}`} style={{ width: '100%', padding: windowWidth < 720 ? '2rem 0 1rem 0' : '4rem 0 4rem 0' }}>
        <div className={styles.delcinedTestWrapper} style={{ width: windowWidth < 720 ? '95%' : '70%' }}>
            <h3 className={styles.bdhding} style={{ color: 'white', textAlign: 'center' }}>
                Benefits Of Peak Male <br />
                <span>Xtreme Test Booster</span>
            </h3>
            <p className={styles.bdfont} style={{ color: 'white', textAlign: 'center', border: 'none', fontFamily: 'ApercuPro-Light' }}>
                Awaken your inner Alpha with our supercharged blend of 6 powerful herbs
            </p>
            <div className={`${styles.col}`} style={{ position: 'relative' }}>
                {windowWidth < 720 ? (
                    <Image
                    src="https://hitsdesignclients.com/Peak-Male-new/images/s4img.png"
                    height={5000}
                    width={5000}
                    alt=""
                    style={{ width: '300px', height: 'auto' }}
                    />
                ) : null}

                <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "100%", justifyContent: "space-between", padding: windowWidth < 720 ? "0rem 0" : "2rem 0"}}>
                    <div className={`${styles.row} ${styles.benefitItem}`} >
                        <div>
                            <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon1.png" height={500}  width={500} alt=""  style={{width: "100px", height: "auto"}} /> 
                        </div>
                        <div className={`${styles.col}`} style={{padding: "0 0 0 1rem"}}>
                            <h6>Boosts Testosterone Levels</h6>
                            <p>Testosterone is essential for building muscle, burning fat, and maximizing your potential in and out of the gym</p>
                        </div>
                    </div>
                    <div className={`${styles.row} ${styles.benefitItem}`} style={{flexDirection: windowWidth < 720 ? "row" : "row-reverse", borderTop: windowWidth > 720 ? "none" : "1px solid #303d60", borderBottom:  windowWidth > 720 ?  "none" : "1px solid #303d60", padding: windowWidth < 720 ? "1rem 0" : ""}}>
                        <div>
                            <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon2.png" height={500}  width={500} alt=""  style={{width: "100px", height: "auto"}} /> 
                        </div>
                        <div className={`${styles.col}`} style={{padding:  windowWidth < 720 ? "0 0 0 1rem" : "0 1rem 0 0rem"}}>
                            <h6 style={{textAlign: windowWidth < 720 ? "left" : "right"}}>Increases Libido & Sex Drive</h6>
                            <p style={{textAlign:  windowWidth < 720 ? "left" :"right"}}>Say goodbye to low libido and hello to a more satisfying sex life, for both you AND your partner(s)</p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "100%", justifyContent: "space-between",  borderTop: windowWidth < 720 ? "none" : "1px solid #303d60", borderBottom: windowWidth < 720 ?  "none" : "1px solid #303d60", padding: windowWidth < 720 ? "1rem 0" : "2rem 0"}}>
                    <div className={`${styles.row} ${styles.benefitItem}`} >
                        <div>
                            <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon3.png" height={500}  width={500} alt=""  style={{width: "100px", height: "auto"}} /> 
                        </div>
                        <div className={`${styles.col}`} style={{padding: "0 0 0 1rem"}}>
                            <h6>Supports Hormonal Balance</h6>
                            <p>Maintaining a natural hormonal balance is key to regulating your bodies natural testosterone levels and improving overall well-being.</p>
                        </div>
                    </div>
                    <div className={`${styles.row} ${styles.benefitItem}`} style={{flexDirection:  windowWidth < 720 ? "row" : "row-reverse", borderTop: windowWidth > 720 ? "none" : "1px solid #303d60", borderBottom:windowWidth < 720 ? "1px solid #303d60" : "none", padding: windowWidth < 720 ? "1rem 0" : ""}}>
                        <div>
                            <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon4.png" height={500}  width={500} alt=""  style={{width: "100px", height: "auto"}} /> 
                        </div>
                        <div className={`${styles.col}`} style={{padding: windowWidth < 720 ? "0 0 0 1rem" : "0 1rem 0 0rem"}}>
                            <h6 style={{textAlign: windowWidth < 720 ? "left" :"right"}}>Supercharges Male Performance</h6>
                            <p style={{textAlign: windowWidth < 720 ? "left" :"right"}}>Achieve peak physical and mental performance at home, at work, while out with friends, or in the gym.</p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.row} ${styles.mobileCol}`} style={{width: "100%", justifyContent: "space-between", padding: windowWidth < 720 ? "0rem 0" : "2rem 0"}}>
                    <div className={`${styles.row} ${styles.benefitItem}`} >
                        <div>
                            <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon5.png" height={500}  width={500} alt=""  style={{width: "100px", height: "auto"}} /> 
                        </div>
                        <div className={`${styles.col}`} style={{padding: "0 0 0 1rem"}}>
                            <h6>Ramps up Stamina & Energy</h6>
                            <p>Our unique blend of ingredients increases energy levels and works to build up your stamina, helping you stay focused and energized throughout the day.</p>
                        </div>
                    </div>
                    <div className={`${styles.row} ${styles.benefitItem}`} style={{flexDirection: windowWidth < 720 ? "row" : "row-reverse", borderTop: windowWidth > 720 ? "none" : "1px solid #303d60", borderBottom: "none", padding: windowWidth < 720 ? "1rem 0" : ""}}>
                        <div>
                            <Image src="https://hitsdesignclients.com/Peak-Male-new/images/s4icon6.png" height={500}  width={500} alt=""  style={{width: "100px", height: "auto"}} /> 
                        </div>
                        <div className={`${styles.col}`} style={{padding: windowWidth < 720 ? "0 0 0 1rem" : "0 1rem 0 0rem"}}>
                            <h6 style={{textAlign: windowWidth < 720 ? "left" :"right"}}>Increases Lean Muscle & Strength Gains</h6>
                            <p style={{textAlign: windowWidth < 720 ? "left" :"right"}}>Reach your fitness goals faster and more efficiently than ever before.</p>
                        </div>
                    </div>
                </div>    


                {windowWidth > 720 ?  <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s4img.png"} height={5000}  width={5000} alt="" style={{
                  position: "absolute",
                  bottom: 0,
                  top: 0,
                  width: "500px",
                  height: "auto"
                }}  /> : null}
          
                {windowWidth > 720 ? (
                    <>
                    <div onClick={() => handleScroll('SELECT_PRODUCT')} className={styles.s3btn} style={{ width: windowWidth < 720 ? '100%' : '50%' }}>
                        Order Now
                    </div>
                    <div className={`${styles.row} ${styles.btnTxt}`} style={{ width: windowWidth < 720 ? '100%' : '50%', color: 'white' }}>
                        <p className={styles.btnTxt1} style={{ color: 'white' }}>Ships: Within 24 Hours</p>
                        |
                        <p className={styles.btnTxt} style={{ color: 'white' }}>
                        <Image
                            src="https://hitsdesignclients.com/Peak-Male-new/images/shape.png"
                            height={50}
                            width={50}
                            alt=""
                            className={styles.hourglass}
                            style={{ width: '10px', height: 'auto' }}
                        />
                        Stock: 58 Bottles Remaining
                        </p>
                    </div>
                    </>
                ) : null}
            </div>
        </div>
    </div>
  );
};

export default BenefitsComponent;
