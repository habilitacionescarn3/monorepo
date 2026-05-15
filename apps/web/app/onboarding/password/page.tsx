import { redirect } from "next/navigation"
import { getTranslations } from "@workspace/i18n/server"

import { detectOnboardingRole } from "../_lib/role"
import { readOnboardingState } from "../_lib/state-cookie"
import { PasswordForm } from "./password-form"

export async function generateMetadata() {
  const t = await getTranslations("onboarding.password")
  return { title: t("metaTitle") }
}

export default async function PasswordPage() {
  const ctx = await detectOnboardingRole()
  // Layout already redirects on missing role context, but guard anyway
  // to satisfy the type narrowing here.
  if (!ctx) redirect("/auth/login?error=onboarding-session-expired")

  const state = await readOnboardingState()
  if (!state.profile) redirect("/onboarding/profile")
  if (!state.experience) redirect("/onboarding/experience")

  return <PasswordForm email={ctx.email} role={ctx.role} />
}
