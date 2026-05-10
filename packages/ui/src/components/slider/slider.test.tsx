import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Slider } from "./slider"

describe("Slider", () => {
  it("renders a slider element", () => {
    render(<Slider defaultValue={[50]} />)
    expect(screen.getByRole("slider")).toBeInTheDocument()
  })

  it("renders the correct number of thumbs for a range", () => {
    render(<Slider defaultValue={[20, 80]} />)
    expect(screen.getAllByRole("slider")).toHaveLength(2)
  })

  it("sets aria-valuenow based on defaultValue", () => {
    render(<Slider defaultValue={[42]} />)
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "42")
  })
})
