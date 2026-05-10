import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Alert, AlertTitle, AlertDescription, AlertAction } from "./alert"

describe("Alert", () => {
  it("renders with title and description", () => {
    render(
      <Alert>
        <AlertTitle>Test title</AlertTitle>
        <AlertDescription>Test description</AlertDescription>
      </Alert>
    )
    expect(screen.getByText("Test title")).toBeInTheDocument()
    expect(screen.getByText("Test description")).toBeInTheDocument()
  })

  it("has alert role", () => {
    render(<Alert>Content</Alert>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("renders action slot", () => {
    render(
      <Alert>
        <AlertAction>
          <button>Dismiss</button>
        </AlertAction>
      </Alert>
    )
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument()
  })

  it("applies destructive variant", () => {
    render(<Alert variant="destructive">Danger</Alert>)
    const alert = screen.getByRole("alert")
    expect(alert).toHaveAttribute("class")
    expect(alert.className).toContain("text-destructive")
  })
})
