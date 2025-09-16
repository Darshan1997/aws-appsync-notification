resource "aws_appsync_graphql_api" "notifications_api" {
  name                = var.appsync_api_name
  authentication_type = "API_KEY"
  schema              = file("${path.module}/../../../dist/schema/schema.graphql")
}

resource "aws_appsync_api_key" "api_key" {
  api_id = aws_appsync_graphql_api.notifications_api.id
}

resource "aws_appsync_datasource" "notifications_ds" {
  api_id           = aws_appsync_graphql_api.notifications_api.id
  name             = local.appsync_ds_name
  type             = "AMAZON_DYNAMODB"
  service_role_arn = aws_iam_role.appsync_role.arn

  dynamodb_config {
    table_name = aws_dynamodb_table.notifications.name
  }
}

resource "aws_appsync_datasource" "none" {
  api_id = aws_appsync_graphql_api.notifications_api.id
  name   = local.appsync_ds_none
  type   = "NONE"
}

resource "aws_appsync_resolver" "send_notifications" {
  api_id      = aws_appsync_graphql_api.notifications_api.id
  type        = local.resolver_send_notifications.type
  field       = local.resolver_send_notifications.field
  data_source = aws_appsync_datasource.notifications_ds.name

  runtime {
    name            = local.appsync_runtime_name
    runtime_version = local.appsync_runtime_version
  }

  code = file("${path.module}/../../../dist/resolvers/mutations/mutation.sendNotifications.js")
}

resource "aws_appsync_resolver" "get_notifications" {
  api_id      = aws_appsync_graphql_api.notifications_api.id
  type        = local.resolver_get_notifications.type
  field       = local.resolver_get_notifications.field
  data_source = aws_appsync_datasource.notifications_ds.name

  runtime {
    name            = local.appsync_runtime_name
    runtime_version = local.appsync_runtime_version
  }

  code = file("${path.module}/../../../dist/resolvers/query/query.getNotifications.js")
}
