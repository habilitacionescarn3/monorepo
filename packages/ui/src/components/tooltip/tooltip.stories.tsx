import type { Meta, StoryObj } from "@storybook/react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
}
export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <button>Hover me</button>
        </TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const OnButton: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>Save</button>
        </TooltipTrigger>
        <TooltipContent>Save your changes</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
