import styles from "../../styles/Home.module.css";

export const CustomInput = ({ title, parent, name, setState, state, disabled=false, placeHolder }: {[key: string]: any}) => {
    const handleInputChange = (event: any) => setState({
    ...state,
    [parent]: {
        ...state[parent],
        [name]: event.target.value
    }
    });

    return (
        <div className={`${styles.CustomInput} ${styles.col}`}
            style={{
                width:"100%",
                borderRadius: "6px"
            }}>
            <label htmlFor={name}>{title}</label>
            <input style={{
                color: "black",
                width: "100%",
                padding: "0 0.5rem",
                fontSize: "20px"
            }}
            placeholder={placeHolder}
            onChange={handleInputChange}
            value={state[name]}
            name={name}
            disabled={disabled}
            type="text"/>
        </div>
    );
};