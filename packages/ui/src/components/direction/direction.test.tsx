import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { DirectionProvider } from "./direction"

describe("DirectionProvider", () => {
  it("renders children", () => {
    render(
      <DirectionProvider dir="ltr">
        <span>Direction content</span>
      </DirectionProvider>
    )
    expect(screen.getByText("Direction content")).toBeInTheDocument()
  })

  it("accepts rtl direction", () => {
    render(
      <DirectionProvider dir="rtl">
        <span>RTL content</span>
      </DirectionProvider>
    )
    expect(screen.getByText("RTL content")).toBeInTheDocument()
  })
})
