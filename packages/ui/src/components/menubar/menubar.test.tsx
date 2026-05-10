import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "./menubar"

describe("Menubar", () => {
  it("renders without crash", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    expect(screen.getByText("File")).toBeInTheDocument()
  })

  it("renders multiple menu triggers", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Open</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    expect(screen.getByText("File")).toBeInTheDocument()
    expect(screen.getByText("Edit")).toBeInTheDocument()
  })
})
