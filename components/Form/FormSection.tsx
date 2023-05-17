import React, { useState, useEffect } from "react";
import OrderForm, { LineItem } from "./OrderForm";
import { InitialValues } from "../lib/types/general";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { imPoweredRequest } from "../lib/request";
import Router from "next/router";

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
    state: InitialValuesType,
    setState: any
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState("");
    const [clientOrigin, setClientOrigin] = useState("https://htl-funnel-main.vercel.app/");
    const [cardElement, setCardElement] = useState<any>(null);
  
    useEffect(() => {
      setCardElement(elements?.getElement(CardElement));
    }, []);

    const handleSubmit = async () => {
        try {
            if (!stripe || !elements) return;

            setIsLoading(true); // update global state with the order data

            const cardElement = elements.getElement(CardElement);

            if (!cardElement) {
              throw new Error("Card element not found");
            };
      
            const { error, paymentMethod } = await stripe.createPaymentMethod({
              type: "card",
              card: cardElement,
            });

            if (error) throw new Error(error.message);

            if (state.customer.email !== "" &&
                state.customer.first_name !== "" && 
                state.shipping.line1!== "" && 
                state.shipping.city !== "" && 
                state.shipping.state !== "" && 
                state.shipping.zip !== "" && 
                paymentMethod!.id && paymentMethod!.id !== "") {
                setTimeout(() => {
                    fetchCustomerData(state,  paymentMethod!.id ); // simulate a delay
                }, 0);
            };
        } catch (error: any) {
            setMessage(error.message);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCustomerData = async (order_payload: InitialValuesType, payment_method: string) => {
        const payload = createPayloadFromOrder(order_payload);

        // Make the request to the server to store the card after a successful submission
        const response = await imPoweredRequest(
            "https://us-central1-impowered-production.cloudfunctions.net/funnels/payments/checkout/fast",
            "POST",
            {...payload, payment_method: payment_method}
        );

        if (!response.data) {
            setMessage(" Try again as we are having problems charging your card");
        };

        if (response.data.ok) {

            const queryString = objectToQueryString({
                bump: state.bump,
                cus_uuid: response.data.data.cus_uuid ?? "",
                email: state.customer.email,
                external_type: state.external_type,
                first_name: state.customer.first_name,
                fun_uuid: state.fun_uuid,
                high_risk: state.high_risk,
                line_items: state.line_items
            }); // get the query string from new state
    
            setIsLoading(false);
            Router.push(`${clientOrigin}/upsell/?${queryString}`);
        } else {
            setMessage(response.data.error);
            console.log(response.data)
            setIsLoading(false);
        };
    };

    const createPayloadFromOrder = (order_payload: InitialValuesType) => {
        const { line_items, shipping, bump, customer, fun_uuid, stripe_uuid } = order_payload;
        const { line1, state, city, zip } = shipping;

        const payload = {
            line_items: line_items ?? [],
            shipping: {
                line1: line1 ?? "",
                line2: "",
                state: state ?? "",
                city: city ?? "",
                zip: zip ?? "",
                type: "SHIPPING",
                country: "US",
                name:  customer.first_name ?? "",
                title: "HOME"
            },
            bump: bump ?? false,
            external_type: "SHOPIFY",
            customer: {
                email: customer.email ?? "",
                first_name: customer.first_name ?? "",
                cus_uuid: customer.cus_uuid ?? "",
            },
            fun_uuid: fun_uuid ?? "",
            high_risk: false ?? "",
            stripe_uuid: stripe_uuid,
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
            elements={elements}
            setState={setState}
        />
</>
  );
};

export default OrderFormContainer;
