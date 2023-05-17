import axios, { AxiosRequestConfig } from "axios";

export const imPoweredRequest = async (
  resource: string,
  method: string,
  data: any
) => {
  const token = process.env.NEXT_PUBLIC_IMPWOERED_API_KEY;

  let options: AxiosRequestConfig<any> = {
    method: method === "" ? "GET" : method,
    url: resource,
    headers: {
      "Content-Type": "application/json",
      "impowered-api-key": token as string,
    },
  };

  if (data) {
    options = {
      ...options,
      data: data,
    };
  }

  try {
    const response = await axios(options);

    console.log(response);

    if (response.status < 300) {
      const result = response.data;
      return {
        data: result,
        status: 200,
      };
    } else {
      return {
        data: response.data,
        status: response.status,
      };
    }
  } catch (error) {
    if ((error as any).response) {
      // The request was made and the server responded with a status code
      const { data, status } = (error as any).response;
      return {
        data: data,
        status: status,
      };
    } else if ((error as any).request) {
      // The request was made but no response was received
      return {
        data: "No response received from the server",
        status: 500,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        data: "An error occurred while making the request",
        status: 500,
      };
    }
  }
};
