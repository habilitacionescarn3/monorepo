import type { Meta, StoryObj } from "@storybook/react"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table"

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
}
export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>List of invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV-001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>1 500 Kč</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>3 200 Kč</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>4 700 Kč</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}
