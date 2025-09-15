export interface Notification {
    notificationId: string;
    userId: string;
    email: string;
    channel: string;
    groupName: string;
    topicName: string;
    message: string;
    priority?: string;
    status?: string;
    readStatus?: boolean;
    createdAt: string;
    createdBy?: string;
    viewedAtDateTime?: string;
    viewedBy?: string;
}

export type NotificationStatus = "NEW" | "SENT" | "DELIVERED" | "ARCHIVED";

export type NotificationPriority = "HIGH" | "MEDIUM" | "LOW";

export type NotificationChannel = "INAPP" | "PUSH";

export type NotificationTopic =
    | "ENGINE_DIAGNOSTICS_ALERT"
    | "BRAKE_SYSTEM_CHECK_REQUIRED"
    | "BATTERY_HEALTH_UPDATE"
    | "OIL_CHANGE_REMINDER"
    | "TIRE_PRESSURE_ALERT"
    | "NEW_MODEL_LAUNCH"
    | "SERVICE_APPOINTMENT_REMINDER"
    | "EXTENDED_WARRANTY_NOTIFICATION"
    | "INSURANCE_RENEWAL_ALERT"
    | "CUSTOMER_FEEDBACK_REQUEST"
    | "PRODUCTION_LINE_UPDATE"
    | "PARTS_SUPPLY_DELAY"
    | "QUALITY_INSPECTION_REPORT"
    | "SHIPMENT_TRACKING_UPDATE"
    | "RECALL_NOTICE"

export type NotificationGroup =
    | "SALES"
    | "MARKETING"
    | "SERVICE"
    | "MANUFACTURING"
    | "MANAGEMENT";

export interface NotificationInput {
    userId: string;
    email: string;
    channel: string;
    groupName: NotificationGroup;
    topicName: NotificationTopic;
    message: string;
    readStatus?: boolean;
    priority?: string;
    status?: NotificationStatus;
    deepLinkUrl?: string;
    createdBy?: string;
    viewedBy?: string;
}
