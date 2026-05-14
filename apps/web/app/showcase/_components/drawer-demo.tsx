"use client"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { Button } from "@workspace/ui/components/button"

const directions = [
  {
    direction: "top",
    label: "From top",
    title: "Notifications",
    description: "Recent activity in your workspace.",
    body: "You have 3 new comments and 1 mention from this week.",
  },
  {
    direction: "right",
    label: "From right",
    title: "Filters",
    description: "Refine the list by status, owner, and date.",
    body: "Use checkboxes to narrow results. Selections persist while the drawer is open.",
  },
  {
    direction: "bottom",
    label: "From bottom",
    title: "Share invoice",
    description: "Send a copy via email or copy a public link.",
    body: "Public links expire in 7 days unless renewed.",
  },
  {
    direction: "left",
    label: "From left",
    title: "Recent files",
    description: "Pick up where you left off.",
    body: "Files you opened in the last 7 days appear here.",
  },
] as const

export function DrawerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {directions.map(({ direction, label, title, description, body }) => (
        <Drawer key={direction} direction={direction}>
          <DrawerTrigger asChild>
            <Button variant="outline">{label}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-4 text-sm text-muted-foreground">
              {body}
            </div>
            <DrawerFooter className="flex-row justify-end gap-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button>Continue</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}
