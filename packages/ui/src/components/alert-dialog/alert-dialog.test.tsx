import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog"

function TestDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Open dialog</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm action</AlertDialogTitle>
          <AlertDialogDescription>
            This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

describe("AlertDialog", () => {
  it("renders trigger", () => {
    render(<TestDialog />)
    expect(screen.getByText("Open dialog")).toBeInTheDocument()
  })

  it("shows content after trigger click", async () => {
    const user = userEvent.setup()
    render(<TestDialog />)

    await user.click(screen.getByText("Open dialog"))

    expect(screen.getByText("Confirm action")).toBeInTheDocument()
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument()
  })

  it("closes on cancel click", async () => {
    const user = userEvent.setup()
    render(<TestDialog />)

    await user.click(screen.getByText("Open dialog"))
    expect(screen.getByText("Confirm action")).toBeInTheDocument()

    await user.click(screen.getByText("Cancel"))
    expect(screen.queryByText("Confirm action")).not.toBeInTheDocument()
  })
})
