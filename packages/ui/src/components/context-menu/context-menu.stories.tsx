import type { Meta, StoryObj } from "@storybook/react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "./context-menu"

const meta: Meta<typeof ContextMenu> = {
  title: "Components/ContextMenu",
  component: ContextMenu,
}
export default meta
type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-24 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          New Tab
          <ContextMenuShortcut>⌘T</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          New Window
          <ContextMenuShortcut>⌘N</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
