import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@workspace/auth/server"
import { getTranslations } from "@workspace/i18n/server"

import { assertOnStep } from "../_lib/resume"
import { detectOnboardingRole } from "../_lib/role"
import { PlanForm } from "./plan-form"

export async function generateMetadata() {
  const t = await getTranslations("onboarding.plan")
  return { title: t("metaTitle") }
}

export default async function PlanPage() {
  const ctx = await detectOnboardingRole()
  if (!ctx) redirect("/auth/login?error=onboarding-session-expired")

  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    redirect("/onboarding/password")
  }
  await assertOnStep(session.user.id, ctx.role, "plan")

  return <PlanForm />
}
