import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

describe("Tooltip", () => {
  it("renders the trigger", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>Tooltip info</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument()
  })

  it("renders content when open", () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>Visible tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getAllByText("Visible tip").length).toBeGreaterThanOrEqual(1)
  })
})
