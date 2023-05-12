import { CustomInput } from "./CustomInput";
import styles from "../../styles/Home.module.css";

const CustomerInputs = ({ label, name, required, state, onChange }: {[key: string]: any}) => {
  // You can access the form values using the "values" object
  return (
    <div className={`${styles.addressRow}`}>
      <CustomInput title={label} state={state} name={name} onChange={onChange}/>
      {required && <div className={`${styles.reqMark}`}>!</div>}
    </div>
  );
};

export default CustomerInputs;
