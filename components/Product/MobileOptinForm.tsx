import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';


interface MobileOptinFormProps {
    setSub: any;
    isSubbed: any;
    productSelected: any;
    setProduct: any;
    navigateToCheckout: (product: string) => void;
    isLoading: boolean
}


const MobileOptinForm: React.FC<MobileOptinFormProps> = ({setSub, isSubbed, setProduct, productSelected, navigateToCheckout, isLoading}) => {

  return (
    
    <>
    <div className={`${styles.row}`} style={{width: "100%", justifyContent: "space-between", padding: "0 1rem"}}>
        <p style={{
        fontSize: "18px",
        lineHeight: "23px",
        color: "#252525",
        marginTop: "14px",
        textAlign: "left"}}>
        Awaken your inner Alpha with our powerful blend of 6 key ingredients clinically proven to 
        boost testosterone levels, increase energy, and support overall male vitality.
        </p>
    </div> 

    <p style={{
        width: "100%", 
        fontSize: "20px",
        lineHeight: "26px",
        color: "#252525",
        fontWeight: "bold",
        marginTop: "25px",
        textAlign: "left",
        padding: "0 1rem"}}>
        Helps With:
    </p>

    <div className={`${styles.row}`} style={{width: "100%", justifyContent: "flex-start", marginTop: "15px", padding: "0 1rem"}}>
        <ul className={`${styles.helpsWith}`}>
        <li>
            <img src={"https://hitsdesignclients.com/Peak-Male-new/images/help-icon1.png"} alt={""} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Libido
        </li>
        <li>
            <img src={"https://hitsdesignclients.com/Peak-Male-new/images/help-icon2.png"} alt={""} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Energy
        </li>
        <li>
            <img src={"https://hitsdesignclients.com/Peak-Male-new/images/help-icon3.png"} alt={""} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>T-Boost
        </li>
        <li>
            <img src={"https://hitsdesignclients.com/Peak-Male-new/images/help-icon4.png"} alt={""} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Cognition
        </li>
        </ul>
    </div>

    <div className={`${styles.row} ${styles.benefitbox} ${styles.mobileCol}`}>
        <div className={`${styles.col}`} style={{alignItems: "flex-start", marginBottom: "2rem"}}>
        <p><Image src={"https://hitsdesignclients.com/Peak-Male-new/images/benefit-icon.png"} alt={""} width={50} height={50} style={{height: "20px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Key Benefits:</p>
        <ul>
            <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet1.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
            Boosts free testosterone levels 
            </li>
            <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet1.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
            Ramps up stamina & energy levels 
            </li>
            <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet1.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
            Increases libido & sex drive 
            </li>
            <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet1.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
            Supercharges male performance 
            </li>
            <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet1.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
            Supports lean muscle gain & strength  
            </li>
        </ul>
        </div>
        <div className={`${styles.col} ${styles.keyIngredients}`}>
        <p style={{width: "100%"}}><Image src={"https://hitsdesignclients.com/Peak-Male-new/images/ingredient-icon.png"} alt={""} width={50} height={50} style={{height: "25px", width: "auto", verticalAlign: "middle", margin: "-2px 6px 0 0"}}/>Key Ingredients:</p>
        <div className={`${styles.row}`}>
            <ul>
            <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet2.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
            Fenugreek
            </li>
            <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet2.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
            Maca Powder
            </li>
            <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet2.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
            Tribulus Terrestris
            </li>
            </ul>
            <ul>
            <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet2.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
            Tongkat Ali
            </li>
            <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet2.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
            Panax Ginseng
            </li>
            <li style={{background:"url('https://hitsdesignclients.com/Peak-Male-new/images/bullet2.png') left 7px no-repeat", padding: "0 0 0 32px"}}>
            Horny Goat Weed
            </li>
            </ul>
        </div>
        </div>
    </div>

    <p id="SELECT_PRODUCT" className={`${styles.chooosePackage}`} >Choose Your Package</p>

    <div className={`${styles.row}`} style={{width: "95%", justifyContent: "center", margin: "0 auto"}}>
        <div onClick={() => setSub(false)} className={`${styles.subBtn}`} style={{color: !isSubbed ? "white" : "",background: !isSubbed ? "#17378a url('https://hitsdesignclients.com/Peak-Male-new/images/selected.png') 15px center no-repeat" : "#fff url('https://hitsdesignclients.com/Peak-Male-new/images/select.png') 15px center no-repeat", border: !isSubbed ? "1px solid #17378a" : ""}}>
        One Time <br />Purchase
        </div>
        <div onClick={() => setSub(true)} className={`${styles.subBtn}`} style={{color: isSubbed ? "white" : "", margin: 0, background: isSubbed ? "#17378a url('https://hitsdesignclients.com/Peak-Male-new/images/selected.png') 15px center no-repeat" : "#fff url('https://hitsdesignclients.com/Peak-Male-new/images/select.png') 15px center no-repeat", border: isSubbed ? "1px solid #17378a" : ""}}>
        Subscribe & <br /><span>Save 20%</span>
        </div>
    </div>

    <p className={styles.riskFreeTxt}>Try Risk-Free 30 Day Money Back Guarantee</p>

    <div className={`${styles.row}  ${styles.mobileCol}`} style={{width: "100%", justifyContent: "space-between", alignItems: "center", margin: '01rem 0 0 0', flexDirection: "column-reverse"}}>
        
        <div onClick={() => setProduct("ONE")} className={`${styles.col} ${styles.productItem}`} style={{background: productSelected == "ONE" ? "#e5ecfe" : "#fff", border: productSelected == "ONE" ? "2px solid #17378a" : ""}} >
        <h5 className={styles.pkghding}>1 Bottle</h5>
        <div className={`${styles.row}`} style={{marginTop: "0px",width: "100%"}}>
            <div  className={`${styles.row}`} style={{width: "50%", justifyContent: "center", alignItems: "center", height: "100%", minHeight: "150px"}}>
            <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/pkg3.png"} alt={""} width={100} height={50} style={{height: "auto", width: "100%"}}  />
            </div>
            <div className={`${styles.col}`} style={{width: "50%"}}>
            <h6 className={styles.supplyText}>30 Day Supply</h6>
            <p className={styles.pkgprc2}>
                <span className={styles.BigPrice}>{isSubbed ? "$59" : "$69"}</span>
                <span className={styles.PriceUnit}>/per bottle</span>
            </p>
            
            <div className={`${styles.col}`}  style={{width: "100%"}}>
                <p className={styles.pkgtxt1}>You Save $30</p>
                <p className={styles.pkgprc1}><span className={styles.strikeout}>$89</span> <strong>$59</strong></p>
            </div>
            </div>
        </div>
        <div  onClick={() => navigateToCheckout("ONE")} className={`${styles.row}`} style={{margin: "0px auto",width: "100%"}}>
            <button 
            disabled={isLoading}
            style={{
            cursor: isLoading ? "progress" : "pointer",
            display: "block",
            margin: "10px auto 0",
            background: "#ff7200",
            height: "45px",
            width: "80%",
            borderRadius: "5px",
            fontSize: "18px",
            lineHeight: "45px",
            letterSpacing: "0.5px",
            color: "#fff",
            border: "none",
            outline: "none",
            fontWeight: "600"}}> Add To Cart</button>
        </div>
        </div>

        <div onClick={() => setProduct("THREE")} className={`${styles.col} ${styles.productItem}`} style={{background: productSelected == "THREE" ? "#e5ecfe" : "#fff", border: productSelected == "THREE" ? "2px solid #17378a" : ""}} >
        <p className={styles.pkgTophd}>MOST POPULAR</p>
        <h5 className={styles.pkghding}>3 Bottles</h5>
        <div className={`${styles.row}`} style={{marginTop: "0px", width: "100%"}}>
            <div  className={`${styles.row}`} style={{width: "50%", justifyContent: "center", alignItems: "center", height: "100%", minHeight: "150px"}}>
            <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/pkg2.png"} alt={""} width={100} height={50} style={{height: "auto", width: "100%"}}  />
            </div>

            <div className={`${styles.col}`} style={{width: "50%"}}>
            <h6 className={styles.supplyText}>60 Day Supply</h6>

            <p className={styles.pkgprc2}>
                <span className={styles.BigPrice}>{isSubbed ? "$49" : "$59"}</span>
                <span className={styles.PriceUnit}>/per bottle</span>
            </p>

            <p className={styles.freeship}><span>
                <Image src="https://hitsdesignclients.com/Peak-Male-new/images/chk.png" alt="" height={50} width={50} style={{height: "auto", width: "10px"}}/> Free Usa Shipping</span>
            </p>
            
            <div className={`${styles.col}`}  style={{width: "100%"}}>
                <p className={styles.pkgtxt1}><span style={{fontWeight: "800"}}>45% OFF</span> - You Save $120</p>
                <p className={styles.pkgprc1}><span className={styles.strikeout}>$267</span> <strong>$147</strong></p>
            </div>
            </div>
        </div>
        <div onClick={() => navigateToCheckout("THREE")} className={`${styles.row}`} style={{margin: "0px auto",width: "100%"}}>
            <button 
            disabled={isLoading}
            style={{
            display: "block",
            cursor: isLoading ? "progress" : "pointer",
            margin: "10px auto 0",
            background: "#ff7200",
            height: "45px",
            width: "80%",
            borderRadius: "5px",
            fontSize: "18px",
            lineHeight: "45px",
            letterSpacing: "0.5px",
            color: "#fff",
            border: "none",
            outline: "none",
            fontWeight: "600"}}> Add To Cart</button>
        </div>
        </div>

        <div onClick={() => setProduct("SIX")} className={`${styles.col} ${styles.productItem}`} style={{background: productSelected == "SIX" ? "#e5ecfe" : "#fff", border: productSelected == "SIX" ? "2px solid #17378a" : ""}} >
        <p className={styles.pkgTophd}>BEST VALUE</p>
        <h5 className={styles.pkghding}>6 Bottles</h5>
        <div className={`${styles.row}`} style={{marginTop: "0px",width: "100%"}}>
            <div  className={`${styles.row}`} style={{width: "45%", justifyContent: "center", alignItems: "center", height: "100%", minHeight: "150px"}}>
            <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/pkg1.png"} alt={""} width={100} height={50} style={{height: "auto", width: "100%"}}  />
            </div>

            <div className={`${styles.col}`} style={{width: "55%"}}>
            <h6 className={styles.supplyText}>180 Day Supply</h6>

            <p className={styles.pkgprc2}>
                <span className={styles.BigPrice}>{isSubbed ? "$39" : "$49"}</span>
                <span className={styles.PriceUnit}>/per bottle</span>
            </p>

            <p className={styles.freeship}>
                <span>
                <Image src="https://hitsdesignclients.com/Peak-Male-new/images/chk.png" alt="" height={50} width={50} style={{height: "auto", width: "10px"}}/> Free Usa Shipping
                </span>
            </p>


            <div className={`${styles.col}`}  style={{width: "100%"}}>
                <p className={styles.pkgtxt1}><span style={{fontWeight: "800"}}>55% OFF</span> - You Save $300</p>
                <p className={styles.pkgprc1}><span className={styles.strikeout}>$534</span> <strong>$234</strong></p>
            </div>
            </div>
        </div>
        <div onClick={() => navigateToCheckout("SIX")} className={`${styles.row}`} style={{margin: "0px auto",width: "100%"}}>
            <button 
            disabled={isLoading}
            style={{
            display: "block",
            margin: "10px auto 0",
            cursor: isLoading ? "progress" : "pointer",
            background: "#ff7200",
            height: "45px",
            width: "80%",
            borderRadius: "5px",
            fontSize: "18px",
            lineHeight: "45px",
            letterSpacing: "0.5px",
            color: "#fff",
            border: "none",
            outline: "none",
            fontWeight: "600"}}> Add To Cart</button>
        </div>
        </div>
    </div>

    <div className={`${styles.row} ${styles.btnTxt}`}>
        <p className={styles.btnTxt1}>Ships: Within 24 Hours</p> 
        |
        <p className={styles.btnTxt}>
        <Image src="https://hitsdesignclients.com/Peak-Male-new/images/shape.png" height={50}  width={50} alt="" className={styles.hourglass} style={{width: "10px", height: "auto"}} /> 
        Stock: 58 Bottles Remaining
        </p>
    </div>
    
    <div className={`${styles.row} ${styles.badges}`}>
        <div>
        <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal3.png"} 
            alt={""}
            width={6000}
            height={6000}
            style={{width: "100%", height: "auto"}} />
        </div>
        <div>
        <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal2.png"} 
            alt={""}
            width={6000}
            height={6000}
            style={{width: "100%", height: "auto"}} />
        </div>
        <div>
        <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal1.png"} 
            alt={""}
            width={6000}
            height={6000}
            style={{width: "100%", height: "auto"}} />
        </div>
        <div>
        <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/s1seal4.png"} 
            alt={""}
            width={6000}
            height={6000}
            style={{width: "100%", height: "auto"}} />
        </div>
    </div> 
    </>
  );
};

export default MobileOptinForm;
