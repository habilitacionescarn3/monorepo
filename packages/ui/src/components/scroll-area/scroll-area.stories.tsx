import type { Meta, StoryObj } from "@storybook/react"
import { ScrollArea, ScrollBar } from "./scroll-area"

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
}
export default meta
type Story = StoryObj<typeof ScrollArea>

const tags = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`)

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-48 rounded-md border">
      <div className="p-4">
        {tags.map((tag) => (
          <div key={tag} className="text-sm py-1">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-64 whitespace-nowrap rounded-md border">
      <div className="flex gap-4 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="w-24 h-16 shrink-0 rounded border flex items-center justify-center text-sm">
            Card {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}
