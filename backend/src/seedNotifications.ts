// src/seedNotifications.ts
import { GraphQLClient, gql } from "graphql-request";
import * as dotenv from "dotenv";
import { sampleData } from "./sampleData.js";

dotenv.config();

const APPSYNC_URL = process.env.APPSYNC_GRAPHQL_API_URL as string;
const API_KEY = process.env.APPSYNC_API_KEY as string;

if (!APPSYNC_URL || !API_KEY) {
  throw new Error("Missing required environment variables: APPSYNC_URL or APPSYNC_API_KEY");
}

const client = new GraphQLClient(APPSYNC_URL, {
  headers: {
    "x-api-key": API_KEY,
  },
});

// GraphQL Mutation
const SEND_NOTIFICATIONS = gql`
  mutation SendNotifications($input: NotificationInput!) {
    sendNotifications(input: $input) {
      notificationId
      userId
      email
      groupName
      message
      status
      createdAt
    }
  }
`;

async function seedNotifications() {
  for (const input of sampleData) {
    try {
      const res: any = await client.request(SEND_NOTIFICATIONS, { input });
      console.log("Inserted:", res.sendNotifications);
    } catch (err) {
      console.error("❌ Error inserting notification:", err);
    }
  }
}

seedNotifications();
