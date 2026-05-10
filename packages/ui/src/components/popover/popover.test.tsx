import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

describe("Popover", () => {
  it("renders trigger", () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )
    expect(screen.getByText("Open")).toBeInTheDocument()
  })

  it("shows content when open", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    )
    expect(screen.getByText("Popover body")).toBeInTheDocument()
  })

  it("opens content on trigger click", async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent>Hidden content</PopoverContent>
      </Popover>
    )
    await user.click(screen.getByText("Click me"))
    expect(screen.getByText("Hidden content")).toBeInTheDocument()
  })
})
