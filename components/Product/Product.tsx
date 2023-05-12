
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export type ProductType = {
    title: string,
    price: number,
    piece: string,
    variant_id: string,
    product_id: string,
    options1: string,
    options2: string,
    options3: string,
    best?: boolean,
};

export const ProductRow = ({ title, price, piece, product_id, variant_id, options1, best }: ProductType) => {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        if (window) {
            setWindowWidth(window.innerWidth);
        };
    }, []);

    const best_styles = best ? `${styles.bestProduct}` : ""

    return (
        <div className={`${styles.productRow} ${best_styles}`} style={{
            border: best ? "1px solid black" : "",
            boxShadow: best ? "black 3px 5px 10px 0px" : "",
        }}>
            <div className={`${styles.checkBoxProduct}`} >
                <div><div></div></div>
            </div>

            <div className={`${styles.productTitleBox}`}>
                <p style={{
                    color: best ? "red" : "",
                    fontSize:  best ? "22px"  : "",
                    fontWeight:  best ? 700 : ""
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
