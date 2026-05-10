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

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Export Report</DrawerTitle>
          <DrawerDescription>
            Choose a format to export your financial report.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-2 p-4">
          <Button variant="outline" className="justify-start">PDF Document</Button>
          <Button variant="outline" className="justify-start">Excel Spreadsheet</Button>
          <Button variant="outline" className="justify-start">CSV File</Button>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
