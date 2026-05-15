import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import Link from "next/link"
import { getTranslations } from "@workspace/i18n/server"
import {
  AuthShell,
  AuthShellAside,
  AuthShellBody,
  AuthShellFooter,
  AuthShellHeader,
  AuthShellLeft,
} from "@workspace/ui/blocks/auth-shell"
import {
  AuthAside,
  AuthAsideHeadline,
  AuthAsideQuote,
  AuthAsideSubtitle,
} from "@workspace/ui/blocks/auth-aside"

import { LanguagePicker } from "../_components/language-picker"
import { AuthHeaderLinkProvider } from "../auth/(default)/_components/auth-header-link"
import { AuthHeaderRight } from "../auth/(default)/_components/auth-header-right"
import { OnboardingRoleProvider } from "./_components/onboarding-role-context"
import { WizardProgressClient } from "./_components/wizard-progress-client"
import { detectOnboardingRole } from "./_lib/role"

/**
 * Unified onboarding chrome. Both flows (owner + member) share one
 * route and one layout. Role is detected from cookies at request
 * time and seeded into a client-side context provider so step forms
 * can branch on it without a re-read.
 *
 * Routes are flat under `/onboarding/`:
 *   - profile, experience, password, done — shared
 *   - workspace, plan, team — owner-only (member visits are
 *     redirected to /done by `assertOnStep` in the page).
 *
 * The layout owns:
 *   - the AuthShell chrome (header / footer / aside)
 *   - the wizard progress meter (derived from URL + role)
 *   - the back-link slot (via AuthHeaderLinkProvider — pages can
 *     override the default "return to marketing" link with a
 *     wizard-aware "back to previous step" link).
 *
 * Pages own:
 *   - their own form + page-specific copy
 *   - the optional <AuthHeaderLinkOverride> for back-navigation.
 */
export default async function OnboardingLayout({
  children,
}: {
  children: ReactNode
}) {
  const ctx = await detectOnboardingRole()
  if (!ctx) {
    // Neither signup-cookie nor invite-cookie present — kick to login.
    // Without one of these, the BA user can't be created at step 3, so
    // there's no path forward through the wizard.
    redirect("/auth/login?error=onboarding-session-expired")
  }

  const tBrand = await getTranslations("brand")
  const tLayout = await getTranslations("layout.footer")
  const tAside = await getTranslations("auth.aside")
  const brand = tBrand("name")
  const year = new Date().getFullYear()

  return (
    <AuthHeaderLinkProvider>
      <OnboardingRoleProvider role={ctx.role}>
        <AuthShell>
          <AuthShellLeft>
            <AuthShellHeader>
              <div className="flex w-full items-center justify-between gap-4">
                <span className="text-base font-semibold tracking-tight">
                  {brand}
                </span>
                <AuthHeaderRight
                  defaultHref={tBrand("returnLinkHref")}
                  defaultLabel={tBrand("returnLinkLabel")}
                />
              </div>
            </AuthShellHeader>
            <AuthShellBody>
              <div className="flex flex-col gap-8">
                <WizardProgressClient />
                {children}
              </div>
            </AuthShellBody>
            <AuthShellFooter>
              <div className="flex w-full flex-wrap items-center justify-between gap-3 text-xs">
                <span>
                  © {year} {brand}
                </span>
                <div className="flex items-center gap-4">
                  <Link
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    {tLayout("privacy")}
                  </Link>
                  <Link
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    {tLayout("terms")}
                  </Link>
                  <Link
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    {tLayout("status")}
                  </Link>
                  <LanguagePicker />
                </div>
              </div>
            </AuthShellFooter>
          </AuthShellLeft>
          <AuthShellAside>
            <AuthAside variant="tone">
              <AuthAsideHeadline>{tAside("headline")}</AuthAsideHeadline>
              <AuthAsideSubtitle>
                {tAside("subtitle", { brand })}
              </AuthAsideSubtitle>
              <AuthAsideQuote
                author={tAside("quote.author")}
                role={tAside("quote.role")}
              >
                {tAside("quote.text")}
              </AuthAsideQuote>
            </AuthAside>
          </AuthShellAside>
        </AuthShell>
      </OnboardingRoleProvider>
    </AuthHeaderLinkProvider>
  )
}
