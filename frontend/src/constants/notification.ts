import type { NotificationChannel, NotificationGroup, NotificationPriority, NotificationStatus, NotificationTopic } from "../types/notifications";

export const NOTIFICATION_PRIORITY: NotificationPriority[] = [
  "CRITICAL",
  "HIGH",
  "MEDIUM",
  "LOW"
];

export const NOTIFICATION_GROUPS: NotificationGroup[] = [
  "SALES",
  "MARKETING",
  "SERVICE",
];

export const NOTIFICATION_TOPICS: NotificationTopic[] = [
  "ENGINE DIAGNOSTICS ALERT",
  "BRAKE SYSTEM CHECK REQUIRED",
  "BATTERY HEALTH UPDATE",
  "OIL CHANGE REMINDER",
  "TIRE PRESSURE ALERT",
  "NEW MODEL LAUNCH",
  "SERVICE APPOINTMENT REMINDER",
  "EXTENDED WARRANTY NOTIFICATION",
  "INSURANCE RENEWAL ALERT",
  "CUSTOMER FEEDBACK REQUEST",
  "PRODUCTION LINE UPDATE",
  "PARTS SUPPLY DELAY",
  "QUALITY INSPECTION REPORT",
  "SHIPMENT TRACKING UPDATE",
  "RECALL NOTICE",
];

export const NOTIFICATION_STATUSES: NotificationStatus[] = [
  "NEW",
  "SENT",
  "DELIVERED",
  "ARCHIVED",
];

export const NOTIFICATION_CHANNELS:NotificationChannel[] =  [
  "INAPP",
  "PUSH"
]
