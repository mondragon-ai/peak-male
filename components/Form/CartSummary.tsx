import React, { useState } from 'react';
import Image from 'next/image'; 
import styles from '../../styles/Home.module.css'; 
import checkout_styles from '../../styles/Checkout.module.css';

interface OrderSummaryProps {
  formData: {
    product: 'ONE' | 'THREE' | 'SIX';
    isSubbed: boolean,
  };
  ONE: string;
  THREE: string; 
  SIX: string; 
  summary: boolean
}

const CartSummary: React.FC<OrderSummaryProps> = ({
  formData,
  ONE,
  THREE,
  SIX,
  summary
}) => {
    // const [summary, toggleSummary] = useState(false);
    return true ? (
        <>
            {!summary ? <h2 className={checkout_styles.sumryHdng}>Order Summary</h2> : null}
            <div style={{ width: '100%', padding: '0 0 15px' }}>
                <div style={{ width: '100%', padding: '0 0 15px' }}>
                <div className={checkout_styles.deviderCp}></div>

                <div className={checkout_styles.prodBox}>
                    <div className={checkout_styles.ordLft}>
                    <div className={checkout_styles.prodImg}>
                        <Image
                        src={'https://hitsdesignclients.com/Peak-Male-new/images/chk-prod.png'}
                        alt={''}
                        width={500}
                        height={500}
                        style={{ height: 'auto', width: '55px' }}
                        />
                        {formData.product === 'ONE' ? (
                        <p className={checkout_styles.prodCount}>1</p>
                        ) : formData.product === 'THREE' ? (
                        <p className={checkout_styles.prodCount}>3</p>
                        ) : formData.product === 'SIX' ? (
                        <p className={checkout_styles.prodCount}>6</p>
                        ) : null}
                    </div>
                    <div className={checkout_styles.odrRgt}>
                        <p className={checkout_styles.ordTitle}>
                        <strong>Peak Male</strong>
                        <br />
                        Xtreme Test Booster
                        </p>
                    </div>
                    </div>
                    <div className={checkout_styles.ordRight}>
                    {formData.product === 'ONE' ? (
                        <p>
                        <span>$89.00</span>
                        <br />
                        {ONE}
                        </p>
                    ) : formData.product === 'THREE' ? (
                        <p>
                        <span>$267.00</span>
                        <br />
                        {THREE}
                        </p>
                    ) : formData.product === 'SIX' ? (
                        <p>
                        <span>$534.00</span>
                        <br />
                        {SIX}
                        </p>
                    ) : null}
                    </div>
                </div>

                <div className={checkout_styles.deviderCp}></div>

                <table className={checkout_styles.cartTable}>
                    <tbody>
                    <tr>
                        <td align="left">Subtotal</td>
                        {formData.product === 'ONE' ? (
                        <td align="right">
                            <span>{ONE}</span>
                        </td>
                        ) : formData.product === 'THREE' ? (
                        <td align="right">
                            <span>{SIX}</span>
                        </td>
                        ) : formData.product === 'SIX' ? (
                        <td align="right">
                            <span>{THREE}</span>
                        </td>
                        ) : null}
                    </tr>
                    </tbody>
                </table>

                <div className={checkout_styles.deviderCp}></div>

                <table className={checkout_styles.cartTable}>
                    <tbody>
                    <tr>
                        <td align="left">Shipping</td>
                        <td align="right">
                        <span style={{ textDecoration: 'line-through' }}>
                            {formData.product === 'ONE' ? '' : '$5.99'}
                        </span>
                        <strong>
                            &nbsp;{formData.product === 'ONE' ? '$5.99' : ' FREE'}
                        </strong>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div className={checkout_styles.deviderCp}></div>

                <table className={checkout_styles.cartTable}>
                    <tbody>
                    <tr>
                        <td align="left" className={checkout_styles.totTxtL}>
                        Total
                        </td>
                        {formData.product === 'ONE' ? (
                        <td align="right" className={checkout_styles.totTxtL}>
                            <span>{!formData.isSubbed ? "$74.99" : "$64.99"}</span>
                        </td>
                        ) : formData.product === 'THREE' ? (
                        <td align="right" className={checkout_styles.totTxtL}>
                            <span>{THREE}</span>
                        </td>
                        ) : formData.product === 'SIX' ? (
                        <td align="right" className={checkout_styles.totTxtL}>
                            <span>{SIX}</span>
                        </td>
                        ) : null}
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </>
    ) : null;
};

export default CartSummary;
