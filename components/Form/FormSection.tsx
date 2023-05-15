import React, { useState, useEffect } from "react";
import OrderForm, { LineItem } from "./OrderForm";
import { InitialValues } from "../lib/types/general";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
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
    state: InitialValuesType,
    setState: any
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState("");
    const [paymentType, setPaymentType] = useState("stripe");
    const [clientOrigin, setClientOrigin] = useState("127.0.0.1");
    const [cardElement, setCardElement] = useState<any>(null);
  
    useEffect(() => {
      setCardElement(elements?.getElement(CardElement));
    }, []);

    // useEffect(() => {
    //     setClientOrigin(window.location.origin);
    // }, []);

    const handleSubmit = async () => {
        try {
            if (!stripe || !elements) return;

            setIsLoading(true);// update global state with the order data

            const queryString = objectToQueryString({
                bump: state.bump,
                cus_uuid: state.customer.cus_uuid,
                email: state.customer.email,
                external_type: state.external_type,
                first_name: state.customer.first_name,
                fun_uuid: state.fun_uuid,
                high_risk: state.high_risk,
                line_items: state.line_items
            }); // get the query string from new state

            // const { error } = await stripe.confirmSetup({
            //     elements,
            //     confirmParams: {
            //         return_url: `${clientOrigin}/?${queryString}`,
            //     },
            // });

            const cardElement = elements.getElement(CardElement);

            if (!cardElement) {
              throw new Error("Card element not found");
            }
      
            const { error, paymentMethod } = await stripe.createPaymentMethod({
              type: "card",
              card: cardElement,
            });
      
            console.log(error)

            // console.log("START PAYING")
            // const { error, paymentMethod } = await stripe.createPaymentMethod({
            //     type: "card",
            //     card: cardElement!,
            // });
            console.log("paymentMethod")
            console.log(paymentMethod)
            if (error) throw new Error(error.message);

            if (state.customer.email !== "" &&
                state.customer.first_name !== "" && 
                state.shipping.line1!== "" && 
                state.shipping.city !== "" && 
                state.shipping.state !== "" && 
                state.shipping.zip !== "") {

                // setTimeout(() => {
                //     fetchCustomerData(state); // simulate a delay
                // }, 0);
        
            };


            
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCustomerData = async (order_payload: InitialValuesType) => {
        const payload = createPayloadFromOrder(order_payload);

        console.log(payload);

        // Make the request to the server to store the card after a successful submission
        const response = await imPoweredRequest(
            "http://127.0.0.1:5001/impowered-production/us-central1/funnels/payments/checkout/fast",
            "POST",
            payload
        );
        if (!response.data) {
            setMessage(`We're sorry, but there was an issue processing your payment. Please try resubmitting the form or refreshing the page and trying again.`);
        }
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
