import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { Textarea } from "./textarea"

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("renders placeholder text", () => {
    render(<Textarea placeholder="Write here..." />)
    expect(screen.getByPlaceholderText("Write here...")).toBeInTheDocument()
  })

  it("accepts user input", async () => {
    const user = userEvent.setup()
    render(<Textarea />)
    const textarea = screen.getByRole("textbox")
    await user.type(textarea, "Hello")
    expect(textarea).toHaveValue("Hello")
  })
})
