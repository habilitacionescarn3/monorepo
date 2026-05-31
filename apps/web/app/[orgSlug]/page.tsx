import { AppRail } from "@workspace/ui/blocks/app-rail"
import type { RailItem } from "@workspace/ui/blocks/app-rail"
import { AppShell } from "@workspace/ui/blocks/app-shell"

import { IconPackSwitcher } from "../_components/icon-pack-switcher"

export const metadata = {
  title: "Dashboard",
}

export default async function OrgDashboardPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>
}) {
  const { orgSlug } = await params
  // Icons travel as `iconName` strings — AppRail (client) resolves
  // them via `useIcons()` from the active IconProvider pack. Lets the
  // user swap icon packs at runtime without touching this server page.
  const items: RailItem[] = [
    {
      key: "home",
      label: "Home",
      iconName: "Home",
      href: `/${orgSlug}`,
      active: true,
    },
    {
      key: "journals",
      label: "Journals",
      iconName: "BookOpenText",
      href: `/${orgSlug}/journals`,
    },
    {
      key: "documents",
      label: "Documents",
      iconName: "FolderOpen",
      href: `/${orgSlug}/documents`,
    },
    {
      key: "finance",
      label: "Finance",
      iconName: "PiggyBank",
      href: `/${orgSlug}/finance`,
    },
    {
      key: "hr",
      label: "HR",
      iconName: "Users",
      href: `/${orgSlug}/hr`,
    },
    {
      key: "assets",
      label: "Assets",
      iconName: "Briefcase",
      href: `/${orgSlug}/assets`,
      separatorAfter: true,
    },
    {
      key: "closing",
      label: "Closing",
      iconName: "ListChecksIcon",
      href: `/${orgSlug}/closing`,
    },
    {
      key: "reports",
      label: "Reports",
      iconName: "BarChart3",
      href: `/${orgSlug}/reports`,
      separatorAfter: true,
    },
    {
      key: "directory",
      label: "Directory",
      iconName: "Building2",
      href: `/${orgSlug}/directory`,
    },
    {
      key: "settings",
      label: "Settings",
      iconName: "Settings",
      href: `/${orgSlug}/settings`,
    },
  ]
  return (
    <AppShell
      header={<div className="size-full" />}
      rail={<AppRail items={items} />}
      sidebar={<div className="size-full" />}
      assistant={<div className="size-full" />}
      logoHref={`/${orgSlug}`}
    >
      <IconPackSwitcher />
    </AppShell>
  )
}
