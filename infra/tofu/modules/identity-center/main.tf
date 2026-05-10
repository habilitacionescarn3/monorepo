# Module: IAM Identity Center
#
# - Identity source: built-in Identity Center directory (no SAML, no external IdP).
#   Switch to SAML/SCIM later if team grows; users migrate, permission sets stay.
# - Permission sets:
#     AdministratorAccess (break-glass only, MFA + 1h session)
#     PowerUserAccess     (MFA, PT4H session)
#     ReadOnlyAccess
#     BillingViewer
# - Account assignments per OU (Security, Workloads/Prod, Workloads/Non-Prod).
# - Prod-touching sets: PT4H session, MFA required.
#
# Implementation deferred until post-bootstrap. See:
#   docs/plans/AWS-INTEGRATION-PLAN.md (Identity section)
#   docs/runbooks/AWS-BOOTSTRAP.md step 6
