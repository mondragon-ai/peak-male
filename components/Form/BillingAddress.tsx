import React, { useState } from 'react'
import styles from '../../styles/Home.module.css'; 
import checkout_styles from '../../styles/Checkout.module.css';
import { FormData } from '@/pages/checkout';

interface props {
    formData: FormData,
    setFormData:  React.Dispatch<React.SetStateAction<FormData>>,
    differentBilling: boolean,
    setBilling:  React.Dispatch<React.SetStateAction<boolean>>,
}

interface BillingAddress {
  line1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const BillingAddressForm: React.FC<props> = ({formData, setFormData, differentBilling, setBilling}) => {

  return (
    <>
        <div className={checkout_styles.cpContact}>
            <div className={checkout_styles.headingBox}>
                <p className={checkout_styles.chkHead}>Billing Address</p>
                <p className={checkout_styles.chkSubheading}>Select the address that matches your card or payment method.</p>
            </div>
        </div>

        <div className={checkout_styles.payoptbox}>
            <div className={checkout_styles.paymentCardsBox}>
                <label className={checkout_styles.billingtogglbtn}>
                    <input
                    onClick={() => setBilling(false)}
                    type="radio"
                    name="address"
                    checked={!differentBilling}
                    />
                    Same as shipping address
                </label>
            </div>
            <div className={checkout_styles.paymentCardsBox}>
                <label className={checkout_styles.billingtogglbtn}>
                    <input
                    onClick={() => setBilling(true)}
                    type="radio"
                    name="address"
                    checked={differentBilling}
                    />
                    Use a different billing address
                </label>
            </div>
            {differentBilling ? (
            <div className={checkout_styles.paymentFldsBox}>
                <div className={checkout_styles.cpContact} style={{ marginTop: '0' }}>
                <div className={`${checkout_styles.frmFlds}`}>
                    <div className={``}>
                        <label htmlFor="line1" className="fl-label">
                            Street Address
                        </label>
                        <input
                            onChange={(e) => setFormData({ ...formData, billing: {...formData.billing, line1: e.target.value} })}
                            type="text"
                            className={`${checkout_styles.inputFlds}`}
                            placeholder="Street Address"
                            id="line1"
                            data-placeholder="Street Address"
                        />
                    </div>
                </div>

                <div className={`${styles.row}`} style={{ width: '100%', justifyContent: 'space-between' }}>
                    <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                        <div className={``}>
                            <label htmlFor="city" className="fl-label">
                            City
                            </label>
                            <input
                            onChange={(e) => setFormData({ ...formData, billing: {...formData.billing, city: e.target.value} })}
                            type="text"
                            className={`${checkout_styles.inputFlds}`}
                            placeholder="City"
                            id="city"
                            data-placeholder="City"
                            />
                        </div>
                    </div>
                    <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                        <div className={``}>
                            <select
                            onChange={(e) => setFormData({ ...formData, billing: {...formData.billing, state: e.target.value} })}
                            name="state"
                            className={checkout_styles.selcetFld}
                            id="state"
                            >
                            <option value="1">- Select State -</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={`${styles.row}`} style={{ width: '100%', justifyContent: 'space-between' }}>
                    <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                    <div className={``}>
                        <label htmlFor="zip" className="fl-label">
                        Zip Code
                        </label>
                        <input
                        onChange={(e) => setFormData({ ...formData, billing: {...formData.billing, zip: e.target.value} })}
                        type="text"
                        className={`${checkout_styles.inputFlds}`}
                        placeholder="Zip Code"
                        id="zip"
                        data-placeholder="Zip Code"
                        />
                    </div>
                    </div>
                    <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                    <div className={``}>
                        <label htmlFor="country" className="fl-label">
                        Country
                        </label>
                        <input
                        onChange={(e) => setFormData({ ...formData, billing: {...formData.billing, country: e.target.value} })}
                        type="text"
                        className={`${checkout_styles.inputFlds}`}
                        placeholder="US"
                        id="country"
                        data-placeholder="US"
                        disabled
                        />
                    </div>
                    </div>
                </div>
                </div>
            </div>
        ) : null}
      </div>
    </>
  );
};

export default BillingAddressForm;
