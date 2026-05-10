import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu"

describe("NavigationMenu", () => {
  it("renders", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
  })

  it("renders link text", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Dashboard</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
  })

  it("renders multiple menu items", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Products</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">About</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    expect(screen.getByText("Products")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
  })
})
