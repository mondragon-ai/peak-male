// import fetch from "node-fetch"; 

// export const imPoweredRequest = async (
//     resource: string,
//     method: "POST" | "GET",
//     data?: any
// ) => {

//     const token = process.env.NEXT_PUBLIC_IMPWOERED_API_KEY;

//     let payload = {
//         method: method,
//         headers: {
//             "Content-Type": "application/json",
//             "impowered-api-key": token as string
//         }
//     } as any;

//     if (method == "POST") {
//         payload = {
//             ...payload,
//             body: JSON.stringify(data)
//         }
//     };
//     const response = await fetch(resource, payload);

//     if (response.ok) {
//         const result = await response.json();
//         return {
//             data: result,
//             status: 200
//         };
//     } else {
//         return {
//             data: response,
//             status: 400
//         };
//     };
// };