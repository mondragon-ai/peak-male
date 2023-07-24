import React, { useState } from "react";
import OrderForm, { LineItem } from "./OrderForm";

export interface InitialValuesType {
    line_items: LineItem[];
    shipping: {
      line1: string;
      state: string;
      city: string;
      zip: string;
      type: string;
      country: string;
      name: string;
      title: string;
    };
    bump: boolean;
    external_type: string;
    customer: {
      email: string;
      first_name: string;
      cus_uuid: string;
    };
    stripe_uuid: string;
    fun_uuid: string;
    high_risk: boolean;
    clientSecret: string;
  }

const OrderFormContainer = ({isSubbed, setSub, setProduct, productSelected }: {
    isSubbed: boolean,
    setSub: any,
    setProduct: any,
    productSelected: string
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");
    
  return (
    <>
        <OrderForm
            isLoading={isLoading}
            message={message}
            status={status}
            isSubbed={isSubbed}
            setSub={setSub}
            setProduct={setProduct}
            productSelected={productSelected}
        />
    </>
  );
};

export default OrderFormContainer;
