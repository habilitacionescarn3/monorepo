import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Label } from "./label"

describe("Label", () => {
  it("renders text content", () => {
    render(<Label>Username</Label>)
    expect(screen.getByText("Username")).toBeInTheDocument()
  })

  it("links to input via htmlFor", () => {
    render(
      <>
        <Label htmlFor="test-input">My Label</Label>
        <input id="test-input" />
      </>
    )
    const label = screen.getByText("My Label")
    expect(label).toHaveAttribute("for", "test-input")
  })
})
