terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.0.0"
    }
  }
}

provider "aws" {
  region     = "us-east-1"
}

resource "aws_dynamodb_table" "notifications" {
  name         = "notifications"
  billing_mode = "PROVISIONED"
  hash_key     = "notificationId"

  attribute {
    name = "notificationId"
    type = "S"
  }

  read_capacity  = 5
  write_capacity = 5
}

# AppSync API
resource "aws_appsync_graphql_api" "notifications_api" {
  name                = "poc-notifications-api"
  authentication_type = "API_KEY"
  schema              = file("${path.module}/schema.graphql")
}

# API Key
resource "aws_appsync_api_key" "api_key" {
  api_id = aws_appsync_graphql_api.notifications_api.id
}

# IAM Role for DynamoDB access
resource "aws_iam_role" "appsync_role" {
  name = "appsync-dynamodb-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "appsync.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "appsync_policy" {
  role = aws_iam_role.appsync_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = ["dynamodb:*"]
      Resource = [
        aws_dynamodb_table.notifications.arn,
        "${aws_dynamodb_table.notifications.arn}/index/*"
      ]
    }]
  })
}

resource "aws_appsync_datasource" "notifications_ds" {
  api_id           = aws_appsync_graphql_api.notifications_api.id
  name             = "NotificationsDS"
  type             = "AMAZON_DYNAMODB"
  service_role_arn = aws_iam_role.appsync_role.arn

  dynamodb_config {
    table_name = aws_dynamodb_table.notifications.name
  }
}

resource "aws_appsync_datasource" "none" {
  api_id = aws_appsync_graphql_api.notifications_api.id
  name   = "none"
  type   = "NONE"
}

resource "aws_appsync_resolver" "send_notifications" {
  api_id      = aws_appsync_graphql_api.notifications_api.id
  type        = "Mutation"
  field       = "sendNotifications"
  data_source = aws_appsync_datasource.notifications_ds.name

  runtime {
    name            = "APPSYNC_JS"
    runtime_version = "1.0.0"
  }

  code = file("${path.module}/../dist/resolvers/sendNotifications.js")
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

  code = file("${path.module}/../dist/resolvers/getNotifications.js")
}
