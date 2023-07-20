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
        <p className={styles.header}>
          Act Fast! Limited Supply! Will Sell Out!
        </p>
      </div>
      <div  id={"MENU_ITEMS"}  className={styles.menuWrapper} style={{top: isScrolled ? "35px" : ""}}>
        <div className={styles.menuHeader}>
          <img src="https://hitsdesignclients.com/Peak-Male-new/images/logo.png" alt="" className={styles.logo} />
          {/* <div className={styles.menuLogo}>
            <Image src={"https://hitsdesignclients.com/Peak-Male-new/images/logo.png"} width={50} height={50} alt={""} style={{height: "auto", width: "150px"}} />
          </div> */}
          <p className={styles.customerService}>
            <img src={"https://hitsdesignclients.com/Peak-Male-new/images/phone.png"} alt="" />
            <span>Customer Service</span>
            <br />
            877-462-4459
          </p>
          <ul id={"MENU_ITEMS"} className={styles.menuItems}>
            <li><a href="#INTRODUCTION">Overview</a></li>
            <li><a href="#BENEFITS">Benefit</a></li>
            <li><a href="#INGREDIENTS">Science</a></li>
            <li><a href="#REVIEWS">Reviews</a></li>
            <li><a href="">FAQ</a></li>
          </ul>
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
        </div>
      </div>
    </div>
  );
};

export default Header;
