import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        FREE SHIPPING WHEN YOU BUY 5+ COINS!
      </h3>
    </div>
  );
};

export default Header;
