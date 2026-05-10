import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Empty, EmptyTitle, EmptyDescription, EmptyHeader } from "./empty"

describe("Empty", () => {
  it("renders without crash", () => {
    render(<Empty data-testid="empty" />)
    expect(screen.getByTestId("empty")).toBeInTheDocument()
  })

  it("renders title and description", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No data</EmptyTitle>
          <EmptyDescription>Nothing to show here.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
    expect(screen.getByText("No data")).toBeInTheDocument()
    expect(screen.getByText("Nothing to show here.")).toBeInTheDocument()
  })
})
