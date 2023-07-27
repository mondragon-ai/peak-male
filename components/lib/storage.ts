export interface BillingAddress {
    type: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
    country: string | "US";
}
export interface Customer {
    first_name: string;
    last_name: string;
    email: string;
    cus_uuid: string
}
  
export const storeBillingAddressInLocalStorage = (key: string, billingAddress: BillingAddress): void => {
    try {
        const stringified = JSON.stringify(billingAddress);
        localStorage.setItem(key, stringified);
    } catch (error) {
        // Handle any errors that might occur during storage
        console.error('Error storing address in local storage:', error);
    }
};

export const getBillingAddressFromLocalStorage = (key: string,): BillingAddress | null => {
    try {
        const address = localStorage.getItem(key);
        if (address) {
            return JSON.parse(address) as BillingAddress;
        }
        return null;
    } catch (error) {
        // Handle any errors that might occur during parsing
        console.error('Error parsing address from local storage:', error);
    return null;
    }
};


export const getCustomerFromLocalStorage = (key: string,): Customer | null => {
    try {
        const customer = localStorage.getItem(key);
        if (customer) {
            return JSON.parse(customer) as Customer;
        }
        return null;
    } catch (error) {
        // Handle any errors that might occur during parsing
        console.error('Error parsing customer from local storage:', error);
    return null;
    }
};