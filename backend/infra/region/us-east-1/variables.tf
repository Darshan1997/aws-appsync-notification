variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "table_name" {
  description = "DynamoDB table name"
  type        = string
  default     = "notifications"
}

variable "appsync_api_name" {
  description = "AppSync GraphQL API name"
  type        = string
  default     = "poc-notifications-api"
}

variable "read_capacity" {
  description = "DynamoDB read capacity units"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "DynamoDB write capacity units"
  type        = number
  default     = 5
}
