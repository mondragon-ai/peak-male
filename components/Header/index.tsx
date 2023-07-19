import Image from "next/image";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menu, toggleMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window?.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window?.addEventListener("scroll", handleScroll);

    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(isScrolled)
  
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
    <div className={`${styles.container} ${isScrolled && styles.scrolled}`}>
      <div  className={`${isScrolled && styles.hidden} ${styles.announcmentBanner}`}>
        <h3 className={styles.header}>
          FREE SHIPPING WHEN YOU BUY 5+ COINS!
        </h3>
      </div>
      <div  id={"MENU_ITEMS"}  className={styles.menuWrapper}>
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
            <div onClick={() => toggleMenu(!menu)} className={styles.hamburger}>
              {!menu ?
              <>
                <span></span>
                <span></span>
                <span></span>
              </> :
              <>
                <span style={{top: "9px",transform: "rotate(135deg)"}}></span>
                <span style={{top: "9px",transform: "rotate(-135deg)"}}></span>
              </>}
            </div>
            {menu ? <div className={styles.menuList}>
              <div style={{borderRight: "1px solid gray"}}><a href="#INTRODUCTION" onClick={() => toggleMenu(!menu)}><h6>Overview</h6></a></div>
              <div style={{borderRight: "1px solid gray"}}><a href="#BENEFITS" onClick={() => toggleMenu(!menu)}><h6>Benefit</h6></a></div>
              <div style={{borderRight: "1px solid gray"}}><a href="#INGREDIENTS" onClick={() => toggleMenu(!menu)}><h6>Science</h6></a></div>
              <div style={{borderRight: "1px solid gray"}}><a href="#REVIEWS" onClick={() => toggleMenu(!menu)}><h6>Reviews</h6></a></div>
            </div> : null}
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
