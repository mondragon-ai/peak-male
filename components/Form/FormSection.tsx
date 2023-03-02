import React, { useState, useEffect, useContext } from "react";
import { imPoweredRequest } from "../lib/request";
import OrderForm from "./OrderForm";
import { Context } from "../../context/context";

const OrderFormContainer = ({state, setState }: {
    state: any
    setState: any
}) => {
    const [squareCard, setSquareCard] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");
    const appId = "sandbox-sq0idb-RT3u-HhCpNdbMiGg5aXuVg";
    const locationId = "TC4Z3ZEBKRXRH";
    let isSquareCardAttached: any;
    let squareCardPayment: any;

    const [message, setMessage] = useState("");
    const [paymentType, setPaymentType] = useState("stripe");
    const [clientOrigin, setClientOrigin] = useState("127.0.0.1");
    const { high_risk } = state as {high_risk: boolean};

    const initialValues = {
        product: {
        title: "Gold Entries ($150 Value) (BEST DEAL!!)",
        price_str: "$5.00 / pc",
        price_num: 5000,
        piece: "$150 value in products",
        options1: "Gold Entries ($150 Value)",
        options2: "M",
        product_id: "42235974189228"
        },
        shipping: {
        line1: "",
        state: "",
        city: "",
        zip: "",
        },
        bump: true,
        external: "SHOPIFY"
    };

    useEffect(() => {
        setClientOrigin(window.location.origin);
        if (!(window as any).Square) {
        return;
        // throw new Error("Square.js failed to load properly");
        }
        try {
        const payments = (window as any).Square.payments(appId, locationId);
        initializeSquareCard(payments);
        } catch {
        setStatus("missing-credentials");
        return;
        }
    }, []);

    async function initializeSquareCard(payments: any) {
        try {
        if (!isSquareCardAttached) {
            isSquareCardAttached = true;
            squareCardPayment = await payments.card();
            await squareCardPayment.attach("#card-container");

            setSquareCard(squareCardPayment);
        }
        } catch (e) {
        console.error("Initializing Square Card failed", e);
        return;
        }
    }

    // Checkpoint 2.
    async function handlePaymentMethodSubmission(event: any) {
        event.preventDefault();

        try {
        // disable the submit button as we await tokenization and make a payment request.
        setIsLoading(true);
        const token = await tokenize();
        const paymentResults = await createPayment(token);
        setStatus("is-success");
        console.debug("Payment Success", paymentResults);
        } catch (e) {
        setIsLoading(false);
        setStatus("is-failure");
        console.error(e);
        }
    }

    async function createPayment(token: string) {
        const body = JSON.stringify({
        locationId,
        sourceId: token,
        });

        console.log("cool.ing");
        const paymentResponse = await fetch("/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        if (paymentResponse.ok) {
            return paymentResponse.json();
        }

        const errorBody = await paymentResponse.text();
        throw new Error(errorBody);
    }

    async function tokenize() {
        const tokenResult = await (squareCard as any).tokenize();
        if (tokenResult.status === "OK") {
            return tokenResult.token;
        } else {
            let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
            if (tokenResult.errors) {
                errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
            }

            throw new Error(errorMessage);
        }
    }

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {

            setIsLoading(true);

            const updatedState = createNewState(values); // update global state with the order data
            console.log("ONSUBIMT")
            console.log(updatedState);

            let payload = {
                ...updatedState
            } as {
                bump: false,
                clientSecret: "",
                cus_uuid:"",
                email: "",
                external: "",
                first_name: "",
                funnel_uuid: "",
                high_risk: false,
                products: []
            };

            const queryString = objectToQueryString({
                bump: payload.bump,
                clientSecret: payload.clientSecret,
                cus_uuid: payload.cus_uuid,
                email: payload.email,
                external: payload.external,
                first_name: payload.first_name,
                funnel_uuid: payload.funnel_uuid,
                high_risk: payload.high_risk,
                products: payload.products
            }); // get the query string from new state

            setTimeout(() => {
                fetchCustomerData(values); // simulate a delay
            }, 0);


            } catch (error) {
            } finally {
                setIsLoading(false);
                setSubmitting(false);
            }
    };


    const createNewState = (values: any) => {
        const { title, price_num, price_str, piece } = values.product;

        console.log("CREATE NEW STATE")
        console.log(state)

        const newState = {
            ...state,
            bump: values.bump,
            products: [{ title, price_num, price_str, piece }],
        };

        // setGlobalState(newState);
        return newState;
    }


    const fetchCustomerData = async (order: any) => {
        const payload = createPayloadFromOrder(order);
        console.log(payload)
        // Make the request to the server to store the card after a successful submission
        const response = await imPoweredRequest(
            "POST",
            "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/checkout/quick",
            payload
        );
        if (!response) {
            setMessage(
            `We're sorry, but there was an issue processing your payment. Please try resubmitting the form or refreshing the page and trying again.`
            );
        }
    };

    const createPayloadFromOrder = (order: any) => {
        const { product, shipping, bump } = order;
        const { line1, state, city, zip } = shipping;
        const { title, price_num, product_id, product_sku, options1, options2, options3 } = product;
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

    //     variant_list.filter((v)=> {
    //       if (v.options1 == product.options1 && v.options2 == product.options2) {
    //           console.log(v)
    //           variant_id = v.variant_id;
    //           variant = v
    //           return false
    //       } else {return true}
    //     });
    //     const payload = {
    //       cus_uuid,
    //       shipping: {
    //         type: "BOTH",
    //         line1,
    //         line2: "",
    //         city,
    //         state,
    //         zip,
    //         country: "US",
    //         name: first_name,
    //         title: "Home",
    //       },
    //       product: {
    //         high_risk: variant.high_risk ? variant.high_risk : false,
    //         title,
    //         price:  variant.price ? variant.price : 0,
    //         product_id: variant.product_id ? variant.product_id : "",
    //         sku: variant.sku ? variant.sku : "HT-BOX",
    //         compare_at_price: 0,
    //         handle: String(title).toLocaleLowerCase().replaceAll(" ", "-"),
    //         options1: variant.options1 ? variant.options1 : "",
    //         options2: variant.options2 ? variant.options2 : "",
    //         options3: variant.options3 ? variant.options3 : "",
    //         weight: variant.weight ? ((variant.weight ) * 16 * 10) : 0,
    //         variant_id: variant.external_type == "SHOPIFY" ? variant.external_id : variant_id ? variant_id : 7174179979436,
    //         quantity: 1,
    //         external_id: variant.external_id,
    //         external_type: variant.external_type,
    //       },
    //       bump,
    //       high_risk,
    //       funnel_uuid,
    //       external: "SHOPIFY"
    //     };
    //     return payload;
    //   };
    }

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
            handlePaymentMethodSubmission={handlePaymentMethodSubmission}
            status={status}
            high_risk={high_risk}
            stripe={undefined}
            elements={undefined}
        />
    </>
  );
};

export default OrderFormContainer;
