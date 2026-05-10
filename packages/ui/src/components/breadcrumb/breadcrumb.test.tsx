import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb"

function TestBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

describe("Breadcrumb", () => {
  it("renders nav with breadcrumb label", () => {
    render(<TestBreadcrumb />)
    expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeInTheDocument()
  })

  it("renders links and current page", () => {
    render(<TestBreadcrumb />)
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Current")).toBeInTheDocument()
  })

  it("BreadcrumbPage has aria-current=page", () => {
    render(<TestBreadcrumb />)
    const page = screen.getByText("Current")
    expect(page).toHaveAttribute("aria-current", "page")
  })

  it("BreadcrumbEllipsis renders", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
    expect(screen.getByText("More")).toBeInTheDocument()
  })
})
