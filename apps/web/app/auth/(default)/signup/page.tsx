import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@workspace/auth/server"
import { TokenError } from "@workspace/auth/tokens"
import { getTranslations } from "@workspace/i18n/server"
import { Button } from "@workspace/ui/components/button"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Heading } from "@workspace/ui/components/heading"
import { Input } from "@workspace/ui/components/input"
import { Text } from "@workspace/ui/components/text"
import { ArrowRightIcon, ArrowUpRight } from "@workspace/ui/lib/icons"

import { readSignupClaims } from "../../../onboarding/_lib/signup-cookie"
import { resolveNextStep, stepPath } from "../../../onboarding/_lib/resume"

export async function generateMetadata() {
  const t = await getTranslations("auth.signup")
  return { title: t("metaTitle") }
}

export default async function SignupWelcomePage() {
  let claims
  try {
    claims = await readSignupClaims()
  } catch (err) {
    if (err instanceof TokenError) {
      redirect("/auth/login?error=" + err.code.toLowerCase())
    }
    throw err
  }
  if (!claims) {
    redirect("/auth/login?error=missing-signup-token")
  }

  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) {
    if (session.user.email.toLowerCase() !== claims.email.toLowerCase()) {
      redirect("/auth/login?error=signup-email-mismatch")
    }
    const next = await resolveNextStep(session.user.id)
    redirect(stepPath(next))
  }

  const t = await getTranslations("auth.signup.welcome")
  const tBrand = await getTranslations("brand")
  const brandName = tBrand("name")

  const next = await resolveNextStep(null)

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <Heading level={2} className="mt-0">
          {t("title")}
        </Heading>
        <Text variant="muted">{t("description", { brand: brandName })}</Text>
      </header>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="signup-email">{t("issuedTo")}</FieldLabel>
          <Input
            id="signup-email"
            type="email"
            inputSize="xl"
            value={claims.email}
            readOnly
            disabled
            autoComplete="username"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="signup-role">{t("role")}</FieldLabel>
          <Input
            id="signup-role"
            inputSize="xl"
            value={t("ownerRole")}
            readOnly
            disabled
          />
        </Field>
      </FieldGroup>

      <Button asChild size="xl">
        <Link href={stepPath(next)}>
          {t("continue")}
          <ArrowRightIcon className="size-4" aria-hidden="true" />
        </Link>
      </Button>

      <Text variant="muted">
        {t("wrongInvite")}{" "}
        <Link
          href="#"
          className="inline-flex items-center gap-0.5 font-medium text-foreground underline-offset-4 hover:underline"
        >
          {t("contactSupport", { brand: brandName })}
          <ArrowUpRight className="size-3" aria-hidden="true" />
        </Link>
      </Text>
    </div>
  )
}
