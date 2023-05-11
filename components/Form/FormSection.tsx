import React, { useState, useEffect } from "react";
import OrderForm from "./OrderForm";
import { InitialValues } from "../lib/types/general";

const OrderFormContainer = ({state, setState }: {
    state: any
    setState: any
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");

    const [message, setMessage] = useState("");
    const [paymentType, setPaymentType] = useState("stripe");
    const [clientOrigin, setClientOrigin] = useState("127.0.0.1");
    const { high_risk } = state as {high_risk: boolean};

    useEffect(() => {
        setClientOrigin(window.location.origin);
    }, []);

    const initialValues = {
        line_items: [{
            title: "Gold Entries ($150 Value) (BEST DEAL!!)",
            price_str: "$5.00 / pc",
            price: 5000,
            piece: "$150 value in products",
            options1: "Gold Entries ($150 Value)",
            options2: "M",
            options3: "",
            product_id: "42235974189228",
            high_risk: false,
        }],
        shipping: {
            line1: "",
            state: "",
            city: "",
            zip: "",
            type: "",
            country: "",
            name: "",
            title: ""
        },
        bump: true,
        external_type: "",
        customer: {
            email: "",
            first_name: ""
        },
        stripe_uuid: "",
        fun_uuid: "",
        high_risk: false,
    };

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            setIsLoading(true);
            const updatedState = createNewState(values);

            let payload = {
                ...updatedState
            } as InitialValues;

            const queryString = objectToQueryString({
                bump: payload.bump,
                customer: payload.customer,
                stripe_uuid: payload.stripe_uuid,
                external_type: payload.external_type,
                fun_uuid: payload.fun_uuid,
                shipping: payload.shipping,
                high_risk: payload.high_risk,
                line_items: payload.line_items
            }); // get the query string from new state

            setTimeout(() => {
                fetchCustomerData(values); // simulate a delay
            }, 0);

            } catch (error) {
            } finally {
                setIsLoading(false);
                setSubmitting(false);
            };
    };

    const createNewState = (values: any) => {
        const { title, price, price_str, piece } = values.line_items;

        console.log("CREATE NEW STATE")
        console.log(state)

        const newState = {
            ...state,
            bump: values.bump,
            line_items: [{ title, price, price_str, piece }],
        };

        // setGlobalState(newState);
        return newState;
    };

    const fetchCustomerData = async (order: any) => {
        const payload = createPayloadFromOrder(order);
        console.log(payload)
        // Make the request to the server to store the card after a successful submission
        // const response = await imPoweredRequest(
        //     "POST",
        //     "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/checkout/quick",
        //     payload
        // );
        // if (!response) {
        //     setMessage(
        //     `We're sorry, but there was an issue processing your payment. Please try resubmitting the form or refreshing the page and trying again.`
        //     );
        // }
    };

    const createPayloadFromOrder = (order: any) => {
        const { line_items, shipping, bump } = order;
        const { line1, state, city, zip } = shipping;
        const { title, price, product_id, product_sku, options1, options2, options3 } = line_items;
        // const { cus_uuid, first_name, high_risk, funnel_uuid, variants } = globalState;
        // let variant_list = [...variants];

        let variant_id = "";
        let variant = {
            sku: "",
            options1: "",
            options2: "",
            options3: "",
            external_id: "",
            price: "",
            product_id: "",
            weight: "",
            high_risk: false,
            external_type: "",
        };

        // variant_list.filter((v)=> {
        //   if (v.options1 == product.options1 && v.options2 == product.options2) {
        //       console.log(v)
        //       variant_id = v.variant_id;
        //       variant = v
        //       return false
        //   } else {return true}
        // });
        const payload = {
            line_items: [{
                title: "Gold Entries ($150 Value) (BEST DEAL!!)",
                price_str: "$5.00 / pc",
                price: 5000,
                piece: "$150 value in products",
                options1: "Gold Entries ($150 Value)",
                options2: "M",
                options3: "",
                product_id: "42235974189228",
                high_risk: false,
            }],
            shipping: {
                line1: "",
                state: "",
                city: "",
                zip: "",
                type: "",
                country: "",
                name: "",
                title: ""
            },
            bump: true,
            external_type: "",
            customer: {
                email: "",
                first_name: ""
            },
            stripe_uuid: "",
            fun_uuid: "",
            high_risk: false,
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
            paymentType={paymentType}
            setPaymentType={setPaymentType}
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            message={message}
            status={status}
            high_risk={high_risk}
            stripe={undefined}
            elements={undefined}
        />
    </>
  );
};

export default OrderFormContainer;
