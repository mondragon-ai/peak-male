// import React, { useEffect, useState } from 'react';
// import CollectJSSection from './COollectionJSSection';
// import Head from 'next/head';

// interface FormData {
//   firstName: string;
//   lastName: string;
//   amount: string;
//   isSubmitting: boolean;
//   alertMessage: string;
//   token: string;
// }

// const InlineCartPage: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: '',
//     lastName: '',
//     amount: '',
//     isSubmitting: false,
//     alertMessage: '',
//     token: '',
//   });

//   useEffect(() => {

//     const CollectJS = window ? (window as any).CollectJS : null;
//     console.log('CollectJS:', CollectJS);

//     if (CollectJS) {
//       console.log('CollectJS is available!');
//       CollectJS.configure({
//         variant: 'inline',
//         'theme': 'bootstrap',
//         'buttonText': 'SUBMIT ME!',
//         callback: (token: string) => {
//           console.log(token);
//           finishSubmit(token);
//         },
//         fields: {
//           ccnumber: {
//             placeholder: 'CC Number',
//             selector: '#ccnumber',
//           },
//           ccexp: {
//             placeholder: 'CC Expiration',
//             selector: '#ccexp',
//           },
//           cvv: {
//             placeholder: 'CVV',
//             selector: '#cvv',
//           },
//         },
//       });
//     } else {
//       console.log('CollectJS is not available!');
//     }
//   }, []);

//   const finishSubmit = (response: any) => {
//     const { isSubmitting, alertMessage, ...formDataWithoutSubmissionProps } = formData;
//     formDataWithoutSubmissionProps.token = response.token;
//     console.log(formDataWithoutSubmissionProps.token);
//     setFormData({
//       ...formDataWithoutSubmissionProps,
//       isSubmitting: false,
//       alertMessage: 'The form was submitted. Check the console to see the output data.',
//     });
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     const CollectJS = window ? (window as any).CollectJS : null;
//     event.preventDefault();
//     setFormData((prevFormData) => ({ ...prevFormData, isSubmitting: true }));
//     CollectJS.startPaymentRequest();
//   };

//   return (
//     <div className="App" style={{padding: "1rem"}}>
//       <Head>
//         <script 
//           src="https://secure.safewebservices.com/token/Collect.js"
//           data-tokenization-key="6wJ393-XNxZRT-2MgyE5-9732R4"
//           data-custom-css='{
//             "background-color": "white",
//             "color": "000",
//             "float": "left",
//             "width": "100%",
//             "border": "1px solid #bbb9b7",
//             "outline": "none !important",
//             "height": "50px",
//             "padding": "10px 15px",
//             "border-radius": "5px",
//             "font-weight": "normal",
//             "transition": "all 0.2s ease-out",
//             "box-sizing": "border-box",
//             "font-size": "16px",
//             "margin-bottom": "0.5rem"
//           }'></script>
//       </Head>
//       <br />
//       {formData.alertMessage && <div className="alert">{formData.alertMessage}</div>}
//       <form onSubmit={handleSubmit}>
//         <CollectJSSection />
//         <button id='payButton' type="submit" disabled={formData.isSubmitting}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InlineCartPage;

export {}