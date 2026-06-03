import { getBuildVersion } from "@workspace/ui/brand-assets"
import { AppShell } from "@workspace/ui/blocks/app-shell"

import { AppHeaderClient } from "../_components/app-header-client"
import { AppRailNav } from "../_components/app-rail-nav"
import { IconPackSwitcher } from "../_components/icon-pack-switcher"
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
        <AppHeaderClient
          userName="Hleb Tkachenko"
          version={getBuildVersion()}
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
