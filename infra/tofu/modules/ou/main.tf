# Module: AWS Organizations OU structure
#
# Org tree:
#   Root
#   ├── Security        (Log Archive, Audit accounts; Control Tower managed)
#   ├── Infrastructure  (shared services: ECR, networking, transit gateway)
#   ├── Workloads
#   │   ├── Prod        (production workload accounts)
#   │   └── Non-Prod    (staging, dev workload accounts)
#   ├── Sandbox         (experimentation, auto-cleanup)
#   └── Suspended       (revoked, retained for audit)
#
# Control Tower creates the `Security` OU automatically during landing-zone
# setup (step 3). Importing it here makes that placement explicit. The
# remaining OUs are created by this module at step 4.
#
# See docs/runbooks/AWS-BOOTSTRAP.md step 4 and
# docs/plans/AWS-INTEGRATION-PLAN.md (Org section).

resource "aws_organizations_organizational_unit" "infrastructure" {
  name      = "Infrastructure"
  parent_id = var.root_id
}

resource "aws_organizations_organizational_unit" "workloads" {
  name      = "Workloads"
  parent_id = var.root_id
}

resource "aws_organizations_organizational_unit" "workloads_prod" {
  name      = "Prod"
  parent_id = aws_organizations_organizational_unit.workloads.id
}

resource "aws_organizations_organizational_unit" "workloads_non_prod" {
  name      = "Non-Prod"
  parent_id = aws_organizations_organizational_unit.workloads.id
}

resource "aws_organizations_organizational_unit" "sandbox" {
  name      = "Sandbox"
  parent_id = var.root_id
}

resource "aws_organizations_organizational_unit" "suspended" {
  name      = "Suspended"
  parent_id = var.root_id
}
