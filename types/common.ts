export interface ShortenedUrl {
  shortedUrl: string;
  original: string;
}

export interface UrlValidation {
  isValid: boolean;
  error?: string;
}

export interface ILooseObject {
  [key: string]: any;
}
