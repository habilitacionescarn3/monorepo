output "infrastructure_id" {
  value       = aws_organizations_organizational_unit.infrastructure.id
  description = "Infrastructure OU ID."
}

output "workloads_id" {
  value       = aws_organizations_organizational_unit.workloads.id
  description = "Workloads OU ID."
}

output "workloads_prod_id" {
  value       = aws_organizations_organizational_unit.workloads_prod.id
  description = "Workloads/Prod sub-OU ID."
}

output "workloads_non_prod_id" {
  value       = aws_organizations_organizational_unit.workloads_non_prod.id
  description = "Workloads/Non-Prod sub-OU ID."
}

output "sandbox_id" {
  value       = aws_organizations_organizational_unit.sandbox.id
  description = "Sandbox OU ID."
}

output "suspended_id" {
  value       = aws_organizations_organizational_unit.suspended.id
  description = "Suspended OU ID."
}
