import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"

function BasicTabs() {
  return (
    <Tabs defaultValue="first">
      <TabsList>
        <TabsTrigger value="first">First</TabsTrigger>
        <TabsTrigger value="second">Second</TabsTrigger>
      </TabsList>
      <TabsContent value="first">First panel</TabsContent>
      <TabsContent value="second">Second panel</TabsContent>
    </Tabs>
  )
}

describe("Tabs", () => {
  it("renders tabs and shows default panel", () => {
    render(<BasicTabs />)
    expect(screen.getByText("First")).toBeInTheDocument()
    expect(screen.getByText("Second")).toBeInTheDocument()
    expect(screen.getByText("First panel")).toBeInTheDocument()
  })

  it("switches panel on trigger click", async () => {
    const user = userEvent.setup()
    render(<BasicTabs />)
    await user.click(screen.getByText("Second"))
    expect(screen.getByText("Second panel")).toBeInTheDocument()
  })
})
