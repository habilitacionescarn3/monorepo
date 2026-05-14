"use client"

import { useState } from "react"
import { LogOut, KeyRound, ChevronDown } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import {
  requestOwnPasswordResetAction,
  signOutAction,
} from "../_lib/account-actions"

interface Props {
  email: string
}

export function AccountMenu({ email }: Props) {
  const [resetStatus, setResetStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle")

  async function onResetClick() {
    setResetStatus("sending")
    const result = await requestOwnPasswordResetAction()
    setResetStatus(result.ok ? "sent" : "error")
    // Auto-reset back to idle after a few seconds so the menu is
    // ready for re-use on the same page.
    setTimeout(() => setResetStatus("idle"), 6000)
  }

  return (
    <div className="flex flex-col gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="justify-between gap-2">
            <span className="max-w-[160px] truncate">{email}</span>
            <ChevronDown className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Signed in</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault()
              onResetClick()
            }}
          >
            <KeyRound className="size-4" aria-hidden="true" />
            <span>Reset password</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <form action={signOutAction}>
            <DropdownMenuItem asChild>
              <button type="submit" className="w-full cursor-pointer">
                <LogOut className="size-4" aria-hidden="true" />
                <span>Sign out</span>
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>

      {resetStatus === "sending" && (
        <p className="text-xs text-muted-foreground">Sending reset email…</p>
      )}
      {resetStatus === "sent" && (
        <p className="text-xs text-muted-foreground">
          Reset link sent. Check your email (or your dev-server console).
        </p>
      )}
      {resetStatus === "error" && (
        <p className="text-xs text-destructive">
          Could not send reset email. Try again.
        </p>
      )}
    </div>
  )
}
