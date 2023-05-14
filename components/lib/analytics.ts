import Cookies from "js-cookie";
import { validate as uuidValidate, v4 as uuidv4 } from "uuid";
import { imPoweredRequest } from "./request";

const analyticsUrl = "http://127.0.0.1:5001/impowered-production/us-central1/analytics/event/page_views";

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
        fun_uuid: "fun_19d024275f5ba239732a",
    });

    if (response.status > 300 && !response.data) {
        console.error(" 🚨 [ERROR]: ")
    };
    // console.log({ page, resonse: response.data });
};
  