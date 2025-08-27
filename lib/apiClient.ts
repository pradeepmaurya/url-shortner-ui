import { AppConfig } from "@/config/AppConfig";
import { AppMessages } from "@/config/AppMessages";
import { ILooseObject } from "@/types/common";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  GenericAbortSignal,
} from "axios";

enum axiosMethodEnum {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
  HEAD = "head",
  OPTIONS = "options",
  TRACE = "trace",
}

interface IApiClientInput {
  url: string;
  method?: keyof typeof axiosMethodEnum;
  headers?: ILooseObject;
  body?: ILooseObject;
  signal?: GenericAbortSignal;
  isCacheable?: boolean;
}

export interface IApiClientResponse {
  headers?: ILooseObject;
  data: ILooseObject;
  error: {
    code: number;
    message: string;
  };
  errors?: ILooseObject;
}

const cacheData: ILooseObject = {};

abstract class ApiClient {
  public static async makeRequest({
    url,
    method,
    headers,
    body,
    signal,
    isCacheable,
  }: IApiClientInput): Promise<IApiClientResponse> {
    let result: IApiClientResponse = {} as IApiClientResponse;
    try {
      if (!url) {
        throw new Error(AppMessages.ERRORS.missing_url);
      }
      if (!method) {
        throw new Error(AppMessages.ERRORS.missing_method);
      }

      const options: AxiosRequestConfig = {
        url,
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        signal,
      };

      if (body && body instanceof FormData) {
        options.data = body;
      } else if (body) {
        options.data = JSON.stringify(body);
      }

      let response = null;
      const cacheKey = `${method}-${url}`;
      if (isCacheable) {
        const cache = cacheData[cacheKey];
        const isExpired = Date.now() - cache?.timestamp > AppConfig.CACHE_TTL;
        if (cache && !isExpired) {
          response = cache?.response;
        } else {
          response = await axios(options);
          cacheData[cacheKey] = {
            response,
            timestamp: Date.now(),
          };
        }
        if (response === null) {
          response = await axios(options);
          cacheData[cacheKey] = {
            response,
            timestamp: Date.now(),
          };
        }
      } else {
        response = await axios(options);
      }
      result.data = response.data;
      result.headers = response.headers;
    } catch (error: any) {
      if (error.response) {
        result.headers = error.response?.headers;
        result.data = error.response?.data;
      } else if (error.code !== AxiosError.ERR_CANCELED) {
        result.error = {
          code: 500,
          message: error.message,
        };
      }
    }
    return result;
  }
}

export default ApiClient;
