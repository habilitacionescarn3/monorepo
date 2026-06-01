"use client"

import * as React from "react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuTrigger,
} from "@workspace/ui/components/context-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { useIcons } from "@workspace/ui/icon-packs"
import type { IconName } from "@workspace/ui/icon-packs"
import { cn } from "@workspace/ui/lib/utils"

export type RailMode = "expanded" | "icon-only"

export interface RailItem {
  /** Stable identifier — used as React key and for active-state matching. */
  key: string
  /** Visible label below the icon (in expanded mode). Tooltip in icon-only mode. */
  label: string
  /**
   * Icon source — pick ONE:
   *   - `iconName`: string from the `IconName` union. The rail resolves
   *     the component from the active `IconProvider` pack at render
   *     time. Use this when constructing items in a server component
   *     so the icon JSX stays out of the server boundary (and the
   *     active pack drives which library renders).
   *   - `icon`: a pre-built React node (e.g. `<Home className="size-5" />`).
   *     Use this when you have a custom icon that isn't part of any pack.
   * If both are provided, `icon` wins.
   */
  iconName?: IconName
  icon?: React.ReactNode
  /** Override the icon size class (default `size-5` = 20px). */
  iconClassName?: string
  /** Extra classes for the label span (e.g. a smaller `text-[10px]`). */
  labelClassName?: string
  /** Href for the underlying `<a>`. Defaults to `#`. */
  href?: string
  /** Adds active styling (filled wrap, black icon). */
  active?: boolean
  /** Inserts a 30px-wide hairline separator BELOW this item. */
  separatorAfter?: boolean
}

interface AppRailProps {
  items: RailItem[]
  /** Initial mode if none persisted in localStorage. */
  defaultMode?: RailMode
  /** Persisted-mode storage key. Override to scope per-app. */
  storageKey?: string
  /** Rail width in `expanded` mode. Should match `--shell-rail-width` default. */
  expandedWidth?: string
  /** Rail width in `icon-only` mode. Spec: 10px narrower than expanded. */
  collapsedWidth?: string
  className?: string
}

const SHELL_RAIL_WIDTH_VAR = "--shell-rail-width"

/**
 * App-shell rail navigation. Stacked icon-above-label items with two
 * display modes:
 *   - `expanded`  (240px) → icon + label centered, stacked
 *   - `icon-only` (230px) → label hidden; same icons + spacing
 *
 * Mode toggles via right-click `ContextMenu` (`ContextMenuRadioGroup`
 * with two items). Mode persists in localStorage.
 *
 * Side-effect: writes `--shell-rail-width` on `<html>` so the
 * surrounding `AppShell` resizes its rail aside + header + content
 * area in sync. AppShell has `transition-[width,left]` so the change
 * animates.
 */
export function AppRail({
  items,
  defaultMode = "expanded",
  storageKey = "app-rail-mode",
  expandedWidth = "60px",
  collapsedWidth = "50px",
  className,
}: AppRailProps) {
  const [mode, setMode] = React.useState<RailMode>(defaultMode)

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored === "expanded" || stored === "icon-only") {
        setMode(stored)
      }
    } catch {
      // localStorage unavailable — fall through to defaultMode.
    }
  }, [storageKey])

  React.useEffect(() => {
    const width = mode === "expanded" ? expandedWidth : collapsedWidth
    document.documentElement.style.setProperty(SHELL_RAIL_WIDTH_VAR, width)
    try {
      localStorage.setItem(storageKey, mode)
    } catch {
      // ignore
    }
  }, [mode, expandedWidth, collapsedWidth, storageKey])

  return (
    <TooltipProvider delayDuration={200}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <nav
            data-slot="app-rail"
            data-mode={mode}
            // Stop the global AppContextMenu from also firing.
            onContextMenu={(e) => e.stopPropagation()}
            className={cn(
              // pt-4 = 16px above the first item (14px base + 2px extra).
              "flex h-full flex-col items-center overflow-x-hidden overflow-y-auto pt-4 pb-2",
              // Inter-item gap: 12px with labels, 8px icon-only.
              "data-[mode=expanded]:gap-y-3 data-[mode=icon-only]:gap-y-2",
              className,
            )}
          >
            {items.map((item) => (
              <React.Fragment key={item.key}>
                <RailNavItem item={item} mode={mode} />
                {item.separatorAfter && <RailSeparator />}
              </React.Fragment>
            ))}
          </nav>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-44">
          <ContextMenuRadioGroup
            value={mode}
            onValueChange={(v) => setMode(v as RailMode)}
          >
            <ContextMenuRadioItem value="expanded">
              Show labels
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="icon-only">
              Icons only
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </TooltipProvider>
  )
}

