import type { Meta, StoryObj } from "@storybook/react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
}
export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button>Open Sheet</button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">Sheet body content goes here.</p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <button>Cancel</button>
          </SheetClose>
          <button>Save changes</button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const FromLeft: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button>Open Left Sheet</button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="py-4 space-y-2">
          <a href="#" className="block text-sm">Dashboard</a>
          <a href="#" className="block text-sm">Projects</a>
          <a href="#" className="block text-sm">Settings</a>
        </nav>
      </SheetContent>
    </Sheet>
  ),
}
