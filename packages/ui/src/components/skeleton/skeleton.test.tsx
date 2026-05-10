import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Skeleton } from "./skeleton"

describe("Skeleton", () => {
  it("renders a div element", () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("applies animate-pulse class", () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass("animate-pulse")
  })

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="h-4 w-48" />)
    expect(container.firstChild).toHaveClass("h-4", "w-48")
  })
})
