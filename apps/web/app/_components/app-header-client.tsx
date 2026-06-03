"use client"

import { toast } from "sonner"

import { AppHeader, type AppHeaderProps } from "@workspace/ui/blocks/app-header"

/**
 * Thin client wrapper around the AppHeader block: supplies the app-side
 * side effects the presentational block only emits (currently the
 * support-access toast). Firing `toast` here keeps the side effect in the
 * app, so the block stays presentational + reusable.
 */
export function AppHeaderClient(props: AppHeaderProps) {
  return (
    <AppHeader
      {...props}
      onGrantSupportAccessChange={(granted) => {
        if (granted) {
          toast.success("Support access granted", {
            description:
              "Our support team can now view your workspace to help you.",
          })
        }
      }}
    />
  )
}
