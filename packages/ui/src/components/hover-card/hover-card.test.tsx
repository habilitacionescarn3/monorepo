import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card"

describe("HoverCard", () => {
  it("renders trigger without crash", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Trigger</HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>
    )
    expect(screen.getByText("Trigger")).toBeInTheDocument()
  })

  it("shows content when open by default", () => {
    render(
      <HoverCard defaultOpen>
        <HoverCardTrigger>Trigger</HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>
    )
    expect(screen.getByText("Card content")).toBeInTheDocument()
  })
})
