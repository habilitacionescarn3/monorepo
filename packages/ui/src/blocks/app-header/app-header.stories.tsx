import type { Meta, StoryObj } from "@storybook/react"

import { IconProvider } from "@workspace/ui/icon-packs"

import { AppHeader } from "./app-header"

const meta: Meta<typeof AppHeader> = {
  title: "Blocks/AppHeader",
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <IconProvider>
        <Story />
      </IconProvider>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof AppHeader>

export const Default: Story = {
  render: () => (
    <div className="h-10 w-full bg-canvas">
      <AppHeader inboxCount={3} taskCount={12} userName="Hleb Tkachenko" />
    </div>
  ),
}

export const NoBadges: Story = {
  render: () => (
    <div className="h-10 w-full bg-canvas">
      <AppHeader userName="Acme Owner" />
    </div>
  ),
}

export const BadgeOverflow: Story = {
  render: () => (
    <div className="h-10 w-full bg-canvas">
      <AppHeader inboxCount={128} taskCount={5} userName="Test User" />
    </div>
  ),
}
