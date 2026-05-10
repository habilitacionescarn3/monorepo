import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Progress } from "./progress"

describe("Progress", () => {
  it("renders", () => {
    const { container } = render(<Progress value={50} />)
    expect(container.querySelector("[data-slot='progress']")).toBeInTheDocument()
  })

  it("renders indicator with correct transform", () => {
    const { container } = render(<Progress value={75} />)
    const indicator = container.querySelector("[data-slot='progress-indicator']") as HTMLElement
    expect(indicator.style.transform).toBe("translateX(-25%)")
  })

  it("renders at zero value", () => {
    const { container } = render(<Progress value={0} />)
    const indicator = container.querySelector("[data-slot='progress-indicator']") as HTMLElement
    expect(indicator.style.transform).toBe("translateX(-100%)")
  })
})
