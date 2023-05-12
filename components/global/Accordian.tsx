import { useState } from 'react';
import styles from "../../styles/Home.module.css";

type AccordionProps = {
  title: string;
  children: string;
};

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.accordionContainer}`}>
      <div onClick={toggleAccordion} className={`${styles.accordionBtn}`} style={{
            borderBottomLeftRadius: isOpen ? "0px" : "",
            borderBottomRightRadius: isOpen ? "0px" : "",
        }}>
        <h4>{title}</h4>
        <h4>{!isOpen ? "+" : "-"}</h4>
      </div>
      {isOpen && <div className={`${styles.accordionChild}`}  style={{
        borderTopLeftRadius: isOpen ? "0px" : "",
        borderTopRightRadius: isOpen ? "0px" : "",
      }}>{children}</div>}
    </div>
  );
};

export default Accordion;
