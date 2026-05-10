import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

describe("Select", () => {
  it("renders trigger with placeholder", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByText("Pick one")).toBeInTheDocument()
  })

  it("renders with default value", () => {
    render(
      <Select defaultValue="b">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByText("Option B")).toBeInTheDocument()
  })

  it("renders trigger as combobox role", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="x">Item</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })
})
