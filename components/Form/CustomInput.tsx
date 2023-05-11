import styles from "../../styles/Home.module.css";

export const CustomInput = ({ title, value, name, onChange, user, disabled=false }: {[key: string]: any}) => {
    const handleInputChange = (event: any) => onChange({
    ...user,
    [name]: event.target.value
    });

    return (
        <div className={`${styles.formItem} ${styles.row}`}
            style={{
                width:"100%",
                padding: "0rem 0px",
                margin: "1rem 0"
            }}>
            <input
                style={{
                    color: "white",
                    width: "100%"
                }}
                onChange={handleInputChange}
                value={value}
                name={name}
                disabled={disabled}
                type="text"/>
            <label htmlFor="title" style={{top:"-5px", fontSize:"10px"}}> {title}</label>
        </div>
    );
};