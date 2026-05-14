"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

const sides = [
  {
    side: "top",
    label: "From top",
    title: "Quick search",
    description: "Find a project or workspace.",
  },
  {
    side: "right",
    label: "From right",
    title: "Account settings",
    description: "Manage your profile, billing, and preferences.",
  },
  {
    side: "bottom",
    label: "From bottom",
    title: "Cookie preferences",
    description: "Choose which cookies to accept.",
  },
  {
    side: "left",
    label: "From left",
    title: "Navigation",
    description: "Browse pages, recents, and favorites.",
  },
] as const

export function SheetDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {sides.map(({ side, label, title, description }) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">{label}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 px-4">
              <div className="grid gap-2">
                <Label htmlFor={`sheet-${side}-name`}>Name</Label>
                <Input
                  id={`sheet-${side}-name`}
                  defaultValue="Acme Corp"
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`sheet-${side}-email`}>Email</Label>
                <Input
                  id={`sheet-${side}-email`}
                  type="email"
                  defaultValue="hello@acme.com"
                  autoComplete="off"
                />
              </div>
            </div>
            <SheetFooter className="flex-row justify-end gap-2">
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button>Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
