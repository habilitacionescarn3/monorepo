import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from "./native-select"

describe("NativeSelect", () => {
  it("renders a select element", () => {
    render(
      <NativeSelect>
        <NativeSelectOption value="a">Option A</NativeSelectOption>
      </NativeSelect>
    )
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("renders options", () => {
    render(
      <NativeSelect>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>
    )
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument()
  })

  it("renders opt groups", () => {
    render(
      <NativeSelect>
        <NativeSelectOptGroup label="Fruits">
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    )
    expect(screen.getByRole("group", { name: "Fruits" })).toBeInTheDocument()
  })
})
