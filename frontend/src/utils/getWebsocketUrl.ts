import { encodeAppSyncCredentials } from "./encodeAppSyncCredentials";
import { APPSYNC_REALTIME_HOST } from "./envs";

export function getWebsocketUrl() {
  const header = encodeAppSyncCredentials();
  const payload = btoa(JSON.stringify({}));

  return `wss://${APPSYNC_REALTIME_HOST}/graphql?header=${header}&payload=${payload}`;
}