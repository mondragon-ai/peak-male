import { useState } from 'react';
import styles from "../../styles/Home.module.css";

type AccordionProps = {
  title: string;
  detail: string;
  defaultOpen: boolean;
};

export const Accordion: React.FC<AccordionProps> = ({ title, detail, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

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
      }}><p>{detail}</p></div>}
    </div>
  );
};

export default Accordion;
