import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

describe("DropdownMenu", () => {
  it("renders the trigger", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item One</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    expect(screen.getByText("Open")).toBeInTheDocument()
  })

  it("shows menu items when trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(screen.getByText("Open Menu"))
    expect(screen.getByText("Profile")).toBeInTheDocument()
    expect(screen.getByText("Settings")).toBeInTheDocument()
  })
})
