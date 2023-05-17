import Cookies from "js-cookie";
import { validate as uuidValidate, v4 as uuidv4 } from "uuid";
import { imPoweredRequest } from "./request";

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
  