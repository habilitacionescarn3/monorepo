import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { Switch } from "./switch"

describe("Switch", () => {
  it("renders a switch element", () => {
    render(<Switch />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("is unchecked by default", () => {
    render(<Switch />)
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false")
  })

  it("toggles state on click", async () => {
    const user = userEvent.setup()
    render(<Switch />)
    const sw = screen.getByRole("switch")
    await user.click(sw)
    expect(sw).toHaveAttribute("aria-checked", "true")
  })
})
