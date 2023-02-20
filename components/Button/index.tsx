import styles from "./Button.module.css";

const Button = ({ text }: { text: string }) => {
  return <button className={styles.btn}>{text}</button>;
};

export default Button;
