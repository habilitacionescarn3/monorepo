import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "./separator"

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
}
export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-sm">Above</p>
      <Separator />
      <p className="text-sm">Below</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-2 h-8">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
}

export const InNavigation: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">Home</span>
      <Separator orientation="vertical" className="h-4" />
      <span className="text-sm font-medium">About</span>
      <Separator orientation="vertical" className="h-4" />
      <span className="text-sm font-medium">Contact</span>
    </div>
  ),
}
