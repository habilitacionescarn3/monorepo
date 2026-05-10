import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Kbd, KbdGroup } from "./kbd"

describe("Kbd", () => {
  it("renders text content", () => {
    render(<Kbd>Enter</Kbd>)
    expect(screen.getByText("Enter")).toBeInTheDocument()
  })

  it("renders as kbd element", () => {
    render(<Kbd>Escape</Kbd>)
    const el = screen.getByText("Escape")
    expect(el.tagName.toLowerCase()).toBe("kbd")
  })

  it("renders KbdGroup with multiple keys", () => {
    render(
      <KbdGroup>
        <Kbd>Cmd</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    )
    expect(screen.getByText("Cmd")).toBeInTheDocument()
    expect(screen.getByText("K")).toBeInTheDocument()
  })
})
