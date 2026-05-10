terraform {
  # Backend wired post-bootstrap. See docs/runbooks/AWS-BOOTSTRAP.md step 7.
  backend "s3" {
    bucket         = "<TBD-tofu-state-bucket>"
    key            = "platform/global/terraform.tfstate"
    region         = "<TBD-state-region>"
    dynamodb_table = "<TBD-tofu-lock-table>"
    encrypt        = true
    # kms_key_id   = "<TBD-tofu-state-kms-key>"
    # role_arn     = "arn:aws:iam::<TBD-management-account-id>:role/TofuStateAccess"
  }
}

provider "aws" {
  region = var.aws_region

  # Assume-role wired post-bootstrap. See docs/runbooks/AWS-BOOTSTRAP.md step 6.
  # assume_role {
  #   role_arn     = "<TBD-management-account-role-arn>"
  #   session_name = "tofu-platform"
  # }

  default_tags {
    tags = {
      ManagedBy   = "OpenTofu"
      Repo        = "hlebtkachenko/monorepo"
      Environment = "platform"
    }
  }
}

data "aws_organizations_organization" "current" {}

locals {
  root_id = data.aws_organizations_organization.current.roots[0].id
}

module "ou" {
  source  = "./modules/ou"
  root_id = local.root_id
}

module "scp" {
  source           = "./modules/scp"
  root_id          = local.root_id
  governed_regions = var.governed_regions
}

module "identity_center" {
  source = "./modules/identity-center"
}

module "log_archive" {
  source = "./modules/log-archive"
}

module "network_baseline" {
  source = "./modules/network"
}
