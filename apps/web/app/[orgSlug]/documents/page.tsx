import { SectionStub } from "../_components/section-stub"

export const metadata = { title: "Documents" }

export default async function DocumentsOverviewPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>
}) {
  const { orgSlug } = await params
  return (
    <SectionStub
      title="Overview"
      orgSlug={orgSlug}
      subpath="documents"
      description="Invoices received and issued. Pick a tab to drill in."
    />
  )
}