function RailNavItem({ item, mode }: { item: RailItem; mode: RailMode }) {
  const icons = useIcons()
  const PackIcon = item.iconName ? icons[item.iconName] : null
  const iconNode =
    item.icon ??
    (PackIcon ? <PackIcon className={item.iconClassName ?? "size-5"} /> : null)

  const iconWrap = (
    <span
      className={cn(
        "flex size-8 items-center justify-center rounded-sm",
        // Icon color: idle + hover #808689, selected #1E1F20.
        // Label color (idle #676C6F, hover/active #4E5255) is on the
        // label span below.
        "text-[#808689] group-data-[active]:text-[#1E1F20]",
        "group-hover:bg-[#E3E5E5]",
        "group-data-[active]:bg-[#CDCECE]",
      )}
    >
      {iconNode}
    </span>
  )

  return (
    <a
      href={item.href ?? "#"}
      aria-label={item.label}
      data-active={item.active || undefined}
      // In-flow stack: icon + label as one unit (gap-1 = 4px). Inter-item
      // spacing comes from the nav's mode-aware gap-y, so the label lives
      // inside the item bbox — separators land in the visible gap below.
      className="group flex w-full flex-col items-center gap-1"
    >
      {mode === "icon-only" ? (
        // Tooltip anchored to the icon WRAPPER (not the full-width link),
        // so it opens right after the 32px tile — not the rail edge.
        <Tooltip>
          <TooltipTrigger asChild>{iconWrap}</TooltipTrigger>
          {/* Negative offset: Radix adds a ~10px baseline, so this lands
              the bubble right beside the 32px icon tile (not the rail edge). */}
          <TooltipContent side="right" sideOffset={-4}>
            {item.label}
          </TooltipContent>
        </Tooltip>
      ) : (
        iconWrap
      )}
      {mode === "expanded" && (
        // Inter Medium 11px, centered, in-flow. `truncate` (overflow-hidden
        // + ellipsis + nowrap) cuts overflow against the rail width — e.g.
        // "Documents" → "Docume…" — no hardcoded char cap. Idle #676C6F;
        // hover + active #4E5255.
        <span
          className={cn(
            "w-full truncate px-0.5 text-center leading-tight font-medium tracking-[-0.01em] text-[#676C6F] group-hover:text-[#4E5255] group-data-[active]:text-[#4E5255]",
            // Size last so a per-item override (e.g. "text-[10px]") wins.
            item.labelClassName ?? "text-[11px]",
          )}
        >
          {item.label}
        </span>
      )}
    </a>
  )
}

/**
 * 30px-wide hairline separator. Total hit height 3px (1px line
 * centered with 1px above + 1px below). Centered in the rail.
 */
function RailSeparator() {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      // In-flow 30px hairline. The nav's gap-y spaces it from the items
      // above and below, so it sits visible in the gap — not collapsed to
      // 0 height nor hidden behind an absolutely-positioned label.
      className="flex h-[3px] w-[30px] items-center justify-center"
    >
      <div className="h-px w-full bg-[#DADCDD]" />
    </div>
  )
}
