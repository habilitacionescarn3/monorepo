"use client"

import * as React from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { useIcons } from "@workspace/ui/icon-packs"
import { cn } from "@workspace/ui/lib/utils"

export interface AppHeaderProps {
  /** Placeholder for the centered search input. */
  searchPlaceholder?: string
  /** Unread inbox count — badge hidden when 0 / undefined. */
  inboxCount?: number
  /** Open task count — badge hidden when 0 / undefined. */
  taskCount?: number
  /** Display name, used for the avatar fallback initials + alt text. */
  userName?: string
  /** Avatar image URL. */
  userImage?: string
  className?: string
}

function initialsOf(name: string | undefined): string {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?"
}

/**
 * App-shell header bar. Fills the AppShell `header` slot (rail → right
 * inset, --shell-header-height tall). Three zones:
 *   - left:   empty for now
 *   - center: search input
 *   - right (left→right): inbox, tasks, help, settings, avatar
 *
 * Icons resolve from the active `IconProvider` pack (must be mounted
 * above). Colors match the rail surface (#4E5255 controls, #808689
 * search glyph) rather than the global shadcn tokens.
 */
export function AppHeader({
  searchPlaceholder = "Search…",
  inboxCount,
  taskCount,
  userName,
  userImage,
  className,
}: AppHeaderProps) {
  const icons = useIcons()
  const SearchIcon = icons.Search
  const InboxIcon = icons.Inbox
  const TasksIcon = icons.ListChecksIcon
  const HelpIcon = icons.CircleHelp
  const SettingsIcon = icons.Settings

  return (
    <div
      data-slot="app-header"
      className={cn("flex h-full w-full items-center gap-2 px-3", className)}
    >
      {/* Left: intentionally empty for now. */}
      <div className="flex-1" />

      {/* Center: search. */}
      <div className="relative w-full max-w-md">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-[#808689]" />
        <Input
          type="search"
          aria-label="Search"
          placeholder={searchPlaceholder}
          className="h-8 pl-8"
        />
      </div>

      {/* Right (left→right): inbox, tasks, help, settings, avatar. */}
      <div className="flex flex-1 items-center justify-end gap-0.5">
        <HeaderIconButton label="Inbox" count={inboxCount}>
          <InboxIcon className="size-4" />
        </HeaderIconButton>
        <HeaderIconButton label="Tasks" count={taskCount}>
          <TasksIcon className="size-4" />
        </HeaderIconButton>
        <HeaderIconButton label="Help">
          <HelpIcon className="size-4" />
        </HeaderIconButton>
        <HeaderIconButton label="Settings">
          <SettingsIcon className="size-4" />
        </HeaderIconButton>
        <Avatar className="ml-1 size-7">
          <AvatarImage src={userImage} alt={userName ?? "Account"} />
          <AvatarFallback className="text-xs">
            {initialsOf(userName)}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

function HeaderIconButton({
  label,
  count,
  children,
}: {
  label: string
  count?: number
  children: React.ReactNode
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      className="relative size-8 text-[#4E5255]"
    >
      {children}
      {count !== undefined && count > 0 && (
        <span
          data-slot="app-header-badge"
          className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#4E5255] px-1 text-[10px] leading-none font-medium text-white"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Button>
  )
}
