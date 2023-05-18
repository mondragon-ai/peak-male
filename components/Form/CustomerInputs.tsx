import { CustomInput } from "./CustomInput";
import styles from "../../styles/Home.module.css";

const CustomerInputs = ({ label, name, parent, required, state, setState, placeHolder }: {[key: string]: any}) => {
  // You can access the form values using the "values" object
  return (
    <div className={`${styles.addressRow}`}>
      <CustomInput placeHolder={placeHolder} title={label} state={state} parent={parent} name={name} setState={setState}/>
      {required && <div className={`${styles.reqMark}`}>!</div>}
    </div>
  );
};

export default CustomerInputs;
