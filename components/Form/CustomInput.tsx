import styles from "../../styles/Home.module.css";

export const CustomInput = ({ title, value, name, onChange, state, disabled=false }: {[key: string]: any}) => {
    const handleInputChange = (event: any) => onChange({
    ...state,
    [name]: event.target.value
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
            // onChange={handleInputChange}
            // value={value}
            name={name}
            disabled={disabled}
            type="text"/>
        </div>
    );
};