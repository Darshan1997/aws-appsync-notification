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
