import type { Meta, StoryObj } from "@storybook/react"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card"

const meta: Meta<typeof HoverCard> = {
  title: "Components/HoverCard",
  component: HoverCard,
}
export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  render: () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger>
        <span className="underline cursor-pointer">Hover me</span>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">This is the hover card content.</p>
      </HoverCardContent>
    </HoverCard>
  ),
}
