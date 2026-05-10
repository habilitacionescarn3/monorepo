import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Separator } from "./separator"

describe("Separator", () => {
  it("renders", () => {
    const { container } = render(<Separator />)
    expect(container.querySelector("[data-slot='separator']")).toBeInTheDocument()
  })

  it("renders horizontal by default", () => {
    const { container } = render(<Separator />)
    expect(container.querySelector("[data-slot='separator']")).toHaveAttribute("data-orientation", "horizontal")
  })

  it("renders vertical orientation", () => {
    const { container } = render(<Separator orientation="vertical" />)
    expect(container.querySelector("[data-slot='separator']")).toHaveAttribute("data-orientation", "vertical")
  })
})
