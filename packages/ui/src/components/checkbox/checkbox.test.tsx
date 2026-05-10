import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { Checkbox } from "./checkbox"

describe("Checkbox", () => {
  it("renders", () => {
    render(<Checkbox aria-label="accept" />)
    expect(screen.getByRole("checkbox", { name: "accept" })).toBeInTheDocument()
  })

  it("can be checked and unchecked", async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="toggle" />)
    const checkbox = screen.getByRole("checkbox", { name: "toggle" })
    expect(checkbox).not.toBeChecked()
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it("is disabled when disabled prop is set", () => {
    render(<Checkbox aria-label="disabled" disabled />)
    expect(screen.getByRole("checkbox", { name: "disabled" })).toBeDisabled()
  })
})
