# Module: Service Control Policies
#
# Eight org-wide SCPs attached to the Organizations root. See
# docs/runbooks/AWS-BOOTSTRAP.md step 5 for application guidance and
# docs/plans/AWS-INTEGRATION-PLAN.md (Guardrails) for rationale.
#
# IRREVERSIBLE without maintenance window: DenyNonEURegions. Confirm
# governed_regions before tofu apply.
#
# Control Tower ships its own aws-guardrails-* SCPs; these additions are
# layered on top and do not conflict.

locals {
  policies = {
    deny_non_eu_regions = {
      name        = "DenyNonEURegions"
      description = "Block API calls in regions outside the governed set. NotAction allows global services (IAM, CloudFront, Route53, STS) and read-only billing."
      content = templatefile("${path.module}/policies/deny-non-eu-regions.json.tftpl", {
        regions = jsonencode(var.governed_regions)
      })
    }
    deny_iam_user_create = {
      name        = "DenyIAMUserCreate"
      description = "No long-lived IAM users or access keys. Identity Center + OIDC only."
      content     = file("${path.module}/policies/deny-iam-user-create.json")
    }
    deny_root_user_actions = {
      name        = "DenyRootUserActions"
      description = "Root principal cannot perform any action after bootstrap. Break-glass goes through Identity Center."
      content     = file("${path.module}/policies/deny-root-user-actions.json")
    }
    deny_disable_cloudtrail = {
      name        = "DenyDisableCloudTrail"
      description = "Tamper-proof audit trail. Required for DORA + SOC 2 evidence."
      content     = file("${path.module}/policies/deny-disable-cloudtrail.json")
    }
    deny_disable_config = {
      name        = "DenyDisableConfig"
      description = "Tamper-proof config history. Required for change tracking."
      content     = file("${path.module}/policies/deny-disable-config.json")
    }
    deny_disable_guardduty = {
      name        = "DenyDisableGuardDuty"
      description = "Tamper-proof threat detection."
      content     = file("${path.module}/policies/deny-disable-guardduty.json")
    }
    deny_s3_public_access = {
      name        = "DenyS3PublicAccess"
      description = "Block account- and bucket-level public access toggles + public ACL writes."
      content     = file("${path.module}/policies/deny-s3-public-access.json")
    }
    deny_kms_immediate_delete = {
      name        = "DenyKMSImmediateDelete"
      description = "Force minimum KMS deletion window to give audit recovery time."
      content = templatefile("${path.module}/policies/deny-kms-immediate-delete.json.tftpl", {
        min_window = tostring(var.min_kms_deletion_window_days)
      })
    }
  }
}

resource "aws_organizations_policy" "scp" {
  for_each = local.policies

  name        = each.value.name
  description = each.value.description
  type        = "SERVICE_CONTROL_POLICY"
  content     = each.value.content
}

resource "aws_organizations_policy_attachment" "root" {
  for_each = aws_organizations_policy.scp

  policy_id = each.value.id
  target_id = var.root_id
}
