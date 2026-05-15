"use client"

import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { authClient } from "@workspace/auth/client"
import { useTranslations } from "@workspace/i18n/client"
import { OTPSchema, type OTPInput } from "@workspace/shared/auth"
import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Heading } from "@workspace/ui/components/heading"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp"
import { Text } from "@workspace/ui/components/text"
import { ArrowLeft } from "@workspace/ui/lib/icons"

import { AuthHeaderLinkOverride } from "../../_components/auth-header-link"
import { clearLoginEmailAction } from "../actions"

interface Props {
  email: string
}

export function LoginMfaForm({ email }: Props) {
  const router = useRouter()
  const search = useSearchParams()
  const next = search.get("next") ?? "/workspace"

  const t = useTranslations("auth.login.mfa")
  const tValidation = useTranslations("auth.validation")
  const tErrors = useTranslations("auth.errors")

  const form = useForm<OTPInput>({
    resolver: zodResolver(OTPSchema),
    defaultValues: { code: "" },
    mode: "onSubmit",
  })

  const [serverError, setServerError] = useState<string | null>(null)

  function translateValidation(msg: string | undefined): string | undefined {
    if (!msg) return undefined
    if (msg.startsWith("otp.")) return tValidation(msg)
    return msg
  }

  async function onSubmit(values: OTPInput) {
    setServerError(null)
    try {
      const result = await authClient.twoFactor.verifyTotp({
        code: values.code,
      })
      if (result.error) {
        setServerError(result.error.message ?? tErrors("invalidCode"))
        return
      }
      await clearLoginEmailAction()
      router.push(next)
    } catch (err) {
      setServerError((err as Error).message ?? tErrors("invalidCode"))
    }
  }

  const backIcon = useMemo(
    () => <ArrowLeft className="size-4" aria-hidden="true" />,
    [],
  )

  const code = form.watch("code")

  return (
    <div className="flex flex-col gap-8">
      <AuthHeaderLinkOverride
        href="/auth/login"
        label={t("tryAnotherMethod")}
        icon={backIcon}
      />

      <header className="flex flex-col gap-2">
        <Heading level={2} className="mt-0">
          {t("title")}
        </Heading>
        <Text variant="muted">{t("description")}</Text>
        <Text variant="small" className="text-muted-foreground">
          {email}
        </Text>
      </header>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        noValidate
      >
        <FieldGroup>
          <Field data-invalid={form.formState.errors.code ? "true" : undefined}>
            <FieldLabel htmlFor="otp">{t("label")}</FieldLabel>
            <InputOTP
              id="otp"
              maxLength={6}
              value={code}
              onChange={(v) =>
                form.setValue("code", v, { shouldValidate: false })
              }
              autoFocus
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {form.formState.errors.code && (
              <FieldError>
                {translateValidation(form.formState.errors.code.message)}
              </FieldError>
            )}
          </Field>
        </FieldGroup>

        {serverError && (
          <Text variant="small" className="text-destructive" role="alert">
            {serverError}
          </Text>
        )}

        <Button
          type="submit"
          size="xl"
          disabled={form.formState.isSubmitting || code.length !== 6}
        >
          {form.formState.isSubmitting ? t("submitting") : t("submit")}
        </Button>
      </form>
    </div>
  )
}
