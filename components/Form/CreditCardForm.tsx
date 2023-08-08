import React, { useState } from 'react';
import styles from '../../styles/Home.module.css'; 
import checkout_styles from '../../styles/Checkout.module.css'; 

type props = {
    formData: any,
    setFormData: any
}

const CreditCardForm = ({formData, setFormData}: props) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [ccv, setCcv] = useState('');

    const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = event.target.value.replace(/\D/g, '');
        setFormData({ ...formData, cc_info: { ...formData.cc_info, cc_number: Number(inputVal) } })
        const formattedCardNumber = formatCardNumber(inputVal);
        setCardNumber(formattedCardNumber);
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = event.target.value.replace(/\D/g, '');
        setFormData({ ...formData, cc_info: { ...formData.cc_info, exp_month: Number(inputVal) } });
        const formattedMonth = formatMonth(inputVal);
        setExpMonth(formattedMonth);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = event.target.value.replace(/\D/g, '');
        setFormData({ ...formData, cc_info: { ...formData.cc_info, exp_year: Number(inputVal) } });
        const formattedYear = formatYear(inputVal);
        setExpYear(formattedYear);
    };

    const handleCcvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = event.target.value.replace(/\D/g, ''); 
        setFormData({ ...formData, cc_info: { ...formData.cc_info, ccv: Number(inputVal) } });
        const formattedCcv = inputVal.slice(0, 3);
        setCcv(formattedCcv);
    };

    const formatCardNumber = (inputVal: string) => {
        const formatted = inputVal
        .slice(0, 16) // Limit input to 16 digits for credit card number
        .replace(/(\d{4})/g, '$1-') // Add hyphens after every 4 digits
        .slice(0, 19); // Limit the total length to 19 characters (XXXX-XXXX-XXXX-XXXX)
        return formatted;
    };

    const formatMonth = (inputVal: string) => {
        const formatted = inputVal.slice(0, 2); // Limit input to 2 digits for month (MM)
        return formatted;
    };

    const formatYear = (inputVal: string) => {
        const formatted = inputVal.slice(0, 2); // Limit input to 2 digits for year (YY)
        return formatted;
    };

    return (
        <div>
            <div className={``}>
                <label htmlFor="zip" className="fl-label">
                    Card Number
                </label>
                <input
                    onChange={(e) => handleCardNumberChange(e)}
                    type="text"
                    value={cardNumber}
                    className={`${checkout_styles.inputFlds}`}
                    placeholder="Card Number"
                    id="ccnumber"
                    maxLength={19}
                    data-placeholder="Card Number"
                />
            </div>

            <div className={`${styles.row}`} style={{ width: '100%', justifyContent: 'space-between' }}>
                <div className={`${checkout_styles.frmFlds}`} style={{ width: "32%" }}>
                    <label htmlFor="zip" className="fl-label">
                        MM
                    </label>
                    <input
                        onChange={handleMonthChange}
                        type="text"
                        className={`${checkout_styles.inputFlds}`}
                        placeholder="MM"
                        id="exp_month"
                        value={expMonth}
                        maxLength={2}
                        data-placeholder="MM"
                    />
                </div>
                <div className={`${checkout_styles.frmFlds}`} style={{ width: "32%" }}>
                    <label htmlFor="zip" className="fl-label">
                        YY
                    </label>
                    <input
                        onChange={handleYearChange}
                        type="text"
                        className={`${checkout_styles.inputFlds}`}
                        placeholder="YY"
                        id="exp_year"
                        value={expYear}
                        maxLength={2}
                        data-placeholder="YY"
                    />
                </div>

                <div className={`${checkout_styles.frmFlds}`} style={{ width: "32%" }}>
                    <label htmlFor="zip" className="fl-label">
                        CCV
                    </label>
                    <input
                        onChange={handleCcvChange}
                        type="text"
                        className={`${checkout_styles.inputFlds}`}
                        placeholder="CCV"
                        id="ccv"
                        value={ccv}
                        maxLength={4}
                        data-placeholder="CCV"
                    />
                </div>
            </div>
        </div>
        );
    };

    export default CreditCardForm;
