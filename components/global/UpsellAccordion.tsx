import { useState } from 'react';
import styles from "../../styles/Home.module.css";
import Image from 'next/image';

type AccordionProps = {
  title: string;
  detail: string;
};

export const UpsellAccordion: React.FC<AccordionProps> = ({ title, detail }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.accordionContainer}`}>
      <div onClick={toggleAccordion} className={`${styles.accordionBtn}`} style={{
            borderBottomLeftRadius: isOpen ? "0px" : "5px",
            borderBottomRightRadius: isOpen ? "0px" : "5px",
        }}>
        <h4>{title}</h4>
        <h4>{!isOpen ? "+" : "-"}</h4>
      </div>
      {isOpen && <div className={`${styles.accordionChild}`}  style={{
        borderTopLeftRadius: isOpen ? "0px" : "5px",
        borderTopRightRadius: isOpen ? "0px" : "5px",
      }}>
        <div className={`${styles.col}`}  style={{ padding: "2rem 0rem 2rem 0"}}>
          <div className={`${styles.row}`} style={{width: "100%", padding: "1rem", justifyContent: "center"}} ><hr style={{width: "50%"}} /></div>
          <div className={`${styles.col}`} style={{width: "100%", alignItems: "center", textAlign: "center", padding: "2rem 0rem 2rem 0"}}>
            <h1>HOLD THE LINE CLUB</h1>
            <h4>VIP Club Members Receive...</h4>
          </div>
          <div className={`${styles.row} ${styles.mobileCol}`} style={{padding: "2rem 2rem 4rem 2rem"}}>
            <div className={`${styles.col} ${styles.mobileFull} ${styles.mobileIcon}`} style={{padding: "0 1rem"}}>
              <Image src={"/images/gift-box-icon.png"} alt={""} width={150} height={150}/>
              <p style={{maxWidth: "200px", textAlign: "center", fontSize: "20px"}}>Automatic entries into all giveaways, including exclusive member's only monthly giveaways!</p>
            </div>
            <div className={`${styles.col} ${styles.mobileFull} ${styles.mobileIcon}`} style={{padding: "0 1rem"}}>
              <Image src={"/images/money-icon.png"} alt={""} width={150} height={150}/>
              <p style={{maxWidth: "200px", textAlign: "center", fontSize: "20px"}}>Automatic entries into all giveaways, including exclusive member's only monthly giveaways!</p>
            </div>
            <div className={`${styles.col} ${styles.mobileFull} ${styles.mobileIcon}`} style={{padding: "0 1rem"}}>
              <Image src={"/images/phone-icon.png"} alt={""} width={150} height={150}/>
              <p style={{maxWidth: "200px", textAlign: "center", fontSize: "20px"}}>Automatic entries into all giveaways, including exclusive member's only monthly giveaways!</p>
            </div>
            <div className={`${styles.col} ${styles.mobileFull} ${styles.mobileIcon}`} style={{padding: "0 1rem"}}>
              <Image src={"/images/computer-icon.png"} alt={""} width={150} height={150}/>
              <p style={{maxWidth: "200px", textAlign: "center", fontSize: "20px"}}>Automatic entries into all giveaways, including exclusive member's only monthly giveaways!</p>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default UpsellAccordion;
