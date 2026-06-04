import { getBuildVersion } from "@workspace/ui/brand-assets"
import { AppHeader } from "@workspace/ui/blocks/app-header"
import { AppShell } from "@workspace/ui/blocks/app-shell"

import { AppRailNav } from "../_components/app-rail-nav"
import { IconPackSwitcher } from "../_components/icon-pack-switcher"
import { OrgHeaderActions } from "../_components/org-header-actions"
import { orgRailNav } from "./nav"

export const metadata = {
  title: "Dashboard",
}

export default async function OrgDashboardPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>
}) {
  const { orgSlug } = await params
  return (
    <AppShell
      header={
        <AppHeader
          actions={
            <OrgHeaderActions
              userName="Hleb Tkachenko"
              version={getBuildVersion()}
            />
          }
        />
      }
      rail={<AppRailNav items={orgRailNav(orgSlug)} />}
      sidebar={<div className="size-full" />}
      assistant={<div className="size-full" />}
      logoHref={`/${orgSlug}`}
    >
      <IconPackSwitcher />
    </AppShell>
  )
}
