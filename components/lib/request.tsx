import axios, { AxiosRequestConfig } from "axios";

export const imPoweredRequest = async (resource: string, method: string, data: any) => {


  const token = process.env.NEXT_PUBLIC_IMPWOERED_API_KEY;
  
  let options = {
    method: method == "" ? "GET" : method,
    url: resource,
    headers: {
      "Content-Type": "application/json",
      "impowered-api-key": token as string
    }
  } as AxiosRequestConfig<any>;


  if (data) {
    options = {
        ...options,
        data: data
    };
  };

  const response = await axios(options);

  if (response.status < 300) {
    const result = await response.data;
    return {
        data: result,
        status: 200
    };
  } else {
    return {
        data: response.data,
        status: 400
    };
  };
};
