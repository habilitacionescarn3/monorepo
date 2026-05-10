import type { Meta, StoryObj } from "@storybook/react"
import { Toggle } from "./toggle"

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: () => <Toggle>Bold</Toggle>,
}

export const Outline: Story = {
  render: () => <Toggle variant="outline">Italic</Toggle>,
}

export const Small: Story = {
  render: () => <Toggle size="sm">Sm</Toggle>,
}

export const Large: Story = {
  render: () => <Toggle size="lg">Lg</Toggle>,
}

export const Pressed: Story = {
  render: () => <Toggle defaultPressed>Pressed</Toggle>,
}
