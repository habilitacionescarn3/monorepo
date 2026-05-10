import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Bar, BarChart } from "recharts"
import { ChartContainer, type ChartConfig } from "./chart"

const config: ChartConfig = {
  value: { label: "Value", color: "#2563eb" },
}

describe("ChartContainer", () => {
  it("renders without crash", () => {
    render(
      <ChartContainer config={config} data-testid="chart">
        <BarChart data={[{ name: "A", value: 10 }]}>
          <Bar dataKey="value" />
        </BarChart>
      </ChartContainer>
    )
    expect(screen.getByTestId("chart")).toBeInTheDocument()
  })
})
