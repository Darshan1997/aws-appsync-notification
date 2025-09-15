export const SEND_NOTIFICATION = `
   mutation SendNotifications($input: NotificationInput!) {
    sendNotifications(input: $input) {
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