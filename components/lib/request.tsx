import axios, { AxiosRequestConfig } from "axios";

export const imPoweredRequest = async (resource: string, method: string, data: any) => {
  try {
    let options = {
      method: method == "" ? "GET" : method,
      url: resource,
      headers: {
        "Content-Type": "application/json",
        "impowered-api-key": "19uq99myrxd6jmp19k5mygo5d461l0",
      },
    } as AxiosRequestConfig<any>;

    if (data) {
        options = {
            ...options,
            data: data
        };
    }
    console.warn(options);
    const response = await axios(options);
    console.warn(response);
    if (response.status < 300) {
        return response.data;
    } else {
        return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};