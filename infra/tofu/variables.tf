variable "aws_region" {
  type        = string
  default     = "eu-central-1"
  description = "Primary region. DR region is eu-west-1."
}

variable "org_id" {
  type        = string
  description = "AWS Organizations org id (post-bootstrap; see AWS-BOOTSTRAP runbook step 2)."
}

variable "environment" {
  type        = string
  description = "Logical environment label for tagging (e.g. platform)."
}

variable "governed_regions" {
  type        = list(string)
  default     = ["eu-central-1", "eu-west-1", "us-east-1"]
  description = "Regions allowed by DenyNonEURegions. us-east-1 only for CloudFront/IAM/Route53 endpoints; data-residency stays EU because regional services are denied outside eu-*."
}
