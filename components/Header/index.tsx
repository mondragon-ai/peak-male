import Image from "next/image";
import styles from "./Header.module.css";
import { useEffect } from "react";

const Header = () => {
  
  useEffect(() => {
    // Function to handle smooth scrolling to an ID
    const handleScrollToId = (e: Event, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Add event listener to each menu item
    const menuItems = document.querySelectorAll("#MENU_ITEMS > div > a");
    menuItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        handleScrollToId(e, item.getAttribute("href")!.substring(1));
      });
    });

    // Function to handle sticky header
    const handleStickyHeader = () => {
      const header = document.querySelector(".container") as HTMLElement;
      const sticky = header?.offsetTop || 0;
      if (window.scrollY > sticky) {
        header?.classList.add("sticky");
      } else {
        header?.classList.remove("sticky");
      }
    };

    // Add event listener to window scroll for sticky header
    window.addEventListener("scroll", handleStickyHeader);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
      menuItems.forEach((item) => {
        item.removeEventListener("click", (e) =>
          handleScrollToId(e, item.getAttribute("href")!.substring(1))
        );
      });
    };
  }, []);
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
            <div id={"MENU_ITEMS"} className={styles.menuItems}>
              <div style={{borderRight: "1px solid gray"}}><a href="#INTRODUCTION"><h6>Overview</h6></a></div>
              <div style={{borderRight: "1px solid gray"}}><a href="#BENEFITS"><h6>Benefit</h6></a></div>
              <div style={{borderRight: "1px solid gray"}}><a href="#INGREDIENTS"><h6>Science</h6></a></div>
              <div style={{borderRight: "1px solid gray"}}><a href="#REVIEWS"><h6>Reviews</h6></a></div>
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
