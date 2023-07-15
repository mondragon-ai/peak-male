import Image from "next/image";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <div  className={styles.announcmentBanner}>
        <h3 className={styles.header}>
          FREE SHIPPING WHEN YOU BUY 5+ COINS!
        </h3>
      </div>
      <div className={styles.menuWrapper}>
        <div className={styles.menuHeader}>
            <div className={styles.menuLogo}>
              <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/logo.png"} width={50} height={50} alt={""} style={{height: "auto", width: "150px"}} />
            </div>
            <div className={styles.menuItems}>
              <div style={{borderRight: "1px solid gray"}}><a href=""><h6>Overview</h6></a></div>
              <div style={{borderRight: "1px solid gray"}}><a href=""><h6>Benefit</h6></a></div>
              <div style={{borderRight: "1px solid gray"}}><a href=""><h6>Science</h6></a></div>
              <div style={{borderRight: "1px solid gray"}}><a href=""><h6>Reviews</h6></a></div>
              <div><a href=""><h6>FAQ</h6></a></div>
            </div>
            <div className={styles.customerService}>
              <div><Image src={"https://hitsdesignclients.com/Peak-Male-new/images/phone.png"} alt={""} width={60} height={50}/></div>
              <div className={styles.customerServiceText}>
                <h6>Customer Service</h6>
                <h6>877-462-4459</h6>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
