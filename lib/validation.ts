import { UrlValidation } from "@/types/common";

export function validateUrl(url: string): UrlValidation {
  if (!url || url.trim().length === 0) {
    return {
      isValid: false,
      error: "URL is required",
    };
  }

  const trimmedUrl = url.trim();

  // Check if URL starts with http or https
  if (!trimmedUrl.match(/^https?:\/\//)) {
    return {
      isValid: false,
      error: "URL must start with http:// or https://",
    };
  }

  // Basic URL validation using URL constructor
  try {
    const urlObject = new URL(trimmedUrl);

    // Check if it has a valid domain
    if (!urlObject.hostname || urlObject.hostname.length < 3) {
      return {
        isValid: false,
        error: "Please enter a valid domain name",
      };
    }

    // Check if domain has at least one dot
    if (!urlObject.hostname.includes(".")) {
      return {
        isValid: false,
        error: "Please enter a valid domain name",
      };
    }

    return {
      isValid: true,
    };
  } catch (error) {
    return {
      isValid: false,
      error: "Please enter a valid URL",
    };
  }
}
