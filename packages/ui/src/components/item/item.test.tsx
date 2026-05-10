import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions } from "./item"

describe("Item", () => {
  it("renders without crash", () => {
    render(<Item data-testid="item" />)
    expect(screen.getByTestId("item")).toBeInTheDocument()
  })

  it("renders title and description", () => {
    render(
      <Item>
        <ItemContent>
          <ItemTitle>My item</ItemTitle>
          <ItemDescription>Item details here.</ItemDescription>
        </ItemContent>
      </Item>
    )
    expect(screen.getByText("My item")).toBeInTheDocument()
    expect(screen.getByText("Item details here.")).toBeInTheDocument()
  })

  it("renders actions", () => {
    render(
      <Item>
        <ItemActions>
          <button>Edit</button>
        </ItemActions>
      </Item>
    )
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument()
  })
})
