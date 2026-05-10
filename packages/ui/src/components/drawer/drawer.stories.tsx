import type { Meta, StoryObj } from "@storybook/react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer"

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
}
export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger className="rounded-md border px-4 py-2 text-sm">
        Open Drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is the drawer description. Slide up to view full content.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose className="rounded-md border px-4 py-2 text-sm">
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
