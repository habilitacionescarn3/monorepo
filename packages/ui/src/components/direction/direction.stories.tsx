import type { Meta, StoryObj } from "@storybook/react"
import { DirectionProvider } from "./direction"

const meta: Meta<typeof DirectionProvider> = {
  title: "Components/DirectionProvider",
  component: DirectionProvider,
}
export default meta
type Story = StoryObj<typeof DirectionProvider>

export const LTR: Story = {
  render: () => (
    <DirectionProvider dir="ltr">
      <p className="text-sm">Left-to-right direction context</p>
    </DirectionProvider>
  ),
}

export const RTL: Story = {
  render: () => (
    <DirectionProvider dir="rtl">
      <p className="text-sm text-right">Right-to-left direction context</p>
    </DirectionProvider>
  ),
}
