"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Panel</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Notification Settings</SheetTitle>
          <SheetDescription>
            Configure how and when you receive notifications.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sheet-email">Email</Label>
            <Input id="sheet-email" defaultValue="hleb@example.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sheet-slack">Slack channel</Label>
            <Input id="sheet-slack" defaultValue="#alerts" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
