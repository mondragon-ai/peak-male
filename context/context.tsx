import { createContext, useEffect, useState } from "react";
import { imPoweredRequest } from "../components/lib/request"
import { getItem, saveItem } from "./storage";

export const Context = createContext<any>({});

export const ContextProvider = ({ children }: any) => {

  const [state, setState] = useState({
    line_items: [{
        title: "20 Hold The Line Coins (SAVE 30%)",
        price: 14000,
        piece: "$6.97/coin",
        options1: "",
        options2: "",
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
        first_name: "",
        cus_uuid: ""
    },
    stripe_uuid: "",
    fun_uuid: "",
    high_risk: false,
    secret: ""
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
      secret,
    } = getItem("funnel_data") || state;

    setState({
      line_items,
      shipping,
      bump,
      external_type,
      customer,
      stripe_uuid,
      fun_uuid,
      high_risk,
      secret
    });
  }, []);


  const setGlobalState = (data: any) => {
    setState({ ...state, ...data });
    saveItem("funnel_data", { ...state, ...data });
  };
  const globalState = state;
  const contextValue = [globalState, setGlobalState];
  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};
