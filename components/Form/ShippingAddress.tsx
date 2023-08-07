import React from 'react';
import styles from '../../styles/Home.module.css'; 
import checkout_styles from '../../styles/Checkout.module.css';
import { FormData } from '@/pages/checkout';

interface props {
    formData: FormData,
    setFormData:  React.Dispatch<React.SetStateAction<FormData>>,
}
const ShippingAddressForm: React.FC<props> = ({formData, setFormData}) => {

    return (
        <div className={checkout_styles.cpContact}>
            <div className={checkout_styles.headingBox}>
                <p className={checkout_styles.chkHead}>Shipping Address</p>
            </div>

            <div className={`${styles.row}`} style={{ width: '100%', justifyContent: 'space-between' }}>
                <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                <div className={``}>
                    <label htmlFor="first_name" className="fl-label">
                    First Name
                    </label>
                    <input
                    onChange={(e) => setFormData({ ...formData, customer: { ...formData.customer, first_name: e.target.value } })}
                    type="text"
                    className={`${checkout_styles.inputFlds}`}
                    placeholder="First Name"
                    id="first_name"
                    data-placeholder="First Name"
                    />
                </div>
                </div>
                <div className={`${checkout_styles.frmFlds} ${checkout_styles.fl}`}>
                <div className={``}>
                    <label htmlFor="last_name" className="fl-label">
                    Last Name
                    </label>
                    <input
                    onChange={(e) => setFormData({ ...formData, customer: { ...formData.customer, last_name: e.target.value } })}
                    type="text"
                    className={`${checkout_styles.inputFlds}`}
                    placeholder="Last Name"
                    id="last_name"
                    data-placeholder="Last Name"
                    />
                </div>
                </div>
            </div>

            <div className={`${checkout_styles.frmFlds}`}>
                <div className={``}>
                <label htmlFor="line1" className="fl-label">
                    Street Address
                </label>
                <input
                    onChange={(e) => setFormData({ ...formData, shipping: { ...formData.shipping, line1: e.target.value } })}
                    type="text"
                    className={`${checkout_styles.inputFlds}`}
                    placeholder="Street Address"
                    id="line1"
                    data-placeholder="Street Address"
                />
                </div>
            </div>

            <div className={`${checkout_styles.frmFlds}`}>
                <div className={``}>
                <label htmlFor="line2" className="fl-label">
                    Apartment, suite, etc. (optional)
                </label>
                <input
                    onChange={(e) => setFormData({ ...formData, shipping: { ...formData.shipping, line2: e.target.value } })}
                    type="text"
                    className={`${checkout_styles.inputFlds}`}
                    placeholder="Apartment, suite, etc. (optional)"
                    id="line2"
                    data-placeholder="Apartment, suite, etc. (optional)"
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
                        onChange={(e) => setFormData({ ...formData, shipping: { ...formData.shipping, city: e.target.value } })}
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
                    <label htmlFor="state" className="fl-label">
                    State
                    </label>
                    <select
                    onChange={(e) => setFormData({ ...formData, shipping: { ...formData.shipping, state: e.target.value } })}
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
                            onChange={(e) => setFormData({ ...formData, shipping: { ...formData.shipping, zip: e.target.value } })}
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
                            onChange={(e) => setFormData({ ...formData, shipping: { ...formData.shipping, country: e.target.value } })}
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
    );
};

export default ShippingAddressForm;
