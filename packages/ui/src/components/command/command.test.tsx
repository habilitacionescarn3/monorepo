import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"

describe("Command", () => {
  it("renders input and items", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup>
            <CommandItem>Option One</CommandItem>
            <CommandItem>Option Two</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument()
    expect(screen.getByText("Option One")).toBeInTheDocument()
    expect(screen.getByText("Option Two")).toBeInTheDocument()
  })
})
