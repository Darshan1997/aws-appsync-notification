import { gql } from "graphql-request";

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($groupName: NotificationGroup!) {
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

export const NOTIFICATION_SUBSCRIPTION = `
  subscription  {
    onNewNotification {
      notificationId
      userId
      email
      channel
      groupName
      topicName
      message
      readStatus
      priority
      status
      deepLinkUrl
      createdAt
      createdBy
      viewedAtDateTime
      viewedBy
    }
  }
`;
