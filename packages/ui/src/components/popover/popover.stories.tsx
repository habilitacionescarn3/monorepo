import type { Meta, StoryObj } from "@storybook/react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
}
export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button>Open Popover</button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">Popover content goes here.</p>
      </PopoverContent>
    </Popover>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <button>Settings</button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid gap-2">
          <h4 className="font-medium text-sm">Settings</h4>
          <label className="text-sm text-muted-foreground">
            Width
            <input className="mt-1 w-full border rounded px-2 py-1 text-sm" defaultValue="100%" />
          </label>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
