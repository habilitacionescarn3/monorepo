"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { PasswordInput } from "@workspace/ui/components/password-input"
import { Text } from "@workspace/ui/components/text"
import { ArrowLeft, Copy, Check } from "@workspace/ui/lib/icons"

type Stage = "password" | "verify"

interface EnrollState {
  totpURI: string
  secret: string
}

export function MfaSetupForm() {
  const router = useRouter()
  const t = useTranslations("auth.mfa.setup")
  const tValidation = useTranslations("auth.validation")

  const [stage, setStage] = useState<Stage>("password")
  const [password, setPassword] = useState("")
  const [enroll, setEnroll] = useState<EnrollState | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSubmitting, setPasswordSubmitting] = useState(false)
  const [copied, setCopied] = useState<"uri" | "secret" | null>(null)

  const otpForm = useForm<OTPInput>({
    resolver: zodResolver(OTPSchema),
    defaultValues: { code: "" },
    mode: "onSubmit",
  })
  const [otpServerError, setOtpServerError] = useState<string | null>(null)
  const code = otpForm.watch("code")

  async function onSubmitPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPasswordError(null)
    setPasswordSubmitting(true)
    try {
      const result = await authClient.twoFactor.enable({ password })
      if (result.error) {
        setPasswordError(result.error.message ?? t("password.errorGeneric"))
        setPasswordSubmitting(false)
        return
      }
      const totpURI = (result.data as { totpURI?: string } | null)?.totpURI
      if (!totpURI) {
        setPasswordError(t("password.errorMissingUri"))
        setPasswordSubmitting(false)
        return
      }
      setEnroll({ totpURI, secret: extractSecret(totpURI) })
      setStage("verify")
    } catch (err) {
      setPasswordError((err as Error).message ?? t("password.errorGeneric"))
    } finally {
      setPasswordSubmitting(false)
    }
  }

  function translateOtpValidation(msg: string | undefined): string | undefined {
    if (!msg) return undefined
    if (msg.startsWith("otp.")) return tValidation(msg)
    return msg
  }

  async function onSubmitVerify(values: OTPInput) {
    setOtpServerError(null)
    try {
      const result = await authClient.twoFactor.verifyTotp({
        code: values.code,
      })
      if (result.error) {
        setOtpServerError(result.error.message ?? t("verify.errorGeneric"))
        return
      }
      router.push("/workspace/profile?mfa=enabled")
    } catch (err) {
      setOtpServerError((err as Error).message ?? t("verify.errorGeneric"))
    }
  }

  async function copyValue(value: string, which: "uri" | "secret") {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(which)
      setTimeout(() => setCopied((c) => (c === which ? null : c)), 1500)
    } catch {
      // clipboard may be unavailable (insecure context); silently ignore
    }
  }

  if (stage === "password") {
    return (
      <div className="flex flex-col gap-8">
        <Link
          href="/workspace/profile"
          className="inline-flex items-center gap-1 self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("backToProfile")}
        </Link>

        <header className="flex flex-col gap-2">
          <Heading level={2} className="mt-0">
            {t("password.title")}
          </Heading>
          <Text variant="muted">{t("password.description")}</Text>
        </header>

        <form
          onSubmit={onSubmitPassword}
          className="flex flex-col gap-5"
          noValidate
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="mfa-password">
                {t("password.label")}
              </FieldLabel>
              <PasswordInput
                id="mfa-password"
                autoComplete="current-password"
                autoFocus
                inputSize="xl"
                value={password}
                onValueChange={setPassword}
                required
              />
            </Field>
          </FieldGroup>

          {passwordError && (
            <Text variant="small" className="text-destructive" role="alert">
              {passwordError}
            </Text>
          )}

          <Button
            type="submit"
            size="xl"
            disabled={passwordSubmitting || password.length === 0}
          >
            {passwordSubmitting
              ? t("password.submitting")
              : t("password.submit")}
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <button
        type="button"
        onClick={() => {
          setStage("password")
          setEnroll(null)
          otpForm.reset({ code: "" })
          setOtpServerError(null)
        }}
        className="inline-flex items-center gap-1 self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t("backToProfile")}
      </button>

      <header className="flex flex-col gap-2">
        <Heading level={2} className="mt-0">
          {t("verify.title")}
        </Heading>
        <Text variant="muted">{t("verify.description")}</Text>
      </header>

      {enroll && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">{t("verify.uriLabel")}</span>
            <div className="flex items-stretch gap-2">
              <code className="flex-1 rounded-lg border border-input bg-muted/40 p-3 text-xs break-all">
                {enroll.totpURI}
              </code>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => copyValue(enroll.totpURI, "uri")}
                aria-label={t("verify.copy")}
              >
                {copied === "uri" ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  <Copy className="size-4" aria-hidden="true" />
                )}
                {copied === "uri" ? t("verify.copied") : t("verify.copy")}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">
              {t("verify.secretLabel")}
            </span>
            <div className="flex items-stretch gap-2">
              <code className="flex-1 rounded-lg border border-input bg-muted/40 p-3 text-xs break-all">
                {enroll.secret}
              </code>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => copyValue(enroll.secret, "secret")}
                aria-label={t("verify.copy")}
              >
                {copied === "secret" ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  <Copy className="size-4" aria-hidden="true" />
                )}
                {copied === "secret" ? t("verify.copied") : t("verify.copy")}
              </Button>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={otpForm.handleSubmit(onSubmitVerify)}
        className="flex flex-col gap-5"
        noValidate
      >
        <FieldGroup>
          <Field
            data-invalid={otpForm.formState.errors.code ? "true" : undefined}
          >
            <FieldLabel htmlFor="mfa-otp">{t("verify.label")}</FieldLabel>
            <InputOTP
              id="mfa-otp"
              maxLength={6}
              value={code}
              onChange={(v) =>
                otpForm.setValue("code", v, { shouldValidate: false })
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
            {otpForm.formState.errors.code && (
              <FieldError>
                {translateOtpValidation(otpForm.formState.errors.code.message)}
              </FieldError>
            )}
          </Field>
        </FieldGroup>

        {otpServerError && (
          <Text variant="small" className="text-destructive" role="alert">
            {otpServerError}
          </Text>
        )}

        <Button
          type="submit"
          size="xl"
          disabled={otpForm.formState.isSubmitting || code.length !== 6}
        >
          {otpForm.formState.isSubmitting
            ? t("verify.submitting")
            : t("verify.submit")}
        </Button>
      </form>
    </div>
  )
}

function extractSecret(totpURI: string): string {
  try {
    const url = new URL(totpURI)
    return url.searchParams.get("secret") ?? ""
  } catch {
    return ""
  }
}
