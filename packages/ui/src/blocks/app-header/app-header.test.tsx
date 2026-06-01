import { render as rtlRender, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { IconProvider } from "@workspace/ui/icon-packs"

import { AppHeader } from "./app-header"

// AppHeader resolves icons via useIcons(), so every render needs an
// IconProvider ancestor.
const render = ((ui: Parameters<typeof rtlRender>[0]) =>
  rtlRender(<IconProvider>{ui}</IconProvider>)) as typeof rtlRender

describe("AppHeader", () => {
  it("renders a centered search input", () => {
    render(<AppHeader />)
    expect(
      screen.getByRole("searchbox", { name: "Search" }),
    ).toBeInTheDocument()
  })

  it("renders the right-side controls", () => {
    render(<AppHeader userName="Hleb Tkachenko" />)
    for (const label of ["Inbox", "Tasks", "Help", "Settings"]) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument()
    }
    // Avatar fallback initials from the name.
    expect(screen.getByText("HT")).toBeInTheDocument()
  })

  it("shows count badges only when > 0", () => {
    render(<AppHeader inboxCount={3} taskCount={0} />)
    expect(screen.getByText("3")).toBeInTheDocument()
    // taskCount 0 → no badge text
    expect(screen.queryByText("0")).not.toBeInTheDocument()
  })

  it("clamps large counts to 99+", () => {
    render(<AppHeader inboxCount={150} />)
    expect(screen.getByText("99+")).toBeInTheDocument()
  })
})
