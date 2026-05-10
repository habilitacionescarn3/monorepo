variable "root_id" {
  type        = string
  description = "AWS Organizations root ID. SCPs attach here to cover every member account."
}

variable "governed_regions" {
  type        = list(string)
  default     = ["eu-central-1", "eu-west-1", "us-east-1"]
  description = "Regions allowed by DenyNonEURegions. us-east-1 included only because CloudFront, IAM, Route53 endpoints route through it; data residency stays EU because regional services are blocked outside eu-*."
}

variable "min_kms_deletion_window_days" {
  type        = number
  default     = 30
  description = "Minimum PendingWindowInDays accepted by DenyKMSImmediateDelete. AWS allows 7-30; we lock to 30 for audit recovery."
}
