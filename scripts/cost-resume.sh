#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# cost-resume -- bring an env back online after cost-stop.sh
#
# Starts the RDS DB instance and sets the ECS Fargate service desiredCount.
# Removes the cost-stop-requested tag so the watcher won't re-stop the DB.
#
# Usage:
#   bash scripts/cost-resume.sh <staging|production>
#   RESUME_DESIRED_COUNT=1 bash scripts/cost-resume.sh staging
#
# Requires AWS credentials with: ecs:ListServices, ecs:UpdateService,
# rds:DescribeDBInstances, rds:RemoveTagsFromResource, rds:StartDBInstance,
# tag:GetResources.

usage() {
  cat <<EOF
Usage: $(basename "$0") <staging|production>

Resumes the given environment after cost-stop:
  - Removes cost-stop-requested tag from RDS
  - Starts the RDS DB instance
  - ECS Fargate service desiredCount -> \$RESUME_DESIRED_COUNT (default 1)

DB takes ~5 min to be available; ECS tasks won't be healthy until then.
EOF
}

info() { printf '\033[1;34minfo\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33mwarn\033[0m %s\n' "$*" >&2; }
err()  { printf '\033[1;31merr\033[0m  %s\n' "$*" >&2; exit 1; }

main() {
  if [ $# -ne 1 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    usage
    [ $# -eq 1 ] && [ "$1" != "-h" ] && [ "$1" != "--help" ] && exit 2
    exit 0
  fi

  local env_name="$1"
  case "$env_name" in
    staging|production) ;;
    *) err "unknown env: $env_name (expected staging or production)";;
  esac

  local region="${AWS_REGION:-eu-central-1}"
  local cluster="monorepo-${env_name}"
  local desired_count="${RESUME_DESIRED_COUNT:-1}"

  info "[$env_name] resuming in region $region"

  start_rds "$env_name" "$region"
  start_ecs "$cluster" "$region" "$desired_count"

  info "[$env_name] resume initiated (DB ~5 min, then ECS tasks ~3-5 min to healthy)"
}

start_rds() {
  local env_name="$1" region="$2"
  local db_arn
  db_arn=$(aws resourcegroupstaggingapi get-resources \
    --resource-type-filters "rds:db" \
    --tag-filters "Key=Environment,Values=$env_name" \
    --region "$region" \
    --query 'ResourceTagMappingList[0].ResourceARN' \
    --output text 2>/dev/null || echo "")

  if [ -z "$db_arn" ] || [ "$db_arn" = "None" ]; then
    warn "  RDS: no DB tagged Environment=$env_name, skipping"
    return 0
  fi

  local db_id="${db_arn##*:}"
  info "  RDS: removing cost-stop-requested tag from $db_id"
  aws rds remove-tags-from-resource \
    --resource-name "$db_arn" \
    --tag-keys cost-stop-requested \
    --region "$region" || true

  local status
  status=$(aws rds describe-db-instances \
    --db-instance-identifier "$db_id" \
    --region "$region" \
    --query 'DBInstances[0].DBInstanceStatus' \
    --output text)
  info "  RDS: $db_id status=$status"

  case "$status" in
    stopped)
      aws rds start-db-instance \
        --db-instance-identifier "$db_id" \
        --region "$region" >/dev/null
      info "  RDS: start initiated"
      ;;
    available|starting)
      info "  RDS: already $status, no-op"
      ;;
    *)
      warn "  RDS: status=$status, not startable right now"
      ;;
  esac
}

start_ecs() {
  local cluster="$1" region="$2" desired_count="$3"
  local service_arn
  service_arn=$(aws ecs list-services \
    --cluster "$cluster" \
    --region "$region" \
    --query 'serviceArns[0]' \
    --output text 2>/dev/null || echo "")

  if [ -z "$service_arn" ] || [ "$service_arn" = "None" ]; then
    warn "  ECS: no service in cluster $cluster, skipping"
    return 0
  fi

  local service_name="${service_arn##*/}"
  info "  ECS: setting $cluster/$service_name desiredCount=$desired_count"
  aws ecs update-service \
    --cluster "$cluster" \
    --service "$service_name" \
    --desired-count "$desired_count" \
    --region "$region" >/dev/null
  info "  ECS: resume initiated"
}

main "$@"
