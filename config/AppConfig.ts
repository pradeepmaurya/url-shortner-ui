export interface AppConfigType {
  CACHE_TTL: number;
}

export const AppConfig: AppConfigType = {
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
};
