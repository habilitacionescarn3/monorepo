import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion"

function TestAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Trigger one</AccordionTrigger>
        <AccordionContent>Content one</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Trigger two</AccordionTrigger>
        <AccordionContent>Content two</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

describe("Accordion", () => {
  it("renders triggers", () => {
    render(<TestAccordion />)
    expect(screen.getByText("Trigger one")).toBeInTheDocument()
    expect(screen.getByText("Trigger two")).toBeInTheDocument()
  })

  it("expands content on trigger click", async () => {
    const user = userEvent.setup()
    render(<TestAccordion />)

    const trigger = screen.getByText("Trigger one")
    await user.click(trigger)

    expect(screen.getByText("Content one")).toBeInTheDocument()
  })

  it("collapses open item when clicked again (collapsible)", async () => {
    const user = userEvent.setup()
    render(<TestAccordion />)

    const trigger = screen.getByText("Trigger one")
    await user.click(trigger)
    await user.click(trigger)

    const button = trigger.closest("button")
    expect(button).toHaveAttribute("aria-expanded", "false")
  })
})
