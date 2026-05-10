import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Badge, badgeVariants } from "./badge"

describe("Badge", () => {
  it("renders text content", () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("applies default variant classes", () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText("Default")
    expect(badge.className).toContain("bg-primary")
  })

  it("applies destructive variant data attribute", () => {
    render(<Badge variant="destructive">Error</Badge>)
    const badge = screen.getByText("Error")
    expect(badge).toHaveAttribute("data-variant", "destructive")
  })

  it("badgeVariants is a function", () => {
    expect(typeof badgeVariants).toBe("function")
    expect(badgeVariants({ variant: "outline" })).toContain("border-border")
  })
})
