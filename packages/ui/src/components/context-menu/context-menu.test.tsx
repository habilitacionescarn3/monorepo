import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./context-menu"

describe("ContextMenu", () => {
  it("renders the trigger", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    expect(screen.getByText("Right-click me")).toBeInTheDocument()
  })
})
