locals {
  dynamodb_partition_key  = "notificationId"
  appsync_role_name       = "appsync-dynamodb-role"
  appsync_ds_none         = "none"
  appsync_ds_name         = "NotificationsDS"
  appsync_runtime_name    = "APPSYNC_JS"
  appsync_runtime_version = "1.0.0"

  resolver_send_notifications = {
    type  = "Mutation"
    field = "sendNotifications"
  }

  resolver_get_notifications = {
    type  = "Query"
    field = "getNotifications"
  }
}
