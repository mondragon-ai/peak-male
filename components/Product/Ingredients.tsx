import React from 'react';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

interface IngredientsSectionProps {
  windowWidth: number;
  handleScroll: (sectionId: string) => void;
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({ windowWidth, handleScroll }) => {
  return (
    <div id="INGREDIENTS" className={`${styles.col} ${styles.sec3}`} style={{ width: '100%', padding: '4rem 0 4rem 0' }}>
        <div className={styles.delcinedTestWrapper} style={{width: windowWidth < 720 ? "90%" :"60%"}}>
            <h1 style={{color: "black", fontWeight: "900", textAlign: "center", fontSize:  windowWidth < 720 ? "30px" : "50px", lineHeight: windowWidth < 720 ? "36px" : "56px"}}>
              The Science behind Peak Male <br />
              <span style={{color: "#17378a"}}>Xtreme Test Booster</span>
            </h1>
            <p style={{color: "black", marginTop: "19px", textAlign: "center", fontSize: "18px", lineHeight: "26px"}}>
              Our unique blend of 6 powerful herbs work together to support healthy testosterone levels, improve muscle mass 
              and athletic performance, and promote overall male health and vitality
            </p>

            <div className={`${styles.col}`}>
              <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: "2rem 0 0 0", alignItems: windowWidth <720 ? "center" : "flex-start", width: "100%"}}>
                  {windowWidth < 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%",
                    paddingBottom: "2rem"
                  }}>Fenugreek</h5> : null}
                <div className={styles.col} style={{width: windowWidth < 720 ? "95%" : "40%", height: windowWidth < 720 ? "200px" : "", margin: "auto"}}>
                  <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img1.png"} height={5000}  width={5000} alt="" style={{
                      position: "relative",
                      bottom: 0,
                      top: 0,
                      width: windowWidth < 720 ? "300px" : "400px",
                      height: "auto"
                    }}  />
                </div>
                <div className={`${styles.col}`} style={{width: windowWidth < 720 ? "95%" :"60%"}}>
                  {windowWidth > 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%"
                  }}>Fenugreek</h5> : null}
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`} style={{padding: "1rem 0 0 0"}}>
                    <li>Regulates the conversion of testosterone to DHT, providing a natural solution for excessive 
                      DHT levels in men, resulting in an increase in testosterone levels.</li>
                      
                      <li>Contains a compounds called fenusides, which have been found to stimulate the production of 
                      luteinizing hormone (LH), which is responsible for signaling the testes to produce testosterone.</li>
                      
                      <li>Supports overall hormonal balance, prostate health, hair loss, and skin health in&nbsp;men.</li>
                      
                      <li>Also contains compounds called saponins, which have been shown to inhibit the activity of 
                      the enzyme aromatase. Aromatase is responsible for converting testosterone into estrogen, so by 
                      inhibiting its activity, Fenugreek can help reduce the conversion of testosterone to estrogen and 
                      increase the amount of free testosterone in the&nbsp;body.</li>
                  </ul>
                </div>
            </div>

            <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: windowWidth <720 ? "0" : "2rem 0 0 0", alignItems: windowWidth <720 ? "center" : "flex-start", width: "100%", flexDirection: windowWidth <720 ? "column" : "row-reverse"}}>
                  {windowWidth < 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%",
                    paddingBottom: "2rem"
                  }}>Maca Powder</h5> : null}
                  <div className={styles.col} style={{width: windowWidth < 720 ? "95%" : "40%",height: windowWidth < 720 ? "200px" : "", margin: "auto"}}>
                    <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img2.png"} height={5000}  width={5000} alt="" style={{
                        position: "relative",
                        bottom: 0,
                        top: 0,
                        width: windowWidth < 720 ? "300px" : "400px",
                        height: "auto"
                      }}  />
                  </div>
                <div className={`${styles.col}`} style={{width: windowWidth < 720 ? "95%" : "60%"}}>
                  {windowWidth > 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%"
                  }}>Maca Powder</h5> : null}
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`} style={{padding: "1rem 0 0 0"}}>
                    <li>Maca has been shown to reduce cortisol levels in men who are experiencing chronic stress, resulting in improved testosterone levels and overall well being.</li>
                      
                    <li>Promotes the production of luteinizing hormone (LH), which is responsible for stimulating the testes to produce testosterone in males.</li>
                    
                    <li>Maca powder contains compounds that can help reduce the activity of the enzyme aromatase, which is responsible for converting testosterone into estrogen. One study found that Maca supplementation led to a significant reduction in aromatase activity in men.</li>
                  </ul>
                </div>
            </div>

            <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: "2rem 0 0 0", alignItems: windowWidth <720 ? "center" : "flex-start", width: "100%"}}>
                  {windowWidth < 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%",
                    paddingBottom: "2rem"
                  }}>Tongkat Ali</h5> : null}
                <div className={styles.col} style={{width: windowWidth < 720 ? "95%" : "40%", height: windowWidth < 720 ? "200px" : "", margin: "auto"}}>
                  <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img3.png"} height={5000}  width={5000} alt="" style={{
                      position: "relative",
                      bottom: 0,
                      top: 0,
                      width: windowWidth < 720 ? "300px" : "400px",
                      height: "auto"
                    }}  />
                </div>
                <div className={`${styles.col}`} style={{width: windowWidth < 720 ? "95%" : "60%"}}>
                  {windowWidth > 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%"
                  }}>Tongkat Ali</h5> : null}
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`} style={{padding: "1rem 0 0 0"}}>
                    <li>Tongkat Ali has been shown to reduce the production of cortisol, which is a stress hormone that can negatively impact testosterone production.</li>
                      
                    <li>Contains a compound called eurycomanone, that helps to stimulate the production of luteinizing hormone (LH), which is responsible for signaling the testes to produce testosterone in males.</li>
                    
                    <li>Tongkat Ali has also been shown to reduce levels of sex hormone binding globulin (SHBG), which is a protein that binds to testosterone and prevents it from being used by the body. By reducing SHBG levels, Tongkat Ali can increase the amount of free testosterone in the body, leading to improved muscle mass, athletic performance, and sexual function.</li>
                  </ul>
                </div>
            </div>

            <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: windowWidth <720 ? "0" : "2rem 0 0 0", alignItems: windowWidth <720 ? "center" : "flex-start", width: "100%", flexDirection: windowWidth <720 ? "column" : "row-reverse"}}>
                  {windowWidth < 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%",
                    paddingBottom: "2rem"
                  }}>Panax Ginseng</h5> : null}
                  <div className={styles.col} style={{width: windowWidth < 720 ? "95%" : "40%", height: windowWidth < 720 ? "200px" : "", margin: "auto"}}>
                    <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img4.png"} height={5000}  width={5000} alt="" style={{
                        position: "relative",
                        bottom: 0,
                        top: 0,
                        width: windowWidth < 720 ? "300px" : "400px",
                        height: "auto"
                      }}  />
                  </div>
                <div className={`${styles.col}`} style={{width: windowWidth < 720 ? "95%" : "60%"}}>
                  {windowWidth > 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%"
                  }}>Panax Ginseng</h5> : null}
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`} style={{padding: "1rem 0 0 0"}}>
                    <li>Contains a compound called ginsenoside, which has been found to stimulate the production of luteinizing hormone (LH), which is responsible for signaling the testes to produce testosterone.</li>
                    
                    <li>Panax Ginseng has been shown to have adaptogenic properties, meaning it can help the body adapt to and cope with stress.</li>
                    
                    <li>Has been shown to have anti-inflammatory and antioxidant properties, which can help protect the body against oxidative stress and reduce inflammation throughout the body.</li>
                  </ul>
                </div>
            </div>

            <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: "2rem 0 0 0", alignItems: windowWidth <720 ? "center" : "flex-start", width: "100%"}}>
                  {windowWidth < 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%",
                    paddingBottom: "2rem"
                  }}>Horny Goat Weed</h5> : null}
                <div className={styles.col} style={{width: windowWidth < 720 ? "95%" : "40%", height: windowWidth < 720 ? "200px" : "", margin: "auto"}}>
                  <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img5.png"} height={800}  width={1200} alt="" style={{
                      position: "relative",
                      bottom: 0,
                      top: 0,
                      width: windowWidth < 720 ? "300px" : "400px",
                      height: "auto"
                    }}  />
                </div>
                <div className={`${styles.col}`} style={{width: windowWidth < 720 ? "95%" :  "60%"}}>
                  {windowWidth > 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%"
                  }}>Horny Goat Weed</h5> : null}
                  <ul className={`${styles.s5bxlist} ${styles.bdfont}`} style={{padding: "1rem 0 0 0"}}>
                    <li>Contains a compound called icariin, has been found to inhibit the activity of the enzyme that converts testosterone into estrogen, leading to higher levels of free testosterone in the body.</li>
                    
                    <li>Horny Goat Weed has been shown to have vasodilatory effects, meaning it can help improve blood flow throughout the body. This can have a positive impact on athletic performance and sexual function, as it can increase the amount of oxygen and nutrients that reach the muscles and sexual organs.</li>
                  </ul>
                </div>
            </div>

            <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: windowWidth <720 ? "0" : "2rem 0 0 0", alignItems: windowWidth <720 ? "center" : "flex-start", width: "100%", flexDirection: windowWidth <720 ? "column" : "row-reverse"}}>
                {windowWidth < 720 ? <h5 style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    lineHeight: "44px",
                    color: "#17378a",
                    textAlign: windowWidth < 720 ? "center" : "left",
                    width: "100%",
                    paddingBottom: "2rem"
                }}>Tribulus Terrestris</h5> : null}
                <div className={styles.col} style={{width: windowWidth < 720 ? "95%" : "40%", height: windowWidth < 720 ? "200px" : "", margin: "auto"}}>
                    <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s5img6.png"} height={5000}  width={5000} alt="" style={{
                        position: "relative",
                        bottom: 0,
                        top: 0,
                        width: windowWidth < 720 ? "300px" : "400px",
                        height: "auto"
                    }}  />
                </div>
                <div className={`${styles.col}`} style={{width: windowWidth < 720 ? "95%" : "60%"}}>
                    {windowWidth > 720 ? <h5 style={{
                        fontWeight: "bold",
                        fontSize: "36px",
                        lineHeight: "44px",
                        color: "#17378a",
                        textAlign: windowWidth < 720 ? "center" : "left",
                        width: "100%"
                    }}>Tribulus Terrestris</h5> : null}
                    <ul className={`${styles.s5bxlist} ${styles.bdfont}`} style={{padding: "1rem 0"}}>
                        <li>Contains a compound called protodioscin, that helps to stimulate the production of luteinizing hormone (LH), which is responsible for signaling the testes to produce testosterone in males.</li>
                        
                        <li>Has been shown to reduce SHBG levels, Tribulus Terrestris can increase the amount of free testosterone in the body, leading to improved muscle mass, athletic performance, and sexual function.</li>
                    </ul>
                </div>
              </div>

              {windowWidth > 720 ? <p className={styles.promise} style={{color: "#002560"}}>Peak Male Promise</p> :
              <p className={`${styles.chooosePackage}`} id="order" style={{color: "#002560"}}>Peak Male Promise</p>}
              
              <ul className={styles.s5list} >
                <li>
                    <Image  height={5000}  width={5000} alt="" src="https://hitsdesignclients.com/Peak-Male-new/images/s5icon1.png" style={{width: "100px", height: "auto"}} />
                      <p>Non-GMO</p>
                  </li>
                  <li>
                    <Image  height={5000}  width={5000} alt="" src="https://hitsdesignclients.com/Peak-Male-new/images/s5icon2.png" style={{width: "100px", height: "auto"}}  />
                      <p>All Natural<br />Ingredients</p>
                  </li>
                  <li>
                    <Image  height={5000}  width={5000} alt="" src="https://hitsdesignclients.com/Peak-Male-new/images/s5icon3.png" style={{width: "100px", height: "auto"}}  />
                      <p>Fast<br />Shipping</p>
                  </li>
                  <li>
                    <Image  height={5000}  width={5000} alt="" src="https://hitsdesignclients.com/Peak-Male-new/images/s5icon4.png" style={{width: "100px", height: "auto"}}  />
                      <p>Secure<br />Shopping</p>
                  </li>
                  <li>
                    <Image  height={5000}  width={5000} alt="" src="https://hitsdesignclients.com/Peak-Male-new/images/s5icon5.png" style={{width: "100px", height: "auto"}}  />
                      <p>Satisfaction<br />Guaranteed</p>
                  </li>
            </ul>

            {windowWidth > 720 ? <>
                <div onClick={() => handleScroll("SELECT_PRODUCT")} className={styles.s3btn} style={{width: windowWidth <720 ? "100%" : "50%"}}>
                Order Now
                </div>
                <div className={`${styles.row} ${styles.btnTxt}`} style={{width:  windowWidth <720 ? "100%" : "50%", color: "black"}}>
                  <p className={styles.btnTxt1} style={{color: "black"}}>Ships: Within 24 Hours</p> 
                  |
                  <p className={styles.btnTxt} style={{color: "black"}}>
                    <Image src="https://hitsdesignclients.com/Peak-Male-new/images/shape.png" height={50}  width={50} alt="" className={styles.hourglass} style={{width: "10px", height: "auto"}} /> 
                    Stock: 58 Bottles Remaining
                  </p>
                </div>
              </> : null}
            </div>
        </div>
    </div>
  );
};

export default IngredientsSection;
