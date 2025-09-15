export const NOTIFICATION_SUBSCRIPTION = `
  subscription onNewNotificationByGroup($groupName: NotificationGroup!) {
    onNewNotificationByGroup(groupName: $groupName) {
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