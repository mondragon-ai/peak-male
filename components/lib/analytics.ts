import Cookies from "js-cookie";
import { validate as uuidValidate, v4 as uuidv4 } from "uuid";
import { imPoweredRequest } from "./request";
import * as crypto from "crypto";

const analyticsUrl = "https://us-central1-impowered-production.cloudfunctions.net/analytics/event/page_views";

export const sendPageViewEvent = async (page: string) => {
    // generate a unique visitor ID from cookies
    let visitorId = Cookies.get("visitorId");
    let page_view = [[page, "page_views"]];

    // if the visitor ID is not valid, generate a new one
    if (!uuidValidate(visitorId as string)) {
        visitorId = uuidv4();
        Cookies.set("visitorId", visitorId);
        page_view = [...page_view, [page, "unique_page_views"]];
    }

    const response = await imPoweredRequest(analyticsUrl, "POST", {
        page_view,
        fun_uuid: process.env.NEXT_PUBLIC_IMPOWERED_FUNNEL ?? "",
    });

    if (response.status > 300 && !response.data) {
        console.error(" 🚨 [ERROR]: ")
    };
    // console.log({ page, resonse: response.data });
};

declare global {
    interface Window {
      gtag: any;
      twq: any; 
    }
  }

export const pageview = (url: any) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag('config', 'AW-10793712364', {
            page_path: url
        });
    } else {
        window.gtag('config', 'AW-10793712364', {
            page_path: url
        });
  }
};

export const event = (action: string, value: number) => {
  if (!window) {
    console.error("NO WINDOW OBJ");
  } else {
    console.log("WINDOW EXISTS:");
    window.gtag('event', action, value);
  }
}

export const twitterEvent = (email: string, value: number) => {
  if (!window && email == "" && value <= 0) {
    console.error("NO WINDOW OBJ");
  } else {
    console.log("WINDOW EXISTS:");
    if (value && value > 0) {
      window.twq('event', 'tw-od5o9-oeiwz', {
        value: value,
        currency: 'USD',
        conversion_id: 'txt_' + crypto.randomBytes(10).toString("hex"),
        email_address: email ? email : 'example@example.com'
      });
    }
  }
}