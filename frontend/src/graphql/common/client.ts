import { GraphQLClient } from "graphql-request";

const APPSYNC_URL = import.meta.env.VITE_APPSYNC_URL as string;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY as string;

export const client = new GraphQLClient(APPSYNC_URL, {
  headers: {
    "x-api-key": API_KEY,
  },
});
