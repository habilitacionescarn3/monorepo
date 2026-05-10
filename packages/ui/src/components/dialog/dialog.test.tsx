import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

describe("Dialog", () => {
  it("renders the trigger", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText("Open")).toBeInTheDocument()
  })

  it("shows content when trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>My Dialog</DialogTitle>
            <DialogDescription>Dialog body text</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    await user.click(screen.getByText("Open Dialog"))
    expect(screen.getByText("My Dialog")).toBeInTheDocument()
    expect(screen.getByText("Dialog body text")).toBeInTheDocument()
  })
})
