"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@workspace/ui/components/context-menu"
import { Copy, Pencil, Trash2, ExternalLink } from "lucide-react"

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex h-24 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Pencil />
          Edit
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy />
          Copy link
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <ExternalLink />
          Open in new tab
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
