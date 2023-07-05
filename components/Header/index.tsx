import Image from "next/image";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
     <Image src={"https://cdn.shopify.com/s/files/1/0697/5150/5204/files/Win_A_Truck_copy.png?v=1688395242"} width={2000} height={2000} alt={""} style={{height: "100%", width: "auto"}} />
     <div className={styles.header}>
        <h3>Join My First Giveawy</h3>
<br />
        <p>I wanted to take a moment to personally thank you for joining my first-ever giveaway. Your support and enthusiasm mean the world to me, and I'm thrilled to have you on board.
<br />
<br />
I truly appreciate your participation and believe that our shared journey will be an unforgettable one. Stay tuned for more exciting updates and exclusive content as we embark on this incredible giveaway together.
<br />
<br />
Stay relentless!
<br />
<br /></p>
        <Image src={"https://cdn.shopify.com/s/files/1/0697/5150/5204/files/cam_signature_copy.png?v=1676569649"} width={2000} height={2000} alt={""} style={{height: "24%", width: "auto"}} />
     </div>
    </div>
  );
};

export default Header;
