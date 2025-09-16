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
