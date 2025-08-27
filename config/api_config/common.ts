import { ILooseObject } from "@/types/common";

export enum COMMON_API_URL_ENUM {
  CREATE_SHORTEN_URL_FROM_LONG_URL = "CREATE_SHORTEN_URL_FROM_LONG_URL",
  GET_REDIRECT_ORIGINAL_URL = "GET_REDIRECT_ORIGINAL_URL",
}

type GET_PRICING_APPROVALS_API_URL_TYPE = {
  url: COMMON_API_URL_ENUM;
  data?: ILooseObject;
};

abstract class CommonApiConfig {
  public static GetApiConfigBaseUrl({
    url,
    data,
  }: GET_PRICING_APPROVALS_API_URL_TYPE): string {
    switch (url) {
      case COMMON_API_URL_ENUM.CREATE_SHORTEN_URL_FROM_LONG_URL:
        return `${process.env.NEXT_PUBLIC_URL_SHORTENER_SERVICE_BASE_URL}/api/urls/shorten`;

      default:
        return "";
    }
  }
}

export default CommonApiConfig;
