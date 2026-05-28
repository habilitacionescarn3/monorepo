#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# cost-stop -- scale an env to zero compute cost (ECS desiredCount=0, RDS stopped)
#
# Stops the ECS Fargate service and the RDS DB instance for one environment.
# Tags the RDS instance with `cost-stop-requested=true` so the
# rds-restart-watcher Lambda re-stops it after AWS's mandatory 7-day forced
# restart. Idempotent.
#
# Usage:
#   bash scripts/cost-stop.sh <staging|production>
#   AWS_REGION=eu-central-1 bash scripts/cost-stop.sh staging
#
# Requires AWS credentials with: ecs:ListServices, ecs:DescribeServices,
# ecs:UpdateService, rds:DescribeDBInstances, rds:AddTagsToResource,
# rds:StopDBInstance, tag:GetResources.

usage() {
  cat <<EOF
Usage: $(basename "$0") <staging|production>

Scales the given environment to zero compute cost:
  - ECS Fargate service desiredCount -> 0
  - RDS DB instance stopped (tagged so the watcher re-stops after 7d)

Reverse with: bash scripts/cost-resume.sh <env>
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

  info "[$env_name] scaling to zero in region $region"

  stop_ecs "$cluster" "$region"
  stop_rds "$env_name" "$region"

  info "[$env_name] scale-to-zero complete"
}

stop_ecs() {
  local cluster="$1" region="$2"
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
  local current_dc
  current_dc=$(aws ecs describe-services \
    --cluster "$cluster" \
    --services "$service_name" \
    --region "$region" \
    --query 'services[0].desiredCount' \
    --output text)
  info "  ECS: $cluster/$service_name desiredCount=$current_dc"

  if [ "$current_dc" = "0" ]; then
    info "  ECS: already at 0, no-op"
    return 0
  fi

  aws ecs update-service \
    --cluster "$cluster" \
    --service "$service_name" \
    --desired-count 0 \
    --region "$region" >/dev/null
  info "  ECS: stopped (desiredCount=0)"
}

stop_rds() {
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
  info "  RDS: tagging $db_id cost-stop-requested=true (so watcher re-stops after 7d forced restart)"
  aws rds add-tags-to-resource \
    --resource-name "$db_arn" \
    --tags "Key=cost-stop-requested,Value=true" \
    --region "$region"

  local status
  status=$(aws rds describe-db-instances \
    --db-instance-identifier "$db_id" \
    --region "$region" \
    --query 'DBInstances[0].DBInstanceStatus' \
    --output text)
  info "  RDS: $db_id status=$status"

  case "$status" in
    available)
      aws rds stop-db-instance \
        --db-instance-identifier "$db_id" \
        --region "$region" >/dev/null
      info "  RDS: stop initiated"
      ;;
    stopped|stopping)
      info "  RDS: already $status, no-op"
      ;;
    *)
      warn "  RDS: status=$status not stoppable right now; tag will trigger re-stop on next restart"
      ;;
  esac
}

main "$@"
