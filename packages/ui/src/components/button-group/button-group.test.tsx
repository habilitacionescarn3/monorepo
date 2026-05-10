import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { ButtonGroup } from "./button-group"
import { Button } from "@workspace/ui/components/button"

describe("ButtonGroup", () => {
  it("renders children", () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Second</Button>
      </ButtonGroup>
    )
    expect(screen.getByText("First")).toBeInTheDocument()
    expect(screen.getByText("Second")).toBeInTheDocument()
  })

  it("has group role", () => {
    render(
      <ButtonGroup>
        <Button>A</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("applies orientation data attribute", () => {
    const { container } = render(
      <ButtonGroup orientation="vertical">
        <Button>A</Button>
      </ButtonGroup>
    )
    const group = container.querySelector("[data-slot='button-group']")
    expect(group).toHaveAttribute("data-orientation", "vertical")
  })
})
