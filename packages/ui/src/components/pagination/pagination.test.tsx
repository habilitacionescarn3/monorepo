import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination"

describe("Pagination", () => {
  it("renders navigation element", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
  })

  it("renders previous and next controls", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    expect(screen.getByRole("link", { name: /previous/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument()
  })
})
