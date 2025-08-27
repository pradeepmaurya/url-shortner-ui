export interface AppMessagesType {
  ERRORS: {
    missing_url: string;
    missing_method: string;
    network_error: string;
    unauthorized: string;
    forbidden: string;
  };
  SUCCESS: {
    request_successful: string;
  };
}

export const AppMessages: AppMessagesType = {
  ERRORS: {
    missing_url: "API URL is missing",
    missing_method: "HTTP method is missing",
    network_error: "Network error occurred. Please try again.",
    unauthorized: "You are not authorized to perform this action.",
    forbidden: "Access to this resource is forbidden.",
  },
  SUCCESS: {
    request_successful: "Request completed successfully.",
  },
};
