import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Input } from "./input"

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument()
  })

  it("renders as disabled when disabled prop is set", () => {
    render(<Input disabled />)
    expect(screen.getByRole("textbox")).toBeDisabled()
  })
})
