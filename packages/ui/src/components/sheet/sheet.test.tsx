import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"

describe("Sheet", () => {
  it("renders trigger", () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
    expect(screen.getByText("Open")).toBeInTheDocument()
  })

  it("shows content when open", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
    expect(screen.getByText("Sheet Title")).toBeInTheDocument()
    expect(screen.getByText("Sheet description")).toBeInTheDocument()
  })

  it("opens on trigger click", async () => {
    const user = userEvent.setup()
    render(
      <Sheet>
        <SheetTrigger>Toggle</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>My Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
    await user.click(screen.getByText("Toggle"))
    expect(screen.getByText("My Sheet")).toBeInTheDocument()
  })
})
