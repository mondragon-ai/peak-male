import { createContext, useEffect, useState } from "react";
import { imPoweredRequest } from "../components/lib/request";
import { getItem, saveItem } from "./storage";

export const Context = createContext({});

export const ContextProvider = ({ children }: any) => {

  const [state, setState] = useState({
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
  });
  useEffect(() => {
    const {
      line_items,
      shipping,
      bump,
      external_type,
      customer,
      stripe_uuid,
      fun_uuid,
      high_risk,
    } = getItem("funnel_data") || state;

    setState({
      line_items,
      shipping,
      bump,
      external_type,
      customer,
      stripe_uuid,
      fun_uuid,
      high_risk
    });
    // check if the product data is cached
    // const cachedProductData = getItem("product_data");
    // if (cachedProductData) {
    //   setState({ ...state, variants: cachedProductData });
    // } else {
    //     // fetch product data and cache it
    //     const fetchData = async () => {
    //     try {
    //       const response = await imPoweredRequest(
    //         "POST",
    //         "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/products",
    //         { product_uuid: "pro_60d547e7d9" }
    //       );
    //       const products = response.data.result;
    //       if (products) {
    //         setState({ ...state, variants: products[0].variants });
    //         saveItem("product_data", products[0].variants);
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    //   fetchData();
    // }
  }, []);

  const setGlobalState = (data: any) => {
    setState({ ...state, ...data });
    saveItem("funnel_data", { ...state, ...data });
  };
  const globalState = state;
  return (
    <Context.Provider value={[globalState, setGlobalState]}>
      {children}
    </Context.Provider>
  );
};
