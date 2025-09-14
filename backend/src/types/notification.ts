export interface SendNotificationInput {
  userId: string;
  email: string;
  channel: string;
  groupName: string;
  topicName: string;
  message: string;
  readStatus?: boolean;
  priority?: string;
  status?: string;
  deepLinkUrl?: string;
  createdBy?: string;
  viewedBy?:string;
}

export interface Notification {
  notificationId: string;
  userId: string;
  email: string;
  channel: string;
  groupName: string;
  topicName: string;
  message: string;
  readStatus?: boolean;
  priority?: string;
  status?: string;
  deepLinkUrl?: string;
  createdAt: string;
  createdBy?: string;
  viewedAtDateTime?: string;
  viewedBy?: string;
}
