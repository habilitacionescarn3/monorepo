import type { Meta, StoryObj } from "@storybook/react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart"

const meta: Meta<typeof ChartContainer> = {
  title: "Components/Chart",
  component: ChartContainer,
}
export default meta
type Story = StoryObj<typeof ChartContainer>

const config: ChartConfig = {
  revenue: { label: "Revenue", color: "#2563eb" },
  expenses: { label: "Expenses", color: "#dc2626" },
}

const data = [
  { month: "Jan", revenue: 4000, expenses: 2400 },
  { month: "Feb", revenue: 3000, expenses: 1398 },
  { month: "Mar", revenue: 6000, expenses: 3200 },
  { month: "Apr", revenue: 5000, expenses: 2800 },
]

export const Default: Story = {
  render: () => (
    <ChartContainer config={config} className="h-64 w-full">
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" />
        <Bar dataKey="expenses" fill="var(--color-expenses)" />
      </BarChart>
    </ChartContainer>
  ),
}
