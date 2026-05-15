import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@workspace/auth/server"
import { getTranslations } from "@workspace/i18n/server"

import { readInviteClaims } from "../../../onboarding/_lib/invite-cookie"
import { InviteWelcomeActions } from "./invite-welcome-actions"

export async function generateMetadata() {
  const t = await getTranslations("auth.invite")
  return { title: t("metaTitle") }
}

export default async function InviteWelcomePage() {
  const claims = await readInviteClaims()
  if (!claims) {
    redirect("/auth/login?error=missing-invite-token")
  }

  const session = await auth.api.getSession({ headers: await headers() })
  const sessionEmail = session?.user.email?.toLowerCase() ?? null
  const inviteEmail = claims.email.toLowerCase()
  const isSignedIn = !!sessionEmail
  const matchesSession = sessionEmail === inviteEmail

  return (
    <InviteWelcomeActions
      email={claims.email}
      role={claims.role}
      isSignedIn={isSignedIn}
      matchesSession={matchesSession}
      sessionEmail={session?.user.email ?? null}
    />
  )
}
