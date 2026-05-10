import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer"

describe("Drawer", () => {
  it("renders the trigger", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
    expect(screen.getByText("Open Drawer")).toBeInTheDocument()
  })

  it("shows content when triggered", async () => {
    const user = userEvent.setup()
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Heading</DrawerTitle>
            <DrawerDescription>Drawer body</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
    await user.click(screen.getByText("Open"))
    expect(screen.getByText("Drawer Heading")).toBeInTheDocument()
  })
})
