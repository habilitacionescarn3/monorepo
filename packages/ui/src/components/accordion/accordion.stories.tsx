import type { Meta, StoryObj } from "@storybook/react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion"

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
}
export default meta

type Story = StoryObj<typeof Accordion>

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-64">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
        <AccordionContent>
          A collection of re-usable components built with Radix UI and Tailwind CSS.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It follows WAI-ARIA design patterns.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-64">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section one</AccordionTrigger>
        <AccordionContent>Content for section one.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section two</AccordionTrigger>
        <AccordionContent>Content for section two.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section three</AccordionTrigger>
        <AccordionContent>Content for section three.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const DefaultOpen: Story = {
  render: () => (
    <Accordion type="single" defaultValue="item-1" className="w-64">
      <AccordionItem value="item-1">
        <AccordionTrigger>Open by default</AccordionTrigger>
        <AccordionContent>This panel is open on load.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Closed by default</AccordionTrigger>
        <AccordionContent>This panel is closed on load.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
