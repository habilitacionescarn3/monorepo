import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { Toggle } from "./toggle"

describe("Toggle", () => {
  it("renders a button with toggle role", () => {
    render(<Toggle>Bold</Toggle>)
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument()
  })

  it("is not pressed by default", () => {
    render(<Toggle>Bold</Toggle>)
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false")
  })

  it("toggles pressed state on click", async () => {
    const user = userEvent.setup()
    render(<Toggle>Bold</Toggle>)
    const btn = screen.getByRole("button")
    await user.click(btn)
    expect(btn).toHaveAttribute("aria-pressed", "true")
    await user.click(btn)
    expect(btn).toHaveAttribute("aria-pressed", "false")
  })
})
