import Cookies from "js-cookie";
import { validate as uuidValidate, v4 as uuidv4 } from "uuid";
import { imPoweredRequest } from "../components/lib/request";

const analyticsUrl = "http://127.0.0.1:5001/impowered-production/us-central1/funnels/payments/secret";

export const getSecret = async () => {

    const response = await imPoweredRequest(analyticsUrl, "POST", {});

    if (response.status > 300 && !response.data) {
        console.error(" 🚨 [ERROR]: Getting Secret")
    };
    
    return {
        status: response.status ,
        data: response.data 
    }
};
  