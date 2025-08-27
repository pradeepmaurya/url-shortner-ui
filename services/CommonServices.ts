import CommonApiConfig, {
  COMMON_API_URL_ENUM,
} from "@/config/api_config/common";
import ApiClient, { IApiClientResponse } from "@/lib/apiClient";

abstract class CommonServices {
  public static createShortenUrlFromLongUrl = async (
    longUrl: string
  ): Promise<IApiClientResponse> => {
    debugger;
    const results: IApiClientResponse = {
      data: {},
      error: { code: 0, message: "" },
    };

    const body = {
      url: longUrl,
    };

    const response = await ApiClient.makeRequest({
      url: CommonApiConfig.GetApiConfigBaseUrl({
        url: COMMON_API_URL_ENUM.CREATE_SHORTEN_URL_FROM_LONG_URL,
      }),
      method: "POST",
      body,
    });

    if (response.error) {
      results.error = response.error;
    } else {
      results.data = response.data;
    }
    return results;
  };
}

export default CommonServices;
