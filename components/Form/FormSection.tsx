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

const OrderFormContainer = ({isSubbed, setSub, setProduct, productSelected, setIsLoading, isLoading }: {
    isSubbed: boolean,
    setSub: any,
    setProduct: any,
    productSelected: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    isLoading: boolean
}) => {
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");
    
  return (
    <>
        <OrderForm
          setIsLoading={setIsLoading}
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
