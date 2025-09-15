# DynamoDB Table
resource "aws_dynamodb_table" "notifications" {
  name         = var.table_name
  billing_mode = "PROVISIONED"
  hash_key     = local.dynamodb_partition_key

  attribute {
    name = local.dynamodb_partition_key
    type = "S"
  }

  read_capacity  = var.read_capacity
  write_capacity = var.write_capacity
}

# AppSync API
resource "aws_appsync_graphql_api" "notifications_api" {
  name                = var.appsync_api_name
  authentication_type = "API_KEY"
  schema              = file("${path.module}/../../../dist/schema/schema.graphql")
}

# API Key
resource "aws_appsync_api_key" "api_key" {
  api_id = aws_appsync_graphql_api.notifications_api.id
}

# IAM Role for AppSync
resource "aws_iam_role" "appsync_role" {
  name = local.appsync_role_name

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "appsync.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

# IAM Policy for DynamoDB
resource "aws_iam_role_policy" "appsync_policy" {
  role = aws_iam_role.appsync_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["dynamodb:*"]
      Resource = [
        aws_dynamodb_table.notifications.arn,
        "${aws_dynamodb_table.notifications.arn}/index/*"
      ]
    }]
  })
}

# DynamoDB Datasource
resource "aws_appsync_datasource" "notifications_ds" {
  api_id           = aws_appsync_graphql_api.notifications_api.id
  name             = "NotificationsDS"
  type             = "AMAZON_DYNAMODB"
  service_role_arn = aws_iam_role.appsync_role.arn

  dynamodb_config {
    table_name = aws_dynamodb_table.notifications.name
  }
}

# None Datasource
resource "aws_appsync_datasource" "none" {
  api_id = aws_appsync_graphql_api.notifications_api.id
  name   = "none"
  type   = "NONE"
}

# Resolvers
resource "aws_appsync_resolver" "send_notifications" {
  api_id      = aws_appsync_graphql_api.notifications_api.id
  type        = "Mutation"
  field       = "sendNotifications"
  data_source = aws_appsync_datasource.notifications_ds.name

  runtime {
    name            = "APPSYNC_JS"
    runtime_version = "1.0.0"
  }

  code = file("${path.module}/../../../dist/resolvers/mutations/mutation.sendNotifications.js")
}

resource "aws_appsync_resolver" "get_notifications" {
  api_id      = aws_appsync_graphql_api.notifications_api.id
  type        = "Query"
  field       = "getNotifications"
  data_source = aws_appsync_datasource.notifications_ds.name

  runtime {
    name            = "APPSYNC_JS"
    runtime_version = "1.0.0"
  }

  code = file("${path.module}/../../../dist/resolvers/query/query.getNotifications.js")
}
