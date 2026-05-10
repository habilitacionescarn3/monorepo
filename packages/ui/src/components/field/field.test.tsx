import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Field, FieldLabel, FieldDescription } from "./field"

describe("Field", () => {
  it("renders without crash", () => {
    render(<Field data-testid="field" />)
    expect(screen.getByTestId("field")).toBeInTheDocument()
  })

  it("renders label and description", () => {
    render(
      <Field>
        <FieldLabel>Username</FieldLabel>
        <FieldDescription>Choose a unique username.</FieldDescription>
      </Field>
    )
    expect(screen.getByText("Username")).toBeInTheDocument()
    expect(screen.getByText("Choose a unique username.")).toBeInTheDocument()
  })

  it("applies orientation data attribute", () => {
    render(<Field orientation="horizontal" data-testid="field" />)
    expect(screen.getByTestId("field")).toHaveAttribute("data-orientation", "horizontal")
  })
})
