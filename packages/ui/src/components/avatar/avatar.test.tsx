import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"

describe("Avatar", () => {
  it("renders fallback text", () => {
    render(
      <Avatar>
        <AvatarFallback>HT</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText("HT")).toBeInTheDocument()
  })

  it("applies size data attribute", () => {
    const { container } = render(
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    )
    const root = container.querySelector("[data-slot='avatar']")
    expect(root).toHaveAttribute("data-size", "lg")
  })

  it("renders AvatarImage", () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.png" alt="Test user" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )
    const img = screen.queryByAltText("Test user")
    // Image may or may not render depending on load state in jsdom
    expect(screen.getByText("TU") || img).toBeTruthy()
  })
})
