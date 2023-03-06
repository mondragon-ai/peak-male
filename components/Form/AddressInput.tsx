import { Field, useFormikContext, ErrorMessage } from "formik";

const AddressInput = ({ label, name, required }: {[key: string]: any}) => {
  const { values } = useFormikContext();
  // You can access the form values using the "values" object
  return (
    <div className="input-group">
      <Field
        defaultValue=""
        className="form-control"
        type="text"
        name={name}
        id={name}
        required={required}
      />
      <label htmlFor={name}>{label}</label>
      {required && <div className="req-mark">!</div>}
      <ErrorMessage
        name={name}
        component="div"
        className="req-mark"
        // style={{
        //   position: "absolute",
        //   color: "red",
        //   fontSize: 14,
        //   bottom: -20,
        //   right: 10,
        // }}
      />
    </div>
  );
};

export default AddressInput;
