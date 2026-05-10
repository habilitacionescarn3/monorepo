import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

describe("ToggleGroup", () => {
  it("renders all items", () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">Alpha</ToggleGroupItem>
        <ToggleGroupItem value="b">Beta</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByText("Alpha")).toBeInTheDocument()
    expect(screen.getByText("Beta")).toBeInTheDocument()
  })

  it("selects an item on click in single mode", async () => {
    const user = userEvent.setup()
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">Alpha</ToggleGroupItem>
        <ToggleGroupItem value="b">Beta</ToggleGroupItem>
      </ToggleGroup>
    )
    const alpha = screen.getByText("Alpha").closest("button")!
    await user.click(alpha)
    expect(alpha).toHaveAttribute("data-state", "on")
  })

  it("allows multiple selection in multiple mode", async () => {
    const user = userEvent.setup()
    render(
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>
    )
    await user.click(screen.getByText("Bold").closest("button")!)
    await user.click(screen.getByText("Italic").closest("button")!)
    expect(screen.getByText("Bold").closest("button")).toHaveAttribute("data-state", "on")
    expect(screen.getByText("Italic").closest("button")).toHaveAttribute("data-state", "on")
  })
})
