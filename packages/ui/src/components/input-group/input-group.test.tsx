import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
  InputGroupAddon,
} from "./input-group"

describe("InputGroup", () => {
  it("renders without crash", () => {
    render(<InputGroup data-testid="input-group" />)
    expect(screen.getByTestId("input-group")).toBeInTheDocument()
  })

  it("renders addon text and input", () => {
    render(
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="Amount" />
      </InputGroup>
    )
    expect(screen.getByText("$")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument()
  })
})
