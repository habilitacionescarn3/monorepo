import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { ScrollArea } from "./scroll-area"

describe("ScrollArea", () => {
  it("renders child content", () => {
    render(
      <ScrollArea className="h-32">
        <div>Scrollable content</div>
      </ScrollArea>
    )
    expect(screen.getByText("Scrollable content")).toBeInTheDocument()
  })

  it("renders multiple children", () => {
    render(
      <ScrollArea className="h-32">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ScrollArea>
    )
    expect(screen.getByText("Item 1")).toBeInTheDocument()
    expect(screen.getByText("Item 3")).toBeInTheDocument()
  })
})
