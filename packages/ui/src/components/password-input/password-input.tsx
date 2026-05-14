"use client"

import * as React from "react"
import { Eye, EyeOff, Sparkles } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

const GENERATE_CHARSET =
  "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*"

function generatePassword(length = 16): string {
  const charset = GENERATE_CHARSET
  const values = new Uint32Array(length)

  if (
    typeof crypto !== "undefined" &&
    typeof crypto.getRandomValues === "function"
  ) {
    crypto.getRandomValues(values)
  } else {
    // Fallback: less secure — avoid in production environments
    for (let i = 0; i < length; i++) {
      values[i] = Math.floor(Math.random() * 0x100000000)
    }
  }

  return Array.from(values, (v) => charset[v % charset.length]).join("")
}

export interface PasswordInputProps extends Omit<
  React.ComponentProps<"input">,
  "type" | "onChange"
> {
  value?: string
  onValueChange?: (next: string) => void
  showGenerate?: boolean
  onGenerate?: (pw: string) => void
  autoComplete?: "new-password" | "current-password"
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      value,
      onValueChange,
      showGenerate = false,
      onGenerate,
      id,
      name,
      required,
      disabled,
      autoComplete = "current-password",
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = React.useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      onValueChange?.(e.target.value)
    }

    function handleToggleVisibility() {
      setVisible((v) => !v)
    }

    function handleGenerate() {
      const pw = generatePassword(16)
      onGenerate?.(pw)
      onValueChange?.(pw)
    }

    return (
      <TooltipProvider>
        <InputGroup className={cn(className)}>
          <InputGroupInput
            ref={ref}
            id={id}
            name={name}
            type={visible ? "text" : "password"}
            value={value}
            onChange={handleChange}
            required={required}
            disabled={disabled}
            autoComplete={autoComplete}
            {...props}
          />

          <InputGroupAddon align="inline-end" className="gap-0.5">
            {showGenerate && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <InputGroupButton
                    type="button"
                    aria-label="Generate password"
                    onClick={handleGenerate}
                    disabled={disabled}
                  >
                    <Sparkles className="size-3.5" />
                  </InputGroupButton>
                </TooltipTrigger>
                <TooltipContent side="top">Generate password</TooltipContent>
              </Tooltip>
            )}

            <InputGroupButton
              type="button"
              aria-label={visible ? "Hide password" : "Show password"}
              onClick={handleToggleVisibility}
              disabled={disabled}
            >
              {visible ? (
                <Eye className="size-3.5" />
              ) : (
                <EyeOff className="size-3.5" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </TooltipProvider>
    )
  },
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
