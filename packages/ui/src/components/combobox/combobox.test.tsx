import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./combobox"

describe("Combobox", () => {
  it("renders input placeholder", () => {
    render(
      <Combobox>
        <ComboboxInput placeholder="Pick an option" />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>Nothing found.</ComboboxEmpty>
            <ComboboxItem value="option-a">Option A</ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
    expect(screen.getByPlaceholderText("Pick an option")).toBeInTheDocument()
  })
})
