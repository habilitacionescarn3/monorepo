import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table"

describe("Table", () => {
  it("renders a table element", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByRole("table")).toBeInTheDocument()
  })

  it("renders header and cells", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Alice")).toBeInTheDocument()
  })

  it("renders caption", () => {
    render(
      <Table>
        <TableCaption>My caption</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>-</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByText("My caption")).toBeInTheDocument()
  })
})
