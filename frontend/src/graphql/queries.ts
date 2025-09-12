import { gql } from "graphql-request";

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($groupName: String!) {
    getNotifications(groupName: $groupName) {
      notificationId
      userId
      email
      channel
      groupName
      topicName
      message
      priority
      status
      readStatus
      createdAt
      createdBy
      viewedAtDateTime
      viewedBy
    }
  }
`;

