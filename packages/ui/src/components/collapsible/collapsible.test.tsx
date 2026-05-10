import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"

describe("Collapsible", () => {
  it("renders trigger", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    )
    expect(screen.getByText("Toggle")).toBeInTheDocument()
  })

  it("shows content when opened", async () => {
    const user = userEvent.setup()
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Revealed content</CollapsibleContent>
      </Collapsible>
    )
    await user.click(screen.getByText("Toggle"))
    expect(screen.getByText("Revealed content")).toBeInTheDocument()
  })

  it("renders open by default when defaultOpen", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Always visible</CollapsibleContent>
      </Collapsible>
    )
    expect(screen.getByText("Always visible")).toBeInTheDocument()
  })
})
