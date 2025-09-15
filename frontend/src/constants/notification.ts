import type { NotificationChannel, NotificationGroup, NotificationPriority, NotificationStatus, NotificationTopic } from "../types/notifications";

export const NOTIFICATION_PRIORITY: NotificationPriority[] = [
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
  "ENGINE_DIAGNOSTICS_ALERT",
  "BRAKE_SYSTEM_CHECK_REQUIRED",
  "BATTERY_HEALTH_UPDATE",
  "OIL_CHANGE_REMINDER",
  "TIRE_PRESSURE_ALERT",
  "NEW_MODEL_LAUNCH",
  "SERVICE_APPOINTMENT_REMINDER",
  "EXTENDED_WARRANTY_NOTIFICATION",
  "INSURANCE_RENEWAL_ALERT",
  "CUSTOMER_FEEDBACK_REQUEST",
  "PRODUCTION_LINE_UPDATE",
  "PARTS_SUPPLY_DELAY",
  "QUALITY_INSPECTION_REPORT",
  "SHIPMENT_TRACKING_UPDATE",
  "RECALL_NOTICE"
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
