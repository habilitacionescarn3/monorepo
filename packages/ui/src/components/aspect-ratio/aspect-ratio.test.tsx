import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { AspectRatio } from "./aspect-ratio"

describe("AspectRatio", () => {
  it("renders children", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    )
    expect(screen.getByText("Content")).toBeInTheDocument()
  })

  it("renders with data-slot attribute", () => {
    const { container } = render(
      <AspectRatio ratio={1}>
        <span>Inner</span>
      </AspectRatio>
    )
    expect(container.querySelector("[data-slot='aspect-ratio']")).toBeInTheDocument()
  })
})
