
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { InitialValuesType } from "../Form/FormSection";

export type ProductType = {
    title: string,
    price: number,
    piece: string,
    variant_id: string,
    product_id: string,
    options1: string,
    options2: string,
    options3: string,
    state: InitialValuesType,
    setState: Dispatch<SetStateAction<any>>,
    best?: boolean,
};

export const ProductRow = ({ title, price, piece, product_id, variant_id, options1, best, state, setState }: ProductType) => {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        if (window) {
            setWindowWidth(window.innerWidth);
        };
    }, []);

    const handleClick = () => {

        setState({...state, line_items: [{
            title: title,
            piece: piece,
            price: price,
            options1: options1,
            options2: "M",
            options3: "",
            product_id: product_id,
            high_risk: false,
            sku: "",
            compare_at_price: 0,
            handle: "",
            weight: 5,
            variant_id: variant_id,
            quantity: 1,
            status: true,
            id: variant_id,
            url: "",
            tags: [],
        }]});
    };

    const best_styles = best ? `${styles.bestProduct}` : ""

    return (
        <div onClick={() => handleClick()}
         className={`${styles.productRow} ${best_styles}`} style={{
            border: best ? "1px solid black" : "0px solid black",
            boxShadow: best ? "black 3px 5px 10px 0px" : "none",
        }}>
            <div className={`${styles.checkBoxProduct}`} >
                <div><div style={{
                    backgroundColor: state.line_items && state.line_items[0].id == variant_id ? "rgb(123, 123, 245)" : "white"
                }}></div></div>
            </div>

            <div className={`${styles.productTitleBox}`}>
                <p style={{
                    color: best ? "red" : "black",
                    fontSize:  best ? "22px"  : "20px",
                    fontWeight:  best ? 700 : "100"
                }}>{title}</p>
               {best ? <p  style={{
                    fontSize: "18px"
                }}>20 Hold The Line Coins (SAVE 30%)</p> : null}
            </div>

            <div className={`${styles.productPrice}`}>
                <p className="">{piece?.replace(/\s/g, '')}</p>
            </div>
        </div>
    );
};

export default ProductRow;
