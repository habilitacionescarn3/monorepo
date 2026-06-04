"use client"

import { type ReactNode, useState } from "react"
import { toast } from "sonner"

import { BrandName, SidekickMark } from "@workspace/ui/brand-assets"
import { useAppShell } from "@workspace/ui/blocks/app-shell"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { IconButton } from "@workspace/ui/components/icon-button"
import { Switch } from "@workspace/ui/components/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { useIcons } from "@workspace/ui/icon-packs"

// Gap between a header dropdown and its trigger — the same 8px the shell
// uses for its page-edge insets, so menus sit on the same spacing grid.
const MENU_GAP = 8

export interface OrgHeaderActionsProps {
  /** Display name — drives the profile avatar fallback initials. */
  userName?: string
  /** Profile avatar image URL; falls back to initials when absent. */
  userImage?: string
  /** Build version string (from server `getBuildVersion()`), shown in Help. */
  version?: string
}

/** First initials of the first + last name word, uppercased. */
function initialsOf(name: string | undefined): string {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : ""
  return (first + last).toUpperCase() || "?"
}

/**
 * Wraps a dropdown trigger in a bottom tooltip. IconButton's built-in
 * tooltip can't be used here (it returns a Provider tree, which can't also
 * be a DropdownMenuTrigger asChild target), so the tooltip is composed
 * around the trigger once, here, instead of inline per menu.
 */
function HeaderMenuTrigger({
  tooltip,
  children,
}: {
  tooltip: string
  children: ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={4}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}

/**
 * Org-surface action cluster for the AppHeader `actions` slot. Composes
 * the shared primitives (IconButton, DropdownMenu, Switch, Avatar) and
 * owns the org's product content + side effects (the support-access
 * toast, the Sidekick → assistant toggle). Admin / other surfaces supply
 * their own cluster.
 */
export function OrgHeaderActions({
  userName,
  userImage,
  version,
}: OrgHeaderActionsProps) {
  const icons = useIcons()
  const shell = useAppShell()
  const [supportAccess, setSupportAccess] = useState(false)

  const DocsIcon = icons.FileText
  const KnowledgeIcon = icons.BookOpen
  const ContactIcon = icons.MessageCircle
  const KeyboardIcon = icons.Keyboard
  const WhatsNewIcon = icons.GitPullRequestArrow
  const StatusIcon = icons.Activity
  const ExternalIcon = icons.ArrowUpRight
  const InfoIcon = icons.Info

  const setSupport = (next: boolean) => {
    setSupportAccess(next)
    if (next) {
      toast.success("Support access granted", {
        description:
          "Our support team can now view your workspace to help you.",
      })
    }
  }

  return (
    <TooltipProvider delayDuration={200}>
      <GetStartedButton />
      <IconButton icon="Inbox" tooltip="Inbox" tooltipSide="bottom" />
      <IconButton icon="ListTodo" tooltip="Tasks" tooltipSide="bottom" />

      <DropdownMenu modal={false}>
        <HeaderMenuTrigger tooltip="Help">
          <IconButton icon="CircleHelp" aria-label="Help" />
        </HeaderMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={MENU_GAP}
          className="w-[180px] [&_[data-slot=dropdown-menu-item]]:text-[length:var(--menu-text-size)]"
        >
          {/* TODO(org-header): wire real destinations/handlers — placeholders. */}
          <DropdownMenuItem>
            <DocsIcon />
            Documentation
            <ExternalIcon className="ml-auto size-3" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <KnowledgeIcon />
            Knowledge base
            <ExternalIcon className="ml-auto size-3" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ContactIcon />
            Contact us
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <KeyboardIcon />
            Keyboard shortcuts
          </DropdownMenuItem>
          <DropdownMenuItem>
            <WhatsNewIcon />
            What&apos;s new?
          </DropdownMenuItem>
          <DropdownMenuItem>
            <StatusIcon />
            <BrandName /> status
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* Grant support access — a real menuitem so it joins the menu's
              roving focus (keyboard reachable). Enter or click toggles; the
              Switch is presentational (pointer-events-none + aria-label) and
              `onSelect` preventDefault keeps the menu open. */}
          <DropdownMenuItem
            className="justify-between"
            onSelect={(e) => {
              e.preventDefault()
              setSupport(!supportAccess)
            }}
          >
            <span className="flex items-center gap-1">
              Grant support access
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label="About support access"
                    tabIndex={-1}
                    className="inline-flex text-muted-foreground outline-none"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <InfoIcon className="size-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-52">
                  Lets our support team sign in to your workspace to help
                  troubleshoot. Turn it off any time.
                </TooltipContent>
              </Tooltip>
            </span>
            <Switch
              checked={supportAccess}
              onCheckedChange={setSupport}
              aria-label="Grant support access"
              tabIndex={-1}
              className="pointer-events-none"
            />
          </DropdownMenuItem>
          <DropdownMenuItem>Send feedback</DropdownMenuItem>
          <div className="px-1.5 py-1 text-[length:var(--menu-text-size)]">
            Version: {version ?? "dev"}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <IconButton
        iconNode={<SidekickMark />}
        aria-label="Ask AI Assistant"
        tooltip="Ask AI Assistant"
        tooltipSide="bottom"
        onClick={() => shell?.toggleAssistant()}
      />

      <DropdownMenu modal={false}>
        <HeaderMenuTrigger tooltip="Profile">
          <IconButton
            aria-label="Profile"
            iconNode={
              <Avatar className="size-[var(--icon-size)] after:hidden">
                <AvatarImage src={userImage} alt={userName ?? "Profile"} />
                <AvatarFallback className="text-[11px] font-medium text-icon-active">
                  {initialsOf(userName)}
                </AvatarFallback>
              </Avatar>
            }
          />
        </HeaderMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={MENU_GAP}>
          {/* TODO(org-header): real account menu — placeholder. */}
          <DropdownMenuItem>Lorem ipsum dolor sit amet.</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}

/**
 * "Get Started" CTA — a white pill with the same border as the search
 * input. 22×90; label at the shared `--icon-label-size`.
 */
function GetStartedButton() {
  return (
    <button
      type="button"
      className="h-[22px] w-[90px] rounded-lg border border-input bg-background text-[length:var(--icon-label-size)] font-medium text-rail-label-active transition-transform outline-none active:translate-y-px"
    >
      Get Started
    </button>
  )
}
