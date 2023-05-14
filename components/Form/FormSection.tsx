import React, { useState, useEffect } from "react";
import OrderForm, { LineItem } from "./OrderForm";
import { InitialValues } from "../lib/types/general";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { imPoweredRequest } from "../lib/request";

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

const OrderFormContainer = ({state, setState }: {
    state: any
    setState: any
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState("");
    const [paymentType, setPaymentType] = useState("stripe");
    const [clientOrigin, setClientOrigin] = useState("127.0.0.1");
    const { high_risk } = state as {high_risk: boolean};

    useEffect(() => {
        setClientOrigin(window.location.origin);
    }, []);


    const handleSubmit = async ({ setSubmitting }: any) => {
        try {
        if (!stripe || !elements) return;

        setIsLoading(true);// update global state with the order data

        let payload = {
            bump: false,
            clientSecret: "",
            cus_uuid:"",
            stripe_uuuid:"",
            email: "",
            external_type: "",
            first_name: "",
            funnel_uuid: "",
            high_risk: false,
            line_items: [],
            ...state
        } as InitialValuesType;

        const queryString = objectToQueryString({
            bump: payload.bump,
            cus_uuid: payload.customer.cus_uuid,
            email: payload.customer.email,
            external_type: payload.external_type,
            first_name: payload.customer.first_name,
            fun_uuid: payload.fun_uuid,
            high_risk: payload.high_risk,
            line_items: payload.line_items
        }); // get the query string from new state

        setTimeout(() => {
            fetchCustomerData(state); // simulate a delay
        }, 0);

        const { error } = await stripe.confirmSetup({
            elements,
            confirmParams: {
                return_url: `${clientOrigin}/upsell?${queryString}`,
            },
        });

        if (error) throw new Error(error.message);
        } catch (error: any) {
            setMessage(error.message);
        } finally {
        setIsLoading(false);
        setSubmitting(false);
        }
    };

    const fetchCustomerData = async (order_payload: InitialValuesType) => {
        const payload = createPayloadFromOrder(order_payload);

        // Make the request to the server to store the card after a successful submission
        const response = await imPoweredRequest(
            "POST",
            "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/checkout/quick",
            payload
        );
        if (!response.data) {
            setMessage(`We're sorry, but there was an issue processing your payment. Please try resubmitting the form or refreshing the page and trying again.`);
        }
    };

    const createPayloadFromOrder = (order_payload: InitialValuesType) => {
        const { line_items, shipping, bump, customer, fun_uuid } = order_payload;
        const { line1, state, city, zip } = shipping;

        const payload = {
            line_items: line_items ?? [],
            shipping: {
                line1: line1 ?? "",
                line2: "",
                state: state ?? "",
                city: city ?? "",
                zip: zip ?? "",
                type: "",
                country: "US",
                name: "",
                title: ""
            },
            bump: bump ?? "",
            external_type: "",
            customer: {
                email: customer.email ?? "",
                first_name: customer.first_name ?? "",
                cus_uuid: customer.cus_uuid ?? "",
            },
            fun_uuid: fun_uuid ?? "",
            high_risk: false ?? "",
        };
        return payload;
    };

    const objectToQueryString = (data: any) => {
        const params = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === "object") {
                params.append(key, JSON.stringify(value));
            } else {
                params.append(key, value as string);
            }
        });
        return params.toString();
    };

  return (
    <>
        <OrderForm
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            message={message}
            status={status}
            state={state}
            setState={setState}
        />
</>
  );
};

export default OrderFormContainer;
