import { APPSYNC_API_KEY, APPSYNC_HOST } from "./envs";

export function encodeAppSyncCredentials() {
  const creds = {
    host: APPSYNC_HOST,
    "x-api-key": APPSYNC_API_KEY,
  };
  const data = JSON.stringify(creds);
  return btoa(data);
}