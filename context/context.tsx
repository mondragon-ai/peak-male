import { createContext, useEffect, useState } from "react";
import { imPoweredRequest } from "../components/lib/request";
import { getItem, saveItem } from "./storage";

export const Context = createContext({});

export const ContextProvider = ({ children }: any) => {

  const [state, setState] = useState({
    first_name: "",
    email: "",
    cus_uuid: "",
    clientSecret: "",
    funnel_uuid: "fun_7626c00357",
    products: [],
    high_risk: false,
    bump: true,
    external: "SHOPIFY",
    variants: []
  });
  useEffect(() => {
    const {
      first_name,
      email,
      cus_uuid,
      clientSecret,
      funnel_uuid,
      products,
      high_risk,
      bump,
      external,
      variants
    } = getItem("funnel_data") || state;

    setState({
      first_name,
      email,
      cus_uuid,
      clientSecret,
      funnel_uuid,
      products,
      high_risk,
      bump,
      external,
      variants
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
